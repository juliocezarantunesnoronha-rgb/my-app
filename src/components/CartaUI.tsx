export const CartaUI = ({ carta, selecionada }: { carta: any, selecionada?: boolean }) => {
    return (
        <div className={`
      relative w-24 h-36 border-2 border-stone-800 bg-stone-200 
      flex flex-col items-center justify-between p-2 shadow-lg cursor-pointer
      transition-transform ${selecionada ? '-translate-y-4 border-yellow-700' : 'hover:scale-105'}
    `}>
            <span className="text-xs font-bold uppercase text-stone-900">{carta.nome}</span>
            <div className="w-16 h-16 bg-stone-400 border border-stone-600 grayscale opacity-80" />
            <div className="flex justify-between w-full font-serif font-bold text-stone-900">
                <span>{carta.ataque}</span>
                <span>{carta.vida}</span>
            </div>
        </div>
    );
};