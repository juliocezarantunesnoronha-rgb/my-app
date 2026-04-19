import { CartaUI } from "./CartaUI";
import { Slot } from "./Slot";
import { useState } from "react";

export default function Tabuleiro() {

    const slotsInimigos = [null, { nome: "Lobo", ataque: 3, vida: 2 }, null, null];
    const [meusSlots, setMeusSlots] = useState(Array(4).fill(null));
    const [mao, setMao] = useState([{ id: 1, nome: "Esquilo", ataque: 0, vida: 1 }]);
    const [selecionadaId, setSelecionadaId] = useState<number | null>(null);

    const posicionarCarta = (index: number) => {
        if (selecionadaId !== null && !meusSlots[index]) {
            const carta = mao.find(c => c.id === selecionadaId);
            const novosSlots = [...meusSlots];
            novosSlots[index] = carta;
            setMeusSlots(novosSlots);
            setMao(mao.filter(c => c.id !== selecionadaId));
            setSelecionadaId(null);
        }
    };

    return (
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center gap-12 p-8 overflow-hidden">
            {/* Campo Inimigo */}
            <div className="grid grid-cols-4 gap-6 rotate-180 opacity-60">
                {slotsInimigos.map((c, i) => <Slot key={i} carta={c} isInimigo />)}
            </div>

            {/* Seu Campo */}
            <div className="grid grid-cols-4 gap-6">
                {meusSlots.map((c, i) => <Slot key={i} carta={c} onClick={() => posicionarCarta(i)} />)}
            </div>

            {/* Sua Mão */}
            <div className="flex gap-4 mt-8">
                {mao.map((c) => (
                    <div key={c.id} onClick={() => setSelecionadaId(c.id)}>
                        <CartaUI carta={c} selecionada={selecionadaId === c.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}