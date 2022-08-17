export default function FlashCard({
    id,
    title = 'Título do card',
    description = 'Descrição do card, que pode conter mais palavras do que o título.',
    showFlashCardTitle = true,
    onToggleFlashCard = null,
}) {
    // const [showTitle, setShowTitle] = useState(showFlashCardTitle);

    // useEffect(() => {
    //     setShowTitle(showFlashCardTitle);
    // }, [showFlashCardTitle]);

    function handleCardClick() {
        // setShowTitle(currentShowTitle => !currentShowTitle);
        if (onToggleFlashCard)
            onToggleFlashCard(id);
    }

    const fontSize = showFlashCardTitle ? 'text-xl' : 'text-sm';

    return (
        <div className={`shadow-lg p-4 w-80 h-48 m-4 bg-blue-400 cursor-pointer
            flex flex-row items-center justify-center font-semibold ${fontSize}`}
            style={{fontFamily: "'JetBrains Mono', monospace"}}
            onClick={handleCardClick}>
            {showFlashCardTitle ? title : description}
        </div>
    );
}