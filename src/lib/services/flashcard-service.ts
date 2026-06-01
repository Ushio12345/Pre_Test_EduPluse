import { actionFetch } from "../actions/action-fetch";
import { ENDPOINTS } from "@/constants/api.constant";
import { FlashcardDeck } from "../types/flashcard.type";

export const flashcardService = {

    getFlashcards: async (): Promise<FlashcardDeck[]> => {
        const response = await actionFetch(ENDPOINTS.FLASHCARDS);

        if (!response.ok) {
            throw new Error(`Failed to fetch Flashcards: ${response.statusText}`);
        }
        const data = await response.json() as FlashcardDeck[];

        return data;
    },

    getFlashcardsByCourse: async (courseId: string): Promise<FlashcardDeck | undefined> => {
        const response = await actionFetch(ENDPOINTS.FLASHCARDS);

        if (!response.ok) {
            throw new Error(`Failed to fetch Flashcards: ${response.statusText}`);
        }

        const data = await response.json() as FlashcardDeck[];

        return data.find(deck => deck.courseId === courseId);
    }
};