import axiosInstance from "./api.client";
import { ENDPOINTS } from "@/constants/api.constant";
import type { Todo } from "@/lib/types/todo.type";

export const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    return axiosInstance.get<Todo[]>(ENDPOINTS.TODOS);
  },

  getTodoById: async (id: number | string): Promise<Todo> => {
    return axiosInstance.get<Todo>(`${ENDPOINTS.TODOS}/${id}`);
  },

  createTodo: async (data: Omit<Todo, "id">): Promise<Todo> => {
    return axiosInstance.post<Todo, typeof data>(ENDPOINTS.TODOS, data);
  }
};
