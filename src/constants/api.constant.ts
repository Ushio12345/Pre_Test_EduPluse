export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com",
  TIMEOUT: 10000,
} as const;

export const ENDPOINTS = {
  TODOS: "/todos",
  USERS: "/users",
  POSTS: "/posts",
} as const;

export const QUERY_KEYS = {
  TODOS: "todos",
  TODO_DETAIL: "todo_detail",
  USERS: "users",
} as const;
