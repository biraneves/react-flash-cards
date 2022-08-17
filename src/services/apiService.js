import { get } from "./httpService";

const BACK_END_URL = 'http://localhost:3004/flashcards';

export async function apiGetAllFlashCards() {
    const allFlashCards = await get(BACK_END_URL);

    return allFlashCards;
}