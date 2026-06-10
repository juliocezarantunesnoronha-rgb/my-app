import styles from './tabuleiro.module.css';
import type { CartaDTO } from '../types';

interface CartaUIProps {
    carta: CartaDTO;
    selecionada?: boolean;
    desabilitada?: boolean;
    onClick?: () => void;
}

export function CartaUI({ carta, selecionada, desabilitada, onClick }: CartaUIProps) {
    return (
        <div
            className={`
                ${styles.card}
                ${selecionada ? styles.cardSelecionado : ''}
                ${desabilitada ? styles.cardDesabilitado : ''}
            `}
            onClick={desabilitada ? undefined : onClick}
        >
            <span className={styles.cardNome}>{carta.nome}</span>

            {carta.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={carta.img}
                    alt={carta.nome}
                    className={styles.cardImagem}
                />
            ) : (
                <div className={styles.cardImagemVazia} />
            )}

            <div className={styles.cardStats}>
                <span>{carta.ataque}</span>
                <span>{carta.vida}</span>
            </div>
        </div>
    );
}
