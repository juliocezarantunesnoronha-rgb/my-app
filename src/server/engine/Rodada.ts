
type FaseRodada = "posicionamento" | "combate" | "fim";

class Rodada {
    public fase: FaseRodada = "posicionamento";
    public numero: number;
    public vezDe: Jogador;
    readonly tabuleiro: Tabuleiro;


    private danoDireto: Record<Jogador, number> = { jogador1: 0, jogador2: 0 };

    constructor(numero: number, tabuleiro: Tabuleiro, primeiroJogador: Jogador = "jogador1") {
        this.numero = numero;
        this.tabuleiro = tabuleiro;
        this.vezDe = primeiroJogador;
    }


    public executarCombate(): void {
        this.fase = "combate";

        for (let col = 0; col < this.tabuleiro.colunas; col++) {
            this.resolverColuna(col, "jogador1");
            this.resolverColuna(col, "jogador2");
        }

        this.resetarSigilos();
        this.fase = "fim";
    }

    private resolverColuna(coluna: number, atacante: Jogador): void {
        const slotAtacante = this.tabuleiro.getSlot(atacante, coluna);
        const cartaAtacante = slotAtacante?.carta;
        if (!cartaAtacante) return;

        const slotAlvo = this.tabuleiro.getOposto(atacante, coluna);
        const cartaAlvo = slotAlvo?.carta;

        if (cartaAlvo) {

            cartaAtacante.atacar(cartaAlvo, this);
            if(cartaAtacante.estaViva()) {
                cartaAlvo.atacar(cartaAtacante, this);
            }
        } else {

            const inimigo: Jogador = atacante === "jogador1" ? "jogador2" : "jogador1";
            this.danoDireto[inimigo] += cartaAtacante.getAtaque();
        }


        this.limparMortos();
    }

    private limparMortos(): void {
        const jogadores: Jogador[] = ["jogador1", "jogador2"];
        for (const jogador of jogadores) {
            for (let col = 0; col < this.tabuleiro.colunas; col++) {
                const slot = this.tabuleiro.getSlot(jogador, col);
                if (slot?.carta && !slot.carta.estaViva()) {

                    slot.carta.acionarHook("aoMorrer", { rodada: this, cartaProprietaria: slot.carta });
                    this.tabuleiro.removerCarta(jogador, col);
                }
            }
        }
    }

    private resetarSigilos(): void {
        const jogadores: Jogador[] = ["jogador1", "jogador2"];
        for (const jogador of jogadores) {
            this.tabuleiro.getCartas(jogador).forEach(c => c.resetarSigilos());
        }
    }

    public getVizinhos(carta: Carta, jogador: Jogador, coluna: number) {
        return this.tabuleiro.getVizinhos(jogador, coluna)
            .map(s => s.carta)
            .filter((c): c is Carta => c !== null);
    }

    public getCampoInimigo(jogador: Jogador): Carta[] {
        const inimigo: Jogador = jogador === "jogador1" ? "jogador2" : "jogador1";
        return this.tabuleiro.getCartas(inimigo);
    }

    public getDanoDireto(): Record<Jogador, number> {
        return { ...this.danoDireto };
    }
}