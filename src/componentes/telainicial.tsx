import DecryptedText from '../configurações/DecryptedText';
import "./style.css";
import GameHook from '../ganchos/gameHook';
import EvilEye from '../configurações/EvilEye';

import Link from 'next/link';

export default function TelaInicial() {
    return <div className="fundo">

        <EvilEye
            eyeColor="#808080"
            intensity={0.9}
            pupilSize={1}
            irisWidth={0.75}
            glowIntensity={1.5}
            scale={0.3}
            noiseScale={1.9}
            pupilFollow={2.6}
            flameSpeed={0.6}
            backgroundColor="#020202"
        />
        <div className='telainicial'>
            SEJA BEM VINDO À
            <GameHook />
        </div>
    </div >
}