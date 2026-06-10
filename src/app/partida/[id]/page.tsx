"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import type { EstadoPartida, CartaDTO } from "../../../types";

import styles from "../../../components/tabuleiro.module.css";
import { ContadorVidaBalanca } from "../../../components/ContadorVida";
import { CartaUI } from "../../../components/CartaUI";
import { Slot } from "../../../components/Slot";

export default function PartidaPage() {
    const router = useRouter();
    const params = useParams();
    const partidaId = params.id as string;

    const [socket, setSocket] = useState<Socket | null>(null);
    const [estado, setEstado] = useState<EstadoPartida | null>(null);
    const [jogadorId, setJogadorId] = useState<"jogador1" | "jogador2" | null>(null);
    const [cartaSelecionada, setCartaSelecionada] = useState<CartaDTO | null>(null);

    useEffect(() => {
        const novoSocket = io("http://localhost:3001");

        novoSocket.on("erro_entrada", (msg: string) => {
            alert(msg);
            router.push("/jogo");
        });

        novoSocket.on("erro", (msg: string) => {
            alert(msg);
        });

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

        setSocket(novoSocket);
        return () => { novoSocket.disconnect(); };
    }, [partidaId]);

    // ── Loading / Aguardando ──────────────────────────────────────────
    if (!estado || !jogadorId) {
        return (
            <div className={styles.loading}>
                Entrando na partida...
            </div>
        );
    }

    if (estado.fase === "aguardando") {
        return (
            <div className={styles.loading}>
                Aguardando oponente...
            </div>
        );
    }

    if (estado.fase === "fim") {
        const vencedor = estado.jogadores.jogador1.vida <= 0 ? "jogador2" : "jogador1";
        return (
            <div className={styles.loading}>
                <h2>{vencedor === jogadorId ? "Você venceu! 🏆" : "Você perdeu! 💀"}</h2>
                <button onClick={() => router.push("/jogo")}>Voltar ao menu</button>
            </div>
        );
    }

    // ── Dados derivados ───────────────────────────────────────────────
    const inimigoId = jogadorId === "jogador1" ? "jogador2" : "jogador1";

    const meuCampo = estado.tabuleiro[jogadorId];
    const campoInimigo = estado.tabuleiro[inimigoId];
    const minhaVida = estado.jogadores[jogadorId].vida;
    const vidaInimiga = estado.jogadores[inimigoId].vida;
    const minhasMaos = estado.jogadores[jogadorId].deck;
    const ehMinhaVez = estado.vezDe === jogadorId && estado.fase === "posicionamento";
    const vidaMax = 20; // valor inicial definido no servidor

    // ── Handlers ─────────────────────────────────────────────────────
    const handleSelecionarCarta = (carta: CartaDTO) => {
        if (!ehMinhaVez) return;
        setCartaSelecionada((prev) => prev?.id === carta.id ? null : carta);
    };

    const handleClicarSlot = (coluna: number) => {
        if (!ehMinhaVez || !cartaSelecionada) return;
        if (meuCampo[coluna] !== null) return;
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

    const faseBadge = estado.fase === "combate"
        ? "Combate..."
        : ehMinhaVez
            ? `Turno ${estado.rodada}`
            : `Turno ${estado.rodada}`;

    // ── Render ────────────────────────────────────────────────────────
    return (
        <div className={styles.tabuleiro}>

            {/* ── HEADER BAR: visível apenas em mobile (< 480px) ── */}
            <div className={styles.headerBar}>
                <ContadorVidaBalanca
                    vidaJogador1={minhaVida}
                    vidaJogador2={vidaInimiga}
                    vidaMax={vidaMax}
                />
                <div className={styles.turno}>
                    {estado.fase === "combate"
                        ? "Combate"
                        : ehMinhaVez
                            ? "Sua vez"
                            : "Oponente"}
                    &nbsp;·&nbsp;R{estado.rodada}
                </div>
            </div>

            {/* ── CONTADOR DE VIDA: lateral em tablet/desktop ── */}
            <ContadorVidaBalanca
                vidaJogador1={minhaVida}
                vidaJogador2={vidaInimiga}
                vidaMax={vidaMax}
                pc
            />

            {/* ── ÁREA DE BATALHA ── */}
            <div className={styles.areaCartas}>

                {/* Campo do inimigo */}
                <div className={styles.batalha}>
                    {campoInimigo.map((carta, idx) => (
                        <Slot
                            key={idx}
                            carta={carta}
                            isInimigo
                        />
                    ))}
                </div>

                {/* Seu campo */}
                <div className={styles.batalha}>
                    {meuCampo.map((carta, idx) => (
                        <Slot
                            key={idx}
                            carta={carta}
                            clicavel={ehMinhaVez && !carta && cartaSelecionada !== null}
                            onClick={() => handleClicarSlot(idx)}
                        />
                    ))}
                </div>
            </div>

            {/* ── DECK WRAP: lateral em tablet/desktop ── */}
            <div className={styles.deckWrap}>
                <div className={styles.deck}>
                    <span className={styles.deckCount}>
                        {minhasMaos.length} cartas
                    </span>
                </div>
                <div
                    className={`${styles.deck} ${styles.deckSacrificio}`}
                    onClick={handlePronto}
                    title={ehMinhaVez ? "Passar turno" : "Aguardando..."}
                />
            </div>

            {/* ── FOOTER BAR: visível apenas em mobile ── */}
            <div className={styles.footerBar}>
                <div className={styles.deck} style={{ height: "clamp(50px, 10vw, 70px)" }}>
                    <span className={styles.deckCount}>{minhasMaos.length} cartas</span>
                </div>
                <div
                    className={`${styles.deck} ${styles.deckSacrificio}`}
                    style={{ height: "clamp(50px, 10vw, 70px)" }}
                    onClick={handlePronto}
                />
            </div>

            {/* ── MÃO DO JOGADOR ── */}
            <div className={styles.mao}>
                {minhasMaos.length === 0 ? (
                    <span style={{ fontSize: "0.7rem", color: "rgba(201,168,76,0.4)", fontFamily: "'Crimson Text', serif" }}>
                        Mão vazia
                    </span>
                ) : (
                    minhasMaos.map((carta) => (
                        <CartaUI
                            key={carta.id}
                            carta={carta}
                            selecionada={cartaSelecionada?.id === carta.id}
                            desabilitada={!ehMinhaVez}
                            onClick={() => handleSelecionarCarta(carta)}
                        />
                    ))
                )}
            </div>

        </div>
    );
}
