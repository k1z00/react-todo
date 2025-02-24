import TodoInput from '../../components/TodoInput';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react'
import {screen, fireEvent, waitFor } from '@testing-library/react';



describe('TodoInput Component (Vitest)', () => {
   it('check input button', async () => {
        const { getByText} = render(<TodoInput onAddTodo={()=>{}} />)       
        await expect.element(getByText('Add')).toBeInTheDocument()
    });
   it('should update the input value when typing', async () => {
        const onAddTodoMock = vi.fn();
        render(<TodoInput onAddTodo={onAddTodoMock} />);

        const inputElement = screen.getByPlaceholderText('Add new todo') as HTMLInputElement;;
        const newValue = 'Сделать домашнее задание';

        fireEvent.change(inputElement, { target: { value: newValue } });

        await waitFor(() => {
            expect(inputElement.value).toBe(newValue);
        });
    })
   it('should call onAddTodo with the input value when clicking Add button', async () => {
        const onAddTodoMock = vi.fn();
        render(<TodoInput onAddTodo={onAddTodoMock} />);
        const inputElement = screen.getByPlaceholderText('Add new todo') as HTMLInputElement; 
        const newValue = 'Сделать домашнее задание';
        fireEvent.change(inputElement, { target: { value: newValue } });

        const addButton = screen.getByRole('button', { name: 'plus Add' }); 
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(onAddTodoMock).toHaveBeenCalledTimes(1);
            expect(onAddTodoMock).toHaveBeenCalledWith(newValue);
        });})

   it('should clear the input value after clicking Add button', async () => {
        const onAddTodoMock = vi.fn();
        render(<TodoInput onAddTodo={onAddTodoMock} />);
        const inputElement = screen.getByPlaceholderText('Add new todo') as HTMLInputElement;
        const newValue = 'Сделать домашнее задание';
        fireEvent.change(inputElement, { target: { value: newValue } });

        const addButton = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(inputElement.value).toBe('');
        });
    });
   it('should not call onAddTodo when the input is empty and Add button is clicked', async () => {
        const onAddTodoMock = vi.fn();
        render(<TodoInput onAddTodo={onAddTodoMock} />);

        const addButton = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(onAddTodoMock).not.toHaveBeenCalled(); 
        });
    });
});

