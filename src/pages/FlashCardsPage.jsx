import { allFlashCards } from '../data/allFlashCards';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import { useState } from 'react';

import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';

export default function FlashCardsPage() {
    const [allCards, setAllCards] = useState(allFlashCards);
    const [showTitle, setShowTitle] = useState(false);

    function handleButtonClick() {
        const shuffledCards = helperShuffleArray(allCards);

        setAllCards(shuffledCards);
    }

    function handleRadioShowDescriptionClick() {
        setShowTitle(false);
    }

    function handleRadioShowTitleClick() {
        setShowTitle(true);
    }

    return (
        <>
            <Header>React Flash Cards - v.1</Header>
            <Main>
                <div className='text-center mb-4'>
                    <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button>
                </div>
                <div className='flex flex-row items-center justify-center space-x-4 m-4'>
                    <RadioButton id='radioButtonShowTitle' name='showInfo' buttonChecked={showTitle}
                        onButtonClick={handleRadioShowTitleClick}>
                        Mostrar título
                    </RadioButton>
                    <RadioButton id='radioButtonShowDescription' name='showInfo' buttonChecked={!showTitle}
                        onButtonClick={handleRadioShowDescriptionClick}>
                        Mostrar descrição
                    </RadioButton>
                </div>
                <FlashCards>
                    {
                        allCards.map(({id, title, description}) => {
                            return (
                                <FlashCard key={id} title={title}
                                    description={description}
                                    showFlashCardTitle={showTitle} />
                            );
                        })
                    }
                </FlashCards>
            </Main>
        </>
    );
}