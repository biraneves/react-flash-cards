import { useState } from "react";

export default function FlashCard({
    title = 'Título do card',
    description = 'Descrição do card, que pode conter mais palavras do que o título.',
}) {
    const [showTitle, setShowTitle] = useState(true);

    function handleCardClick() {
        setShowTitle(currentShowTitle => !currentShowTitle);
    }

    const fontSize = showTitle ? 'text-xl' : 'text-sm';

    return (
        <div className={`shadow-lg p-4 w-80 h-48 m-4 bg-blue-400 cursor-pointer
            flex flex-row items-center justify-center font-semibold ${fontSize}`}
            style={{fontFamily: "'JetBrains Mono', monospace"}}
            onClick={handleCardClick}>
            {showTitle ? title : description}
        </div>
    );
}