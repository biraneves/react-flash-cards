import { helperShuffleArray } from '../helpers/arrayHelpers';
import { useEffect, useState } from 'react';
import { apiGetAllFlashCards } from '../services/apiService';

import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

export default function FlashCardsPage() {
    // Back end
    const [allCards, setAllCards] = useState([]);

    // Exclusivo para "estudo"
    const [studyCards, setStudyCards] = useState([]);

    const [loading, setLoading] = useState(true);
    const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

    useEffect(() => {
        // apiGetAllFlashCards().then(allFlashCards => {
        //     setAllCards(allFlashCards);
        // })

        (async function getAllCards() {
            const backEndAllCards = await apiGetAllFlashCards();
            setAllCards(backEndAllCards);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
    }, [allCards]);

    function handleShuffle() {
        const shuffledCards = helperShuffleArray(studyCards);

        setStudyCards(shuffledCards);
    }

    function handleRadioShowDescriptionClick() {
        const updatedCards = [...studyCards].map(card => ({...card, showTitle: false}))
        setStudyCards(updatedCards);
        setRadioButtonShowTitle(false);
    }

    function handleRadioShowTitleClick() {
        const updatedCards = [...studyCards].map(card => ({...card, showTitle: true}));
        setStudyCards(updatedCards);
        setRadioButtonShowTitle(true);
    }

    function handleToggleFlashCard(cardId) {
        const updatedCards = [...studyCards];
        const cardIndex = updatedCards.findIndex(card => card.id === cardId);
        updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

        setStudyCards(updatedCards);
    }

    return (
        <>
            <Header>React Flash Cards - v.2</Header>
            <Main>
                <div className='text-center mb-4'>
                    <Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
                </div>
                <div className='flex flex-row items-center justify-center space-x-4 m-4'>
                    <RadioButton 
                        id='radioButtonShowTitle' 
                        name='showInfo' 
                        buttonChecked={radioButtonShowTitle}
                        onButtonClick={handleRadioShowTitleClick}>
                        Mostrar título
                    </RadioButton>
                    <RadioButton 
                        id='radioButtonShowDescription' 
                        name='showInfo' 
                        buttonChecked={!radioButtonShowTitle}
                        onButtonClick={handleRadioShowDescriptionClick}>
                        Mostrar descrição
                    </RadioButton>
                </div>
                <FlashCards>
                    {
                        studyCards.map(({id, title, description, showTitle}) => {
                            return (
                                <FlashCard 
                                    key={id}
                                    id={id}
                                    title={title}
                                    description={description}
                                    showFlashCardTitle={showTitle}
                                    onToggleFlashCard={handleToggleFlashCard} />
                            );
                        })
                    }
                </FlashCards>
            </Main>
        </>
    );
}