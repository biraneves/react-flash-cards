import { helperShuffleArray } from '../helpers/arrayHelpers';
import { useEffect, useState } from 'react';
import { apiCreateFlashCard, apiDeleteFlashCard, apiGetAllFlashCards, apiUpdateFlashCard } from '../services/apiService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import Loading from '../components/Loading';
import Error from '../components/Error';

import 'react-tabs/style/react-tabs.css';
import FlashCardItem from '../components/FlashCardItem';
import FlashCardForm from '../components/FlashCardForm';
import { getNewId } from '../services/idService';

export default function FlashCardsPage() {
    // Back end
    const [allCards, setAllCards] = useState([]);

    // Exclusivo para "estudo"
    const [studyCards, setStudyCards] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [createMode, setCreateMode] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedFlashCard, setSelectedFlashCard] = useState(null);
    const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

    useEffect(() => {
        // apiGetAllFlashCards().then(allFlashCards => {
        //     setAllCards(allFlashCards);
        // })

        (async function getAllCards() {
            try {
                const backEndAllCards = await apiGetAllFlashCards();
    
                setAllCards(backEndAllCards);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
            catch (error) {
                setError(error.message);
            }
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

    async function handleDeleteFlashCard(cardId) {
        try {
            // Back end
            await apiDeleteFlashCard(cardId);
            
            // Front end
            setAllCards(allCards.filter(card => card.id !== cardId));
            setError('');
        } catch (error) {
            setError(error.message);
        }
    }

    function handleEditFlashCard(card) {
        setCreateMode(false);
        setSelectedFlashCard(card);
        setSelectedTab(1);
    }

    function handleNewFlashCard() {
        setCreateMode(true);
        setSelectedFlashCard(null);
    }

    function handleTabSelect(tabIndex) {
        setSelectedTab(tabIndex);
    }

    async function handlePersist(title, description) {
        if (createMode) {
            try {
                // Back end
                const newFlashCard = await apiCreateFlashCard(title, description);
    
                // Front End
                setAllCards([...allCards, newFlashCard]);

                setError('');
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                // Back end
                await apiUpdateFlashCard(selectedFlashCard.id, title, description);

                // Front end
                setAllCards(allCards.map(card => {
                    if (card.id === selectedFlashCard.id)
                        return { ...card, title, description };
                    
                    return card;
                }));
    
                setSelectedFlashCard(null);
                setCreateMode(true);
                setSelectedTab(0);
                setError('');
            } catch (error) {
                setError(error.message);
            }
        }
    }

    let mainJsx = (
        <div className='flex justify-center my-4'>
            <Loading />
        </div>
    );

    if (error) {
        mainJsx = <Error>{error}</Error>
    }

    if (!loading && !error) {
        mainJsx = (
            <>
                <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
                    <TabList>
                        <Tab>Listagem</Tab>
                        <Tab>Cadastro</Tab>
                        <Tab>Estudo</Tab>
                    </TabList>

                    <TabPanel>
                        {
                            allCards.map(flashCard => {
                                return <FlashCardItem 
                                    key={flashCard.id} 
                                    onDelete={handleDeleteFlashCard}
                                    onEdit={handleEditFlashCard}
                                >
                                    {flashCard}
                                </FlashCardItem>
                            })
                        }
                    </TabPanel>

                    <TabPanel>
                        <div className='my-4'>
                            <Button onButtonClick={handleNewFlashCard}>Novo FlashCard</Button>
                        </div>
                        <FlashCardForm createMode={createMode} onPersist={handlePersist}>{selectedFlashCard}</FlashCardForm>
                    </TabPanel>

                    <TabPanel>
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
                    </TabPanel>
                </Tabs>

            </>);
    }

    return (
        <>
            <Header>React Flash Cards - v.2</Header>
            <Main>
                {mainJsx}
            </Main>
        </>
    );
}