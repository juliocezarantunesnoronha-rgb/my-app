
const Habilidades = {

    //Ataque
    1: {
        nome: "Ataque Bifurcado",
        img: "https://nocookie.net",
        descricao: "Ataca os espaços à esquerda e à direita do espaço à frente."
    },
    2: {
        nome: "Ataque Trifurcado",
        img: "https://nocookie.net",
        descricao: "Ataca o espaço à frente e também os espaços à esquerda e direita."
    },
    3: {
        nome: "Toque da Morte",
        img: "https://nocookie.net",
        descricao: "Mata instantaneamente qualquer criatura que receba dano desta carta."
    },
    4: {
        nome: "Sniper",
        img: "https://nocookie.net",
        descricao: "Permite escolher qual espaço esta carta irá atacar manualmente."
    },
    5: {
        nome: "Sede de Sangue",
        img: "https://nocookie.net",
        descricao: "Ganha +1 de Ataque permanentemente após matar uma criatura oponente."
    },
    6: {
        nome: "Arremesso de Tesoura",
        img: "https://nocookie.net",
        descricao: "Corta e destrói a carta oposta ao ser jogada (uso único)."
    },
    7: {
        nome: "Bifurcação Direcionada",
        img: "https://nocookie.net",
        descricao: "Ataca o espaço à frente duas vezes por turno."
    },
    8: {
        nome: "Ataque em Grupo",
        img: "https://nocookie.net",
        descricao: "Ganha +1 de Ataque para cada outra carta amigável da mesma raça em jogo."
    },
    9: {
        nome: "Ataque de Salto",
        img: "https://nocookie.net",
        descricao: "Ataca criaturas voadoras primeiro e as derruba, removendo o sigilo Aéreo."
    },

    10: {
        nome: "Fome de Ossos",
        img: "https://nocookie.net",
        descricao: "Sempre que uma criatura morre, esta carta ganha +1 de Ataque durante esse turno."
    },




    //Defesa
    11: {
        nome: "Salto Poderoso",
        img: "https://nocookie.net",
        descricao: "Bloqueia criaturas com o sigilo Aéreo."
    },
    12: {
        nome: "Muitas Vidas",
        img: "https://nocookie.net",
        descricao: "Esta carta não morre quando é sacrificada."
    },
    13: {
        nome: "Armadura de Metal",
        img: "https://nocookie.net",
        descricao: "A primeira vez que esta carta receberia dano em um turno, ela não recebe nada."
    },

    14: {
        nome: "Carapaça Refletora",
        img: "https://nocookie.net",
        descricao: "Quando esta carta recebe dano, ela reduz o dano em 1 e o reflete para a criatura oposta.",

    },
    15: {
        nome: "Escudo Ativo",
        img: "https://nocookie.net",
        descricao: "Dá um escudo de proteção (que bloqueia um hit) para a carta à esquerda."
    },
    16: {
        nome: "Amuleto de Proteção",
        img: "https://nocookie.net",
        descricao: "Cria Barragens (0/2) com o sigilo de Escudo nos espaços adjacentes."
    },
    17: {
        nome: "Nano-blindagem",
        img: "https://nocookie.net",
        descricao: "Ao morrer, anexa um escudo de proteção (que bloqueia um golpe) a uma carta na mão."
    },
    18: {
        nome: "Coração de Aço",
        img: "https://nocookie.net",
        descricao: "Quando esta carta morre, o atacante é destruído e você ganha uma 'Pele de Coelho'."
    },




    //Controle/Debuff
    19: {
        nome: "Repulsivo",
        img: "https://nocookie.net",
        descricao: "Criaturas que tentarem atacar esta carta não realizarão o ataque."
    },
    20: {
        nome: "Fedorento",
        img: "https://nocookie.net",
        descricao: "A criatura oposta a esta carta perde 1 de Ataque."
    },
    21: {
        nome: "Espinhos Afiados",
        img: "https://nocookie.net",
        descricao: "Quando esta carta recebe dano, o atacante recebe 1 de dano de volta."
    },
    22: {
        nome: "Líder",
        img: "https://nocookie.net",
        descricao: "Criaturas adjacentes ganham +1 de Ataque."
    },
    23: {
        nome: "Burburinho",
        img: "https://nocookie.net",
        descricao: "A criatura oposta a esta carta ganha +1 de Ataque."
    },
    24: {
        nome: "Constritor",
        img: "https://nocookie.net",
        descricao: "A criatura oposta a esta carta não pode se mover (anula Batedor)."
    },
    25: {
        nome: "Instinto de Presa",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, cria um Ovo quebrado no lado do oponente (pode chocar algo ruim)."
    },
    26: {
        nome: "Drenagem de Energia",
        img: "https://nocookie.net",
        descricao: "Rouba 1 de Energia do oponente ao causar dano direto."
    },
    27: {
        nome: "Digitalizar",
        img: "https://nocookie.net",
        descricao: "Frágil: Esta carta é destruída imediatamente após realizar um ataque."
    },
    28: {
        nome: "Vingança Silenciosa",
        img: "https://nocookie.net",
        descricao: "Quando uma criatura amigável morre, esta carta ataca o espaço à frente instantaneamente."
    },




    //Suporte/Geração de Recursos
    29: {
        nome: "Toca de Coelho",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, uma carta de Coelho (0/1) é adicionada à sua mão."
    },

    30: {
        nome: "Fecundidade",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, uma cópia fiel desta carta é adicionada à sua mão."
    },
    31: {
        nome: "Acumulador",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, permite buscar qualquer carta no seu baralho."
    },
    32: {
        nome: "Escavador de Ossos",
        img: "https://nocookie.net",
        descricao: "Gera 1 Osso ao final do seu turno."
    },
    33: {
        nome: "Bateria de Reserva",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, fornece uma célula de energia extra para este turno."
    },
    34: {
        nome: "Doador de Presente",
        img: "https://nocookie.net",
        descricao: "Quando esta carta morre, uma carta aleatória é adicionada à sua mão."
    },
    35: {
        nome: "Curandeiro de Circuito",
        img: "https://nocookie.net",
        descricao: "Cura 1 de Vida de todas as criaturas no circuito ao final do turno."
    },
    36: {
        nome: "Poder de Gema",
        img: "https://nocookie.net",
        descricao: "Esta carta ganha +1 de Ataque para cada Mox que você controla."
    },
    37: {
        nome: "Bateria Móvel",
        img: "https://nocookie.net",
        descricao: "Dá +1 de Ataque para todas as cartas em jogo que possuem o sigilo de Bateria."
    },
    38: {
        nome: "Mestre do Reuso",
        img: "https://nocookie.net",
        descricao: "Quando esta carta morre, você recupera parte do custo (Sangue ou Ossos) usado para jogá-la."
    },




    //Gemas/Circuitos/Sinergia de Mox

    39: {
        nome: "Vínculo de Gema",
        img: "https://nocookie.net",
        descricao: "Esta carta morre se você não possuir uma Mox no seu lado do campo."
    },
    40: {
        nome: "Doador de Mox",
        img: "https://nocookie.net",
        descricao: "Enquanto estiver em jogo, esta carta atua como uma joia Esmeralda, Rubi e Safira."
    },
    41: {
        nome: "Conexão de Circuito",
        img: "https://nocookie.net",
        descricao: "Atua como um condutor para completar circuitos entre outras células de circuito."
    },
    42: {
        nome: "Evolução de Gema",
        img: "https://nocookie.net",
        descricao: "Suas Moxes em jogo ganham +1 de Ataque."
    },
    43: {
        nome: "Mestre das Jóias",
        img: "https://nocookie.net",
        descricao: "Cartas que requerem Mox não morrem enquanto esta carta estiver em jogo."
    },
    44: {
        nome: "Gerador de Células",
        img: "https://nocookie.net",
        descricao: "Enquanto estiver em um circuito ativo, cria uma Célula (0/1) adjacente a cada turno."
    },
    45: {
        nome: "Pintor de Gemas",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, transforma todas as suas Moxes em jogo na cor desta carta."
    },
    46: {
        nome: "Sacrifício de Sangue de Gema",
        img: "https://nocookie.net",
        descricao: "Pode ser sacrificada como se fosse 3 Sangues se você controlar uma Mox."
    },

    47: {
        nome: "Conector de Alarmes",
        img: "https://nocookie.net",
        descricao: "Se estiver em um circuito completo, cria um Robô Sentinela (0/1) em cada espaço vazio."
    },




    //Utilitários

    48: {
        nome: "Congelado",
        img: "https://nocookie.net",
        descricao: "Quando esta carta morre, a criatura dentro dela toma seu lugar."
    },
    49: {
        nome: "Aquático",
        img: "https://nocookie.net",
        descricao: "Submerge no turno do oponente; oponentes atacam você diretamente."
    },
    50: {
        nome: "Aéreo",
        img: "https://nocookie.net",
        descricao: "Ataca o oponente diretamente, ignorando criaturas no caminho."
    },
    51: {
        nome: "Batedor",
        img: "https://nocookie.net",
        descricao: "Ao final do seu turno, esta carta move-se para o espaço adjacente na direção indicada."
    },
    52: {
        nome: "Sentinela",
        img: "https://nocookie.net",
        descricao: "Ataca qualquer criatura que se mova para o espaço oposto a esta carta."
    },

    53: {
        nome: "Toque de Gelo",
        img: "https://nocookie.net",
        descricao: "Esta carta é imune aos efeitos do sigilo Toque da Morte."
    },
    54: {
        nome: "Ladrão de Esqueleto",
        img: "https://nocookie.net",
        descricao: "Ao se mover, deixa um Esqueleto (1/1) no espaço anterior."
    },
    55: {
        nome: "Cercador de Ouro",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, você recebe um item aleatório se tiver espaço na mochila."
    },
    56: {
        nome: "Mestre da Lama",
        img: "https://nocookie.net",
        descricao: "Cria uma Barreira de Lama (0/1) nos espaços adjacentes ao ser jogada."
    },
    57: {
        nome: "Empurrão",
        img: "https://nocookie.net",
        descricao: "Ao final do seu turno, empurra a criatura oposta para um espaço adjacente."
    },
    58: {
        nome: "Troca de Pele",
        img: "https://nocookie.net",
        descricao: "Ao receber dano, move-se para o lado e deixa uma Cauda (0/2) no lugar."
    },
    59: {
        nome: "Mergulho Profundo",
        img: "https://nocookie.net",
        descricao: "Fica submersa no turno do oponente, mas emerge para atacar."
    },
    60: {
        nome: "Salto de Sapo",
        img: "https://nocookie.net",
        descricao: "Move-se para o espaço oposto ao atacante para bloquear um ataque Aéreo."
    },
    61: {
        nome: "Caminho de Espinhos",
        img: "https://nocookie.net",
        descricao: "Deixa um rastro de espinhos que causa 1 de dano a quem se mover sobre ele."
    },
    62: {
        nome: "Troca de Lado",
        img: "https://nocookie.net",
        descricao: "Após atacar, esta carta move-se para o lado do oponente no tabuleiro."
    },

    63: {
        nome: "Instinto de Presa",
        img: "https://nocookie.net",
        descricao: "Ao ser jogada, cria um ovo no espaço oposto; o ovo pode chocar um filhote ou um corvo."
    },
    64: {
        nome: "Troca de Poder",
        img: "https://nocookie.net",
        descricao: "Ao gastar 1 de energia, os valores de Ataque e Vida desta carta são sorteados novamente."
    },
    65: {
        nome: "Grande Salto",
        img: "https://nocookie.net",
        descricao: "Move-se dois espaços para o lado em vez de apenas um no final do turno."
    },




    //Ao morrer
    66: {
        nome: "Rei dos Ossos",
        img: "https://nocookie.net",
        descricao: "Gera 4 Ossos em vez de 1 quando esta carta morre."
    },
    67: {
        nome: "Abelheiro",
        img: "https://nocookie.net",
        descricao: "Quando esta carta recebe dano, uma Abelha (1/1, Aéreo) é adicionada à sua mão."
    },
    68: {
        nome: "Bomba de Morte",
        img: "https://nocookie.net",
        descricao: "Quando esta carta morre, ela explode, causando 10 de dano aos espaços adjacentes."
    },
    69: {
        nome: "Explosão de Ossos",
        img: "https://nocookie.net",
        descricao: "Causa 1 de dano a todas as criaturas inimigas quando esta carta morre."
    },
    70: {
        nome: "Explosão de Estilhaços",
        img: "https://nocookie.net",
        descricao: "Quando esta carta é destruída, causa 1 de dano a todas as cartas oponentes."
    },
    71: {
        nome: "Sacrificio Triplo",
        img: "https://nocookie.net",
        descricao: "Ao ser sacrificado, é considerado como 3 Sacrifícios para o custo de outras cartas."
    },





    //Transformação / Tempo de vida
    72: {
        nome: "Imortal",
        img: "https://nocookie.net",
        descricao: "Quando esta carta morre, ela retorna para a sua mão."
    },
    73: {
        nome: "Evolução",
        img: "https://nocookie.net",
        descricao: "Após sobreviver por um turno, esta carta se transforma em uma forma mais poderosa."
    },
    74: {
        nome: "Transformação de Lobo",
        img: "https://nocookie.net",
        descricao: "Transforma-se em um Lobo Faminto após um turno em jogo."
    },
    75: {
        nome: "Crescimento Rápido",
        img: "https://nocookie.net",
        descricao: "Transforma-se na sua forma evoluída imediatamente ao final do turno em que foi jogada."
    },
} satisfies Record<number, Sigilos>;
