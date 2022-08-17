import { helperShuffleArray } from '../helpers/arrayHelpers';
import { useState } from 'react';
import { apiGetAllFlashCards } from '../services/apiService';

import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

export default function FlashCardsPage() {
    const [allCards, setAllCards] = useState(apiGetAllFlashCards());
    const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

    function handleButtonClick() {
        const shuffledCards = helperShuffleArray(allCards);

        setAllCards(shuffledCards);
    }

    function handleRadioShowDescriptionClick() {
        const updatedCards = [...allCards].map(card => ({...card, showTitle: false}))
        setAllCards(updatedCards);
        setRadioButtonShowTitle(false);
    }

    function handleRadioShowTitleClick() {
        const updatedCards = [...allCards].map(card => ({...card, showTitle: true}));
        setAllCards(updatedCards);
        setRadioButtonShowTitle(true);
    }

    function handleToggleFlashCard(cardId) {
        const updatedCards = [...allCards];
        const cardIndex = updatedCards.findIndex(card => card.id === cardId);
        updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

        setAllCards(updatedCards);
    }

    return (
        <>
            <Header>React Flash Cards - v.2</Header>
            <Main>
                <div className='text-center mb-4'>
                    <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button>
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
                        allCards.map(({id, title, description, showTitle}) => {
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