import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



function CompletedPage() {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Выполненные задачи</h2>
            <TodoList onlyCompleted />
            <Link to="/" className="text-blue-500">⬅️ Все задачи</Link>
        </div>
    )
}

function HomePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Все задачи</h1>
            <AddTodo />
            <TodoList />
            <Link to="/completed" className="text-blue-500">Только выполненные</Link>
        </div>
    )
}


export default function App() {
    return (
        <BrowserRouter>
            <div className="max-w-xl mx-auto mt-10 bg-gray-50 p-8 rounded shadow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/completed" element={<CompletedPage />} />
                </Routes>
            </div>
        </BrowserRouter>

    );
}