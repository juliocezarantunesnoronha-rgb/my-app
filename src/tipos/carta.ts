
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