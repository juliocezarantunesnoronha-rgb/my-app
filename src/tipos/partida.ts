// * Exporta a interface EstadoPartida, que representa o estado atual de uma partida no jogo. Essa interface inclui informações como o id da partida, a fase atual, o número da rodada, o jogador que tem a vez, o estado do tabuleiro para cada jogador e os dados dos jogadores envolvidos na partida. Ao definir essa interface, deixa mais simples a separação dos dados de forma simplificada.

import { JogadorDTO } from "./jogador";
import type { CartaDTO } from "./carta";


// TODO: Adicionar cemitério de cartas e mudar fase de local para separação mais simples.

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