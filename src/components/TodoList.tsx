import {todosApi} from "../store/todosApi";


type Props = { onlyCompleted?: boolean };

export default function TodoList({ onlyCompleted }: Props) {
    const {data: todos = [], isLoading} = todosApi.useGetTodosQuery();
    const [toggleTodo] = todosApi.useToggleTodoMutation();
    const [removeTodo] = todosApi.useRemoveTodoMutation();

    if (isLoading) return <div>Загрузка...</div>;

    const visible = onlyCompleted
        ? todos.filter(t => t.completed)
        : todos;

    if (!visible.length) return <div className="text-gray-500">Задач нет</div>;


    return (
        <ul className="space-y-2">
            {visible.map(todo => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between bg-white rounded shadow p-2"
                >
          <span
              className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
                    <button
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => removeTodo(todo.id)}
                    >
                        Удалить
                    </button>
                </li>
            ))}
        </ul>
    );
}
