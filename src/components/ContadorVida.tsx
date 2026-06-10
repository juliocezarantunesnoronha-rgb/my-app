'use client';

import React from 'react';
import styles from "./tabuleiro.module.css";

interface BalancaProps {
    vidaJogador1: number;
    vidaJogador2: number;
    vidaMax?: number;
    pc?: boolean; // true = versão lateral (tablet/desktop)
}

export function ContadorVidaBalanca({
    vidaJogador1,
    vidaJogador2,
    vidaMax = 20,
    pc = false
}: BalancaProps) {

    // Calcula o desequilíbrio: positivo = J1 vencendo, negativo = J2 vencendo
    // Sistema de balança: quanto mais vida diferença, mais inclina
    const diferenca = vidaJogador1 - vidaJogador2;

    // Normaliza para escala visual (-40 a 40 graus)
    const rotacao = (diferenca / vidaMax) * 40;

    // Cria segmentos visuais para cada jogador
    const segmentosJogador1 = Array.from({ length: vidaMax }, (_, i) => i < vidaJogador1);
    const segmentosJogador2 = Array.from({ length: vidaMax }, (_, i) => i < vidaJogador2);

    const className = pc ? styles.balancaPc : styles.balanca;

    return (
        <div className={className}>
            {/* Lado Jogador 1 (Você / Esquerda) */}
            <div className={styles.ladoJogador}>
                <div className={styles.vidaTexto}>{vidaJogador1}</div>
                <div className={styles.segmentosContainer}>
                    {segmentosJogador1.map((ativo, i) => (
                        <div
                            key={`j1-${i}`}
                            className={`${styles.segmento} ${ativo ? styles.segmentoAtivo : styles.segmentoInativo}`}
                        />
                    ))}
                </div>
            </div>

            {/* Balança Central */}
            <div className={styles.balancaCentral}>
                <div className={styles.base} />
                <div
                    className={styles.indicador}
                    style={{ transform: `rotate(${rotacao}deg)` }}
                >
                    <div className={styles.ago} />
                </div>
                <div className={styles.marcacoes}>
                    {Array.from({ length: 9 }, (_, i) => (
                        <div
                            key={`marca-${i}`}
                            className={styles.marcacao}
                            style={{
                                transform: `rotate(${(i - 4) * 8}deg) translateY(-48px)`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Lado Jogador 2 (Oponente / Direita) */}
            <div className={styles.ladoJogador}>
                <div className={styles.vidaTexto}>{vidaJogador2}</div>
                <div className={styles.segmentosContainer}>
                    {segmentosJogador2.map((ativo, i) => (
                        <div
                            key={`j2-${i}`}
                            className={`${styles.segmento} ${ativo ? styles.segmentoAtivo : styles.segmentoInativo}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}