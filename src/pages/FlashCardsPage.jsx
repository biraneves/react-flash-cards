import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';

export default function FlashCardsPage() {
    return (
        <>
            <Header>React Flash Cards - v.1</Header>
            <Main>
                <FlashCard />
            </Main>
        </>
    );
}