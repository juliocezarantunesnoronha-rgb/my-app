// * Exporta o tipo do jogador que conta um tipo simples de 1 ou outro, e a interface do jogador para separar os dados do jogador em um arquivo separado para melhor organização do código e reutilização em outras partes do projeto. A interface JogadorDTO define a estrutura dos dados de um jogador, incluindo suas propriedades como id, vida, mão de cartas e dano direto.

import { CartaDTO } from "./carta";

export type Jogador = "jogador1" | "jogador2";

export interface JogadorDTO {
    id: string;
    vida: number;
    mao: CartaDTO[];
    danoDireto: number;
}
    