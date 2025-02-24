const TODO_STORAGE_KEY = 'todos';
import { Todo } from "../models/Todo";

export const loadTodos = (): Todo[] => {
    try {
        const serializedTodos = localStorage.getItem(TODO_STORAGE_KEY);
        if (serializedTodos === null) {
            return [];
        }
        return JSON.parse(serializedTodos) as Todo[];
    } catch (error) {
        console.error("Error loading todos from localStorage:", error);
        return [];
    }
};

export const saveTodos = (todos: Todo[]): void => {
    try {
        const serializedTodos = JSON.stringify(todos);
        localStorage.setItem(TODO_STORAGE_KEY, serializedTodos);
    } catch (error) {
        console.error("Error saving todos to localStorage:", error);
    }
};
