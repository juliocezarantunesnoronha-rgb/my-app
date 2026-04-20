// * Exporta os tipos e a interface da Carta, permitindo que seja salvo em um arquivo separado para melhor organização do código e reutilização em outras partes do projeto. A interface CartaDTO define a estrutura dos dados de uma carta, incluindo suas propriedades como id, nome, vida, ataque, raça, imagem e sigilos. Os tipos Raca e TipoCusto definem os valores possíveis para a raça da carta e o tipo de custo associado a ela, respectivamente.


export type Raca =
    | "Pássaro" | "Canino" | "Inseto" | "Ungulado"
    | "Anfíbio" | "Réptil" | "Sacrifício" | "Sem tipo";

export type TipoCusto = "Sangue" | "Ossos" | "Energia" | "Pedras";

export interface CartaDTO {
    id: string;
    nome: string;
    vida: number;
    ataque: number;
    raca: Raca;
    img: string;
    sigilos: number[];
}