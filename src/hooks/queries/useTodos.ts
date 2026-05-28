import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "@/lib/services/todo.service";
import { QUERY_KEYS } from "@/constants/api.constant";
import type { Todo } from "@/lib/types/todo.type";

export const useTodos = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: todoService.getTodos,
  });
};

export const useTodo = (id: number | string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODO_DETAIL, id],
    queryFn: () => todoService.getTodoById(id),
    enabled: !!id && enabled,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: Omit<Todo, "id">) => todoService.createTodo(newTodo),
    onSuccess: () => {
      // Invalidate the cache to refetch the todos list after creating a new one
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
    },
  });
};
