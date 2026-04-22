import { CartaUI } from "./CartaUI";

export const Slot = ({ carta, onClick, isInimigo }: { carta: any, onClick?: () => void, isInimigo?: boolean }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        w-28 h-40 border-2 border-dashed border-stone-600/30 
        flex items-center justify-center rounded-sm
        ${!carta && !isInimigo ? 'hover:bg-stone-300/20 cursor-pointer' : ''}
        ${isInimigo ? 'opacity-90' : ''}
      `}
    >
      {carta ? <CartaUI carta={carta} /> : <div className="text-stone-500/20 text-4xl">?</div>}
    </div>
  );
};