"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import type { EstadoPartida, CartaDTO } from "../../../types";
import styles from "./page.module.css";

export default function PartidaPage() {
    const router = useRouter();
    const params = useParams();
    const partidaId = params.id as string;

    const [socket, setSocket] = useState<Socket | null>(null);
    const [estado, setEstado] = useState<EstadoPartida | null>(null);
    const [jogadorId, setJogadorId] = useState<"jogador1" | "jogador2" | null>(null);
    const [cartaSelecionada, setCartaSelecionada] = useState<CartaDTO | null>(null);

    const euEstouPronto = jogadorId
        ? (jogadorId === "jogador1" && estado?.vezDe === "jogador2") ||
        (jogadorId === "jogador2" && (estado?.fase === "combate" || estado?.fase === "fim"))
        : false;

    useEffect(() => {
        const novoSocket = io("http://localhost:3001");

        novoSocket.on("connect", () => {
            console.log("Conectado!");
            novoSocket.emit("entrar_partida", { partidaId });
        });

        novoSocket.on("slot_atribuido", (id: "jogador1" | "jogador2") => {
            setJogadorId(id);
        });

        novoSocket.on("estado_atualizado", (novoEstado: EstadoPartida) => {
            setEstado(novoEstado);

            setCartaSelecionada(null);
        });

        novoSocket.on("erro_entrada", (msg: string) => {
            alert(msg);
            router.push("/");
        });

        novoSocket.on("erro", (msg: string) => {
            alert(msg);
        });

        setSocket(novoSocket);
        return () => { novoSocket.disconnect(); };
    }, [partidaId]); // ✅ removido jogadorId das deps — causava reconexão em loop

    if (!estado || !jogadorId) {
        return <div className={styles.loading}>Entrando na partida...</div>;
    }

    if (estado.fase === "aguardando") {
        return <div className={styles.loading}>Aguardando oponente...</div>;
    }

    if (estado.fase === "fim") {
        const vencedor = estado.jogadores.jogador1.vida <= 0 ? "jogador2" : "jogador1";
        return (
            <div className={styles.loading}>
                <h2>{vencedor === jogadorId ? "Você venceu! 🏆" : "Você perdeu! 💀"}</h2>
                <button onClick={() => router.push("/")}>Voltar ao menu</button>
            </div>
        );
    }

    const meuCampo = estado.tabuleiro[jogadorId];
    const campoInimigo = estado.tabuleiro[jogadorId === "jogador1" ? "jogador2" : "jogador1"];
    const minhaVida = estado.jogadores[jogadorId].vida;
    const vidaInimiga = estado.jogadores[jogadorId === "jogador1" ? "jogador2" : "jogador1"].vida;
    const minhasMaos = estado.jogadores[jogadorId].mao;
    const ehMinhaVez = estado.vezDe === jogadorId && estado.fase === "posicionamento";

    const handleSelecionarCarta = (carta: CartaDTO) => {
        if (!ehMinhaVez) return;
        setCartaSelecionada(prev => prev?.id === carta.id ? null : carta);
    };

    const handleClicarSlot = (coluna: number) => {
        if (!ehMinhaVez || !cartaSelecionada) return;
        if (meuCampo[coluna] !== null) return; // slot ocupado
        socket?.emit("posicionar_carta", {
            partidaId,
            cartaId: cartaSelecionada.id,
            coluna,
            jogadorId,
        });
        setCartaSelecionada(null);
    };

    const handlePronto = () => {
        if (!ehMinhaVez) return;
        socket?.emit("pronto", { partidaId, jogadorId });
    };

    return (
        <div className={styles.container}>
            {/* CABEÇALHO */}
            <div className={styles.header}>
                <div className={styles.vidaInimiga}>
                    <span className={styles.label}>Inimigo</span>
                    <span className={styles.vida}>{vidaInimiga} ❤️</span>
                </div>
                <div className={styles.info}>
                    <span>Rodada {estado.rodada}</span>
                    <span className={estado.fase === "posicionamento" ? styles.posicionamento : styles.combate}>
                        {estado.fase.toUpperCase()}
                    </span>
                    {/* ✅ Mostra claramente de quem é a vez */}
                    <span style={{ fontWeight: 500, color: ehMinhaVez ? "green" : "gray" }}>
                        {estado.fase === "combate"
                            ? "Combate em andamento..."
                            : ehMinhaVez
                                ? "Sua vez"
                                : "Vez do oponente"}
                    </span>
                </div>
                <div className={styles.minhaVida}>
                    <span className={styles.label}>Você</span>
                    <span className={styles.vida}>{minhaVida} ❤️</span>
                </div>
            </div>

            {/* CAMPO INIMIGO */}
            <div className={styles.tabuleiroInimigo}>
                <h3>Campo do Inimigo</h3>
                <div className={styles.slots}>
                    {campoInimigo.map((carta, idx) => (
                        <CartaSlot key={idx} carta={carta} indisponivel />
                    ))}
                </div>
            </div>

            {/* SEU CAMPO */}
            <div className={styles.tabuleiroSeu}>
                <h3>Seu Campo</h3>
                <div className={styles.slots}>
                    {meuCampo.map((carta, idx) => (
                        <CartaSlot
                            key={idx}
                            carta={carta}
                            clicavel={ehMinhaVez && !carta && cartaSelecionada !== null}
                            onClique={() => handleClicarSlot(idx)}
                        />
                    ))}
                </div>
            </div>

            {/* MÃO */}
            <div className={styles.mao}>
                <h3>Sua Mão {!ehMinhaVez && <span style={{ fontSize: "12px", color: "gray" }}>(aguarde sua vez)</span>}</h3>
                <div className={styles.cartas}>
                    {minhasMaos.length === 0
                        ? <span style={{ fontSize: "13px", color: "gray" }}>Mão vazia</span>
                        : minhasMaos.map((carta) => (
                            <CartaItem
                                key={carta.id}
                                carta={carta}
                                selecionada={cartaSelecionada?.id === carta.id}
                                desabilitada={!ehMinhaVez}
                                onClick={() => handleSelecionarCarta(carta)}
                            />
                        ))
                    }
                </div>
            </div>

            {/* BOTÃO PRONTO */}
            <button
                className={styles.botaoPronto}
                onClick={handlePronto}
                disabled={!ehMinhaVez || euEstouPronto}
            >
                {euEstouPronto ? "Aguardando oponente..." : "Pronto!"}
            </button>
        </div>
    );
}

function CartaSlot({
    carta,
    indisponivel = false,
    clicavel = false,
    onClique,
}: {
    carta: CartaDTO | null;
    indisponivel?: boolean;
    clicavel?: boolean;
    onClique?: () => void;
}) {
    return (
        <div
            className={`${styles.slot} ${carta ? styles.comCarta : ""} ${indisponivel ? styles.indisponivel : ""} ${clicavel ? styles.clicavel : ""}`}
            onClick={onClique}
        >
            {carta ? (
                <div className={styles.carta}>
                    <span className={styles.nome}>{carta.nome}</span>
                    <span className={styles.stats}>⚔️ {carta.ataque} | ❤️ {carta.vida}</span>
                    <span className={styles.raca}>{carta.raca}</span>
                </div>
            ) : (
                <span className={styles.vazio}>{clicavel ? "▼" : "+"}</span>
            )}
        </div>
    );
}

function CartaItem({
    carta,
    selecionada,
    desabilitada,
    onClick,
}: {
    carta: CartaDTO;
    selecionada: boolean;
    desabilitada: boolean;
    onClick: () => void;
}) {
    return (
        <div
            className={`${styles.cartaMao} ${selecionada ? styles.selecionada : ""} ${desabilitada ? styles.desabilitada : ""}`}
            onClick={desabilitada ? undefined : onClick}
        >
            <div className={styles.cartaConteudo}>
                <span className={styles.nome}>{carta.nome}</span>
                <span className={styles.stats}>⚔️ {carta.ataque} | ❤️ {carta.vida}</span>
                <span className={styles.raca}>{carta.raca}</span>
            </div>
        </div>
    );
}