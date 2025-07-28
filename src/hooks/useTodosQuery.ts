import {useQuery} from "@tanstack/react-query";

function fetchTodos() {
    return new Promise(resolve => {
        setTimeout(() => {
            const todos = JSON.parse(localStorage.getItem('todos') || '[]')
            resolve(todos)
        }, 500)
    })
}

export function useTodosQuery() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    })
}