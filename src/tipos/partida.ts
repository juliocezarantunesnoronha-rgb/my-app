import type { Jogador } from "./jogador";
import type { CartaDTO } from "./carta";

export interface JogadorDTO {
    id: string;
    vida: number;
    mao: CartaDTO[];
    danoDireto: number;
}

export interface EstadoPartida {
    id: string;
    fase: "aguardando" | "comprando" | "posicionamento" | "combate" | "fim";
    rodada: number;
    vezDe: Jogador;
    tabuleiro: {
        jogador1: (CartaDTO | null)[];
        jogador2: (CartaDTO | null)[];
    };
    jogadores: {
        jogador1: JogadorDTO;
        jogador2: JogadorDTO;
    };
}