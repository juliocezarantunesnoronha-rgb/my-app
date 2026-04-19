
type Jogador = "jogador1" | "jogador2";

interface Posicao {
    coluna: number;
    jogador: Jogador;
}

interface Slot {
    posicao: Posicao;
    carta: Carta | null;
}


class Tabuleiro {
    readonly colunas: number;

    private readonly grid: Record<Jogador, Slot[]>;

    constructor(colunas: number = 4) {
        this.colunas = colunas;
        this.grid = {
            jogador1: this.criarLinha("jogador1"),
            jogador2: this.criarLinha("jogador2"),
        };
    }

    private criarLinha(jogador: Jogador): Slot[] {
        return Array.from({ length: this.colunas }, (_, i) => ({
            posicao: { coluna: i, jogador },
            carta: null,
        }));
    }

    public getSlot(jogador: Jogador, coluna: number): Slot | null {
        if (coluna < 0 || coluna >= this.colunas) return null;
        return this.grid[jogador][coluna];
    }


    public getOposto(jogador: Jogador, coluna: number): Slot | null {
        const inimigo: Jogador = jogador === "jogador1" ? "jogador2" : "jogador1";
        return this.getSlot(inimigo, coluna);
    }

    public getVizinhos(jogador: Jogador, coluna: number): Slot[] {
        return [coluna - 1, coluna + 1]
            .map(c => this.getSlot(jogador, c))
            .filter((s): s is Slot => s !== null);
    }

    public posicionarCarta(carta: Carta, jogador: Jogador, coluna: number): boolean {
        const slot = this.getSlot(jogador, coluna);
        if (!slot || slot.carta !== null) return false; // ocupado
        slot.carta = carta;
        return true;
    }

    public removerCarta(jogador: Jogador, coluna: number): void {
        const slot = this.getSlot(jogador, coluna);
        if (slot) slot.carta = null;
    }

    public getCartas(jogador: Jogador): Carta[] {
        return this.grid[jogador]
            .map(s => s.carta)
            .filter((c): c is Carta => c !== null);
    }
}