
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../../components/TodoItems'; 
import { within } from '@testing-library/dom';
import { Todo } from '../../models/Todo'; 


describe('TodoItem Component', () => {
    const mockTodo: Todo = {
        id: '1',
        text: 'Сделать домашнее задание',
        completed: false,
    };

    it('should render the todo text', () => {
        const { container } = render(<TodoItem todo={mockTodo} onToggleComplete={() => { }} onDeleteTodo={() => { }} />);
        const todoText = within(container).getByText('Сделать домашнее задание');
        expect(todoText).toBeInTheDocument();
    });

    it('should render the checkbox with the correct checked state', () => {
        const { container } = render(<TodoItem todo={mockTodo} onToggleComplete={() => { }} onDeleteTodo={() => { }} />);
        const checkbox = within(container).getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(mockTodo.completed);


        const completedTodo: Todo = { ...mockTodo, completed: true };
        const { container: completedContainer } = render(<TodoItem todo={completedTodo} onToggleComplete={() => { }} onDeleteTodo={() => { }} />);
        const completedCheckbox = within(completedContainer).getByRole('checkbox') as HTMLInputElement;
        expect(completedCheckbox.checked).toBe(completedTodo.completed);
    });

    it('should call onToggleComplete when the checkbox is clicked', () => {
        const onToggleCompleteMock = vi.fn();
        const { container } = render(<TodoItem todo={mockTodo} onToggleComplete={onToggleCompleteMock} onDeleteTodo={() => { }} />);
        const checkbox = within(container).getByRole('checkbox') as HTMLInputElement;
        fireEvent.click(checkbox);
        expect(onToggleCompleteMock).toHaveBeenCalledTimes(1);
        expect(onToggleCompleteMock).toHaveBeenCalledWith(mockTodo.id);
    });

    it('should call onDeleteTodo when the delete button is clicked', () => {
        const onDeleteTodoMock = vi.fn();
        const { container } = render(<TodoItem todo={mockTodo} onToggleComplete={() => { }} onDeleteTodo={onDeleteTodoMock} />);
        const deleteButton = within(container).getByTestId('delete-button');
        fireEvent.click(deleteButton);
        expect(onDeleteTodoMock).toHaveBeenCalledTimes(1);
        expect(onDeleteTodoMock).toHaveBeenCalledWith(mockTodo.id);
    });

    it('should apply "danger" style to the delete button', () => {
        const { container } = render(<TodoItem todo={mockTodo} onToggleComplete={() => { }} onDeleteTodo={() => { }} />);
        const deleteButton = within(container).getByTestId('delete-button');
        expect(deleteButton).toHaveClass('ant-btn-dangerous');
    });
});