import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

export default function App() {
    return (
        <div className="max-w-xl mx-auto mt-10 bg-gray-50 p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Todo CRM</h1>
            <AddTodo />
            <TodoList />
        </div>
    );
}