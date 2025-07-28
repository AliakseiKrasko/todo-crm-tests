import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Todos'],
    endpoints: builder => ({
        getTodos: builder.query<Todo[], void>({
            queryFn: async () => {
                const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
                await new Promise(res => setTimeout(res, 300)); // задержка, как будто сервер
                return { data: todos };
            },
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation<Todo, string>({
            queryFn: async (text) => {
                const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
                const newTodo: Todo = {
                    id: Date.now().toString(),
                    text,
                    completed: false,
                };
                todos.push(newTodo);
                localStorage.setItem('todos', JSON.stringify(todos));
                return { data: newTodo };
            },
            invalidatesTags: ['Todos'],
        }),
        toggleTodo: builder.mutation<Todo, string>({
            queryFn: async (id) => {
                const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
                const todo = todos.find(t => t.id === id);
                if (todo) todo.completed = !todo.completed;
                localStorage.setItem('todos', JSON.stringify(todos));
                return { data: todo! };
            },
            invalidatesTags: ['Todos'],
        }),
        removeTodo: builder.mutation<void, string>({
            queryFn: async (id) => {
                let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
                todos = todos.filter(t => t.id !== id);
                localStorage.setItem('todos', JSON.stringify(todos));
                return { data: undefined };
            },
            invalidatesTags: ['Todos'],
        }),
    }),
});