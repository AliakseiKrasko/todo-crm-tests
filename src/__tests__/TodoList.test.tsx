import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";
import { Provider } from "react-redux";
import { store } from "../store/store";
import * as TodosApiModule from "../store/todosApi";

jest.spyOn(TodosApiModule.todosApi, "useGetTodosQuery").mockImplementation(() => ({
    data: [
        { id: "1", text: "Task 1", completed: false },
        { id: "2", text: "Task 2", completed: true },
    ],
    isLoading: false,
    isError: false,
    error: undefined,
    isSuccess: true,
    refetch: jest.fn(),
}));

jest.spyOn(TodosApiModule.todosApi, "useToggleTodoMutation").mockImplementation(() => [
    jest.fn(), // trigger
    { reset: jest.fn(), originalArgs: undefined }
]);
jest.spyOn(TodosApiModule.todosApi, "useRemoveTodoMutation").mockImplementation(() => [
    jest.fn(),
    { reset: jest.fn(), originalArgs: undefined }
]);

describe("TodoList", () => {
    test("рендерит задачи", () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
});

describe("TodoList (интерактив)", () => {
    const toggleMock = jest.fn();
    const removeMock = jest.fn();

    beforeEach(() => {
        // Мокаем хуки RTK Query
        jest.spyOn(TodosApiModule.todosApi, "useGetTodosQuery").mockImplementation(() => ({
            data: [
                { id: "1", text: "Task 1", completed: false },
                { id: "2", text: "Task 2", completed: true },
            ],
            isLoading: false,
            isError: false,
            error: undefined,
            isSuccess: true,
            refetch: jest.fn(),
        }));

        jest.spyOn(TodosApiModule.todosApi, "useToggleTodoMutation").mockImplementation(() => [
            toggleMock,
            {
                reset: jest.fn(),
                originalArgs: undefined,
                isLoading: false,
                isSuccess: false,
                isError: false,
                error: undefined,
                data: undefined
            }
        ]);
        jest.spyOn(TodosApiModule.todosApi, "useRemoveTodoMutation").mockImplementation(() => [
            removeMock,
            {
                reset: jest.fn(),
                originalArgs: undefined,
                isLoading: false,
                isSuccess: false,
                isError: false,
                data: undefined
            }
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("вызывает toggleTodo при клике по задаче", async () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );

        // Кликаем по первой задаче
        await userEvent.click(screen.getByText("Task 1"));
        expect(toggleMock).toHaveBeenCalledWith("1");
    });

    test("вызывает removeTodo при клике по кнопке 'Удалить'", async () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );

        // Кликаем по кнопке "Удалить" первой задачи
        const deleteButton = screen.getAllByText("Удалить")[0];
        await userEvent.click(deleteButton);
        expect(removeMock).toHaveBeenCalledWith("1");
    });
});
