export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com",
  TIMEOUT: 10000,
} as const;

export const ENDPOINTS = {
  COURSES: "/courses",
  QUIZZES: "/quizzes",
  FLASHCARDS: "/flashcard_decks",
} as const;

export const QUERY_KEYS = {
  TODOS: "todos",
  TODO_DETAIL: "todo_detail",
  USERS: "users",
} as const;
