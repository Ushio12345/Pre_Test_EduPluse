export interface Flashcard {
    cardId: string;
    front: string;
    back: string;
    example: string;
}

export interface FlashcardDeck {
    id: string;
    courseId: string;
    title: string;
    description: string;
    cards: Flashcard[];
}