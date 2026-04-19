
type Raca = "Passáro" | "Canino" | "Inseto" | "Ungulado" | "Anfibio" | "Reptéi" | "Sacrificio" | "Sem tipo";
type TipoCusto = "Sangue" | "Ossos" | "Energia" | "Pedras" | "Sem tipo";


interface ContextoEvento {
    cartaProprietaria: Carta;
    cartaAlvo?: Carta;
    cartaAtacante?: Carta;
    danoSofrido?: number;
    danoCausado?: number;
    rodada?: Rodada;
}

interface Sigilos {
    readonly nome: string;
    readonly img: string;
    readonly descricao: string;
    aoAtacar?: (contexto: ContextoEvento) => void;
    aoIniciarTurno?: (contexto: ContextoEvento) => void;
    aoFinalizarTurno?: (contexto: ContextoEvento) => void;
    aoMorrer?: (contexto: ContextoEvento) => void;
    aoInvocar?: (contexto: ContextoEvento) => void;
    aoSofrerDano?: (contexto: ContextoEvento) => number;

}

interface EntradaSigilo {
    readonly id: number;
    usadoNestaRodada: boolean;
}

interface ICarta {
    atacar(alvo: Carta, rodada: Rodada): number;
    levarDano(dano: number, atacante?: Carta, rodada?: Rodada): void;
    estaViva(): boolean;
    acionarHook<K extends keyof Sigilos>(evento: K, contexto: ContextoEvento): void;
    resetarSigilos(): void;
    getAtaque(): number;
}

class Carta implements ICarta {


    public readonly id: string;

    private vida: number;
    private ataque: number;
    private readonly raca: Raca;
    private encantado: boolean;
    private readonly tipodecusto: TipoCusto
    private readonly sigilos: EntradaSigilo[];

    constructor(
        vida: 1,
        ataque: 0,
        raca: Raca = "Sem tipo",
        encantado: false,
        tipodecusto: TipoCusto = "Sangue",
        sigilosIds: number[] = []
    ) {
        this.id = crypto.randomUUID();
        this.vida = Math.max(1, vida);
        this.ataque = Math.max(0, ataque);
        this.encantado = encantado;
        this.raca = raca;
        this.tipodecusto = tipodecusto;
        this.sigilos = sigilosIds.map(id => ({ id, usadoNestaRodada: false }));
    }



    public atacar(alvo: Carta, rodada: Rodada): number {
        const dano = this.ataque

        this.acionarHook("aoAtacar", { cartaProprietaria: this, cartaAlvo: alvo, danoCausado: dano, rodada });
        alvo.levarDano(dano, this, rodada);
        return dano;
    }

    public levarDano(dano: number, atacante?: Carta, rodada?: Rodada): void {

        let danoFinal = dano;

        for (const entrada of this.sigilos) {
            const sigil = Habilidades[entrada.id as keyof typeof Habilidades] as Sigilos | undefined;
            if (!sigil?.aoSofrerDano) continue;

            danoFinal = sigil.aoSofrerDano({
                cartaProprietaria: this,
                cartaAtacante: atacante,
                danoSofrido: danoFinal,
                rodada
            });
        }
        this.vida -= Math.max(0, danoFinal);
    }
    public acionarHook<K extends keyof Sigilos>(evento: K, contexto: ContextoEvento): void {
        for (const entrada of this.sigilos) {
            if (entrada.usadoNestaRodada) continue;

            const sigil = Habilidades[entrada.id as keyof typeof Habilidades] as Sigilos;
            const fn = sigil?.[evento];

            if (typeof fn === "function") {
                (fn as (contexto: ContextoEvento) => void)(contexto);
                entrada.usadoNestaRodada = true;
            }
        }

    }


    public estaViva(): boolean {
        return this.vida > 0;
    }
    public resetarSigilos(): void {
        this.sigilos.forEach(s => s.usadoNestaRodada = false);
    }
    public getAtaque(): number {
        return this.ataque;
    }

    public get status() {
        return {
            id: this.id,
            vida: this.vida,
            ataque: this.ataque,
            raca: this.raca,
            encantado: this.encantado,
            tipoDeCusto: this.tipodecusto,
            sigilos: this.sigilos.map(s => s.id)
        };
    }

}

//Raças = Passáros, Canino, Insetos, Ungulados, Anfibios, Reptéis, Sacrificios(Bois, ovelhas e pombos serão os sacrificios), Sem tipo
