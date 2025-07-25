import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodosState {
    items: Todo[];
}

const initialState: TodosState = {
    items: [],
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.items.push({
                id: Date.now().toString(),
                text: action.payload,
                completed: false,
            });
        },
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.items.find(item => item.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
