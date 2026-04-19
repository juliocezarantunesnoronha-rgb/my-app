"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Lobby() {
    const router = useRouter();
    const [codigo, setCodigo] = useState("");
    const [erro, setErro] = useState("");

    const codigoValido = codigo.trim().length >= 3;

    const entrar = () => {
        if (!codigoValido) { setErro("Código precisa ter ao menos 3 caracteres."); return; }
        router.push(`/partida/${codigo.trim().toUpperCase()}`);
    };

    return (
        <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 500 }}>Entrar na partida</h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                Crie uma sala com um código ou entre numa existente.
            </p>
            <input
                type="text"
                placeholder="Ex: SALA42"
                maxLength={12}
                value={codigo}
                onChange={e => { setCodigo(e.target.value.toUpperCase()); setErro(""); }}
                onKeyDown={e => e.key === "Enter" && entrar()}
                style={{ textAlign: "center", letterSpacing: "0.1em", width: "200px", fontSize: "16px" }}
            />
            {erro && <p style={{ color: "var(--color-text-danger)", fontSize: "13px" }}>{erro}</p>}
            <button onClick={entrar} disabled={!codigoValido}>
                Entrar ↗
            </button>
            <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                Se a sala não existir, ela será criada automaticamente.
            </p>
        </main>
    );
}