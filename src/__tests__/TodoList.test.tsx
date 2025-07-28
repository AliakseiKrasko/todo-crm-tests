import { render, screen } from "@testing-library/react";
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
