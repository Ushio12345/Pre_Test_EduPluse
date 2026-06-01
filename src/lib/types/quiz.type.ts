export type QuestionType = "single_choice" | "multiple_choice" | "boolean";

export interface QuizOption {
    optionId: string;
    text: string;
}

export interface QuizQuestion {
    questionId: string;
    order: number;
    questionText: string;
    questionType: QuestionType;
    options: QuizOption[];
    correctAnswer: string[];
    explanation?: string;
}
export interface QuizAttemptResult {
    quizId: string;
    totalQuestions: number;
    correctCount: number;
    score: number;
    isPassed: boolean;
    details: {
        questionId: string;
        userAnswers: string[];
        isCorrect: boolean;
    }[];
}

export interface Quiz {
    id: string;
    courseId: string;
    title: string;
    timeLimit: number;
    passingScore: number;
    questions: QuizQuestion[];
}

export type QuizList = Quiz[];