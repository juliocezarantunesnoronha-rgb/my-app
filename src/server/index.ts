import { createServer } from "http";
import { Server } from "socket.io";
import type { EstadoPartida } from "../tipos/index";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const partidas = new Map<string, EstadoPartida>();
const conexoes = new Map<string, { partidaId: string; jogadorId: "jogador1" | "jogador2" }>();
const slotsPartida = new Map<string, { jogador1: string | null; jogador2: string | null }>();

function atribuirSlot(partidaId: string, socketId: string): "jogador1" | "jogador2" | null {
    if (!slotsPartida.has(partidaId)) {
        slotsPartida.set(partidaId, { jogador1: null, jogador2: null });
    }
    const slots = slotsPartida.get(partidaId)!;
    if (!slots.jogador1) { slots.jogador1 = socketId; return "jogador1"; }
    if (!slots.jogador2) { slots.jogador2 = socketId; return "jogador2"; }
    return null;
}

function liberarSlot(socketId: string) {
    for (const [, slots] of slotsPartida.entries()) {
        if (slots.jogador1 === socketId) slots.jogador1 = null;
        if (slots.jogador2 === socketId) slots.jogador2 = null;
    }
}

function contarJogadores(partidaId: string): number {
    const sala = io.sockets.adapter.rooms.get(partidaId);
    return sala ? sala.size : 0;
}

function executarCombate(partida: EstadoPartida) {
    for (let coluna = 0; coluna < 4; coluna++) {
        const coluna_jogador1 = partida.tabuleiro.jogador1[coluna];
        const coluna_jogador2 = partida.tabuleiro.jogador2[coluna];

        if (coluna_jogador1 && coluna_jogador2) {
            coluna_jogador2.vida -= coluna_jogador1.ataque;
            coluna_jogador1.vida -= coluna_jogador2.ataque;
        } else if (coluna_jogador1) {
            partida.jogadores.jogador2.vida -= coluna_jogador1.ataque;
            partida.jogadores.jogador2.danoDireto += coluna_jogador1.ataque;
        } else if (coluna_jogador2) {
            partida.jogadores.jogador1.vida -= coluna_jogador2.ataque;
            partida.jogadores.jogador1.danoDireto += coluna_jogador2.ataque;
        }
    }

    for (let coluna = 0; coluna < 4; coluna++) {
        if (partida.tabuleiro.jogador1[coluna]?.vida ?? 1 <= 0)
            partida.tabuleiro.jogador1[coluna] = null;
        if (partida.tabuleiro.jogador2[coluna]?.vida ?? 1 <= 0)
            partida.tabuleiro.jogador2[coluna] = null;
    }
}

function criarEstadoInicial(id: string): EstadoPartida {
    return {
        id,
        fase: "aguardando",
        rodada: 1,
        vezDe: "jogador1",
        tabuleiro: {
            jogador1: [null, null, null, null],
            jogador2: [null, null, null, null],
        },
        jogadores: {
            jogador1: { id: "jogador1", vida: 20, mao: [], danoDireto: 0 },
            jogador2: { id: "jogador2", vida: 20, mao: [], danoDireto: 0 },
        }
    };
}

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);



    socket.on("entrar_partida", ({ partidaId }: { partidaId: string }) => {
        if (!partidas.has(partidaId)) {
            partidas.set(partidaId, criarEstadoInicial(partidaId));
        }

        
        const jogadorId = atribuirSlot(partidaId, socket.id);
        if (!jogadorId) {
            socket.emit("erro_entrada", "Sala cheia. Tente outro código.");
            return;
        }

        socket.join(partidaId);
        conexoes.set(socket.id, { partidaId, jogadorId });
        console.log(`${jogadorId} entrou na partida ${partidaId}`);

        socket.emit("slot_atribuido", jogadorId);

        const partida = partidas.get(partidaId)!;

        if (partida.jogadores.jogador1.mao.length === 0) {
            partida.jogadores.jogador1.mao = [
                { id: "carta1", nome: "Lobo", img:"",   vida: 2, ataque: 1, raca: "Canino",   sigilos: [] },
                { id: "carta2", nome: "Coruja", img:"",  vida: 1, ataque: 2, raca: "Pássaro",  sigilos: [] },
            ];
        }
        if (partida.jogadores.jogador2.mao.length === 0) {
            partida.jogadores.jogador2.mao = [
                { id: "carta3", nome: "Urso", img:"", vida: 3, ataque: 2, raca: "Ungulado", sigilos: [] },
                {id: "carta4", nome: "Serpente", img:"", vida: 2, ataque: 1, raca: "Réptil",   sigilos: [] },
            ];
        }


        if (contarJogadores(partidaId) >= 2 && partida.fase === "aguardando") {
            partida.fase = "posicionamento";
            // vezDe já começa em jogador1 no criarEstadoInicial
        }

        io.to(partidaId).emit("estado_atualizado", partida);
    });





    socket.on("posicionar_carta", ({ partidaId, cartaId, colunauna, jogadorId }: {
        partidaId: string;
        cartaId: string;
        colunauna: number;
        jogadorId: "jogador1" | "jogador2";
    }) => {
        const partida = partidas.get(partidaId);
        if (!partida) return;

        if (partida.fase !== "posicionamento") {
            socket.emit("erro", "Não é a fase de posicionamento.");
            return;
        }

        if (partida.vezDe !== jogadorId) {
            socket.emit("erro", "Não é sua vez.");
            return;
        }

        if (partida.tabuleiro[jogadorId][colunauna] !== null) {
            socket.emit("erro", "Slot já ocupado.");
            return;
        }

        const jogador = partida.jogadores[jogadorId];
        const carta = jogador.mao.find(c => c.id === cartaId);
        if (!carta) return;

        partida.tabuleiro[jogadorId][colunauna] = carta;
        jogador.mao = jogador.mao.filter(c => c.id !== cartaId);

        io.to(partidaId).emit("estado_atualizado", partida);
    });





    socket.on("pronto", ({ partidaId, jogadorId }: {
        partidaId: string;
        jogadorId: "jogador1" | "jogador2";
    }) => {
        const partida = partidas.get(partidaId);
        if (!partida) return;

        if (partida.fase !== "posicionamento") return;

        if (partida.vezDe !== jogadorId) {
            socket.emit("erro", "Não é sua vez.");
            return;
        }

        console.log(`${jogadorId} está pronto`);

        if (jogadorId === "jogador1") {
             partida.fase = "combate";

            partida.vezDe = "jogador2";
            io.to(partidaId).emit("estado_atualizado", partida);

        } else {

            partida.fase = "combate";
            io.to(partidaId).emit("estado_atualizado", partida);

            setTimeout(() => {
                executarCombate(partida);

                if (partida.jogadores.jogador1.vida <= 0 || partida.jogadores.jogador2.vida <= 0) {
                    partida.fase = "fim";
                    io.to(partidaId).emit("estado_atualizado", partida);
                    return;
                }

                partida.fase = "posicionamento";
                partida.rodada += 1;
                partida.vezDe = "jogador1";

                io.to(partidaId).emit("estado_atualizado", partida);
            }, 1500);
        }
    });

    socket.on("disconnect", () => {
        liberarSlot(socket.id);
        conexoes.delete(socket.id);
        console.log("Cliente desconectado:", socket.id);
    });
});

httpServer.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});