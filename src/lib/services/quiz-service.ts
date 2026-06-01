import { actionFetch } from "../actions/action-fetch";
import { ENDPOINTS } from "@/constants/api.constant";
import { Quiz, QuizList } from "../types/quiz.type";

export const quizService = {
    getQuizs: async (): Promise<QuizList> => {
        const response = await actionFetch(ENDPOINTS.QUIZZES);

        if (!response.ok) {
            throw new Error(`Failed to fetch quizzes: ${response.statusText}`);
        }

        return response.json() as Promise<QuizList>;
    },

    getQuizById: async (id: string): Promise<Quiz> => {
        const response = await actionFetch(`${ENDPOINTS.QUIZZES}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const quizzes = await response.json() as QuizList;
        const quiz = quizzes.find((q: Quiz) => q.id === id);
        if (!quiz) {
            throw new Error(`Không tìm thấy bài trắc nghiệm với ID: ${id}`);
        }
        return quiz;
    }
};