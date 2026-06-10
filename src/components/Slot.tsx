import styles from './tabuleiro.module.css';
import type { CartaDTO } from '../types';
import { CartaUI } from './CartaUI';

interface SlotProps {
    carta: CartaDTO | null;
    isInimigo?: boolean;
    clicavel?: boolean;
    onClick?: () => void;
}

export function Slot({ carta, isInimigo = false, clicavel = false, onClick }: SlotProps) {
    return (
        <div
            className={`
                ${styles.slot}
                ${!isInimigo ? styles.slotJogador : ''}
                ${clicavel && !carta ? styles.slotClicavel : ''}
            `}
            onClick={clicavel && !carta ? onClick : undefined}
        >
            {carta && <CartaUI carta={carta} />}
        </div>
    );
}
