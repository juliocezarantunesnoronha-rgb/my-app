"use client";

import type { EstadoPartida } from "../types/index";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function usePartida(partidaId: string, jogadorId: string) {
    const [estado, setEstado] = useState<EstadoPartida | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const s = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000"!);
        setSocket(s);

        s.emit("entrar_partida", { partidaId, jogadorId })

        s.on("estado_atualizado", (novoEstado: EstadoPartida) => {
            setEstado(novoEstado);
        });

        return () => { s.disconnect(); };
    }, [partidaId]);

    const posicionarCarta = (cartaId: string, coluna: number) => {
        socket?.emit("posicionar_carta", { cartaId, coluna });
    };

    const declararPronto = () => {
        socket?.emit("pronto");
    };

    return { estado, posicionarCarta, declararPronto };
}