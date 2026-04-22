'use client';
import DecryptedText from '../features/DecryptedText/components/DecryptedText';
import { useRouter } from "next/navigation";

export default function GameHook() {
    const router = useRouter();

    const handleClick = () => {
        setTimeout(() => {
            router.push("/jogo");
        }, 4600);
    }
    return (<button onClick={handleClick}>
        <DecryptedText
            text="CRIPTOGRAFIA"
            speed={280}
            maxIterations={5}
            className="revealed"
            parentClassName="all-letters"
            sequential={true}
            animateOn="click"
            encryptedClassName="encrypted"
            useOriginalCharsOnly={false}
        />
    </button>);

}