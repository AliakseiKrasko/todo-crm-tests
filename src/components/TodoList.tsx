import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleTodo, removeTodo } from "../store/todoSlice";

export default function TodoList() {
    const todos = useAppSelector(state => state.todos.items);
    const dispatch = useAppDispatch();

    if (!todos.length) return <div className="text-gray-500">Задач нет</div>;

    return (
        <ul className="space-y-2">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between bg-white rounded shadow p-2"
                >
          <span
              className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
              onClick={() => dispatch(toggleTodo(todo.id))}
          >
            {todo.text}
          </span>
                    <button
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => dispatch(removeTodo(todo.id))}
                    >
                        Удалить
                    </button>
                </li>
            ))}
        </ul>
    );
}
