import { useState } from "react";
import { todosApi } from "../store/todosApi";

export default function AddTodo() {
    const [value, setValue] = useState("");
    const [addTodo, { isLoading }] = todosApi.useAddTodoMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        addTodo(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                className="border rounded px-2 py-1 flex-1"
                placeholder="Введите задачу"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                disabled={isLoading}
            >
                {isLoading ? "Добавление..." : "Добавить"}
            </button>
        </form>
    );
}
