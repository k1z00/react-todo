import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';


describe('App Component - Logic Tests', () => {

    beforeEach(() => {
     
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(() => null),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        });
    });

    it('should filter todos to show only incomplete todos', () => {
        render(<App />);
        const inputElements = screen.getAllByPlaceholderText(/add new todo/i);
        const inputElement = inputElements[0]; 
        const addButtons = screen.getAllByRole('button', { name: /add/i });
        const addButton = addButtons[0]; 

 
        fireEvent.change(inputElement, { target: { value: 'Completed Todo' } });
        fireEvent.click(addButton);
        const completedTodoElements = screen.getAllByText(/Completed Todo/i);
        const completedTodoElement = completedTodoElements[0];
        const completedCheckbox = completedTodoElement.closest('label')?.querySelector('input[type="checkbox"]');
        if (completedCheckbox) {
            fireEvent.click(completedCheckbox);
        }
        fireEvent.change(inputElement, { target: { value: 'Incomplete Todo' } });
        fireEvent.click(addButton);



        const incompleteButtons = screen.getAllByRole('button', { name: /incomplete/i });
        const incompleteButton = incompleteButtons[0];
        fireEvent.click(incompleteButton);


        expect(screen.queryByText(/Completed Todo/i)).not.toBeInTheDocument();
        const incompleteTodoElements = screen.getAllByText(/Incomplete Todo/i);
        expect(incompleteTodoElements[0]).toBeInTheDocument();
    });
    it('should filter todos to show all todos', () => {
        render(<App />);
        const inputElements = screen.getAllByPlaceholderText(/add new todo/i);
        const inputElement = inputElements[0];
        const addButtons = screen.getAllByRole('button', { name: /add/i });
        const addButton = addButtons[0];

       
        fireEvent.change(inputElement, { target: { value: 'Completed Todo' } });
        fireEvent.click(addButton);

        const completedTodoElements = screen.getAllByText(/Completed Todo/i);
        const completedTodoElement = completedTodoElements[0];
        const completedCheckbox = completedTodoElement.closest('label')?.querySelector('input[type="checkbox"]');
        if (completedCheckbox) {
            fireEvent.click(completedCheckbox);
        }

        fireEvent.change(inputElement, { target: { value: 'Incomplete Todo' } });
        fireEvent.click(addButton);

       
        const allButton = screen.getAllByRole('button', { name: /all/i })[0];
        fireEvent.click(allButton);

        expect(screen.getAllByText(/Completed Todo/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Incomplete Todo/i)[0]).toBeInTheDocument(); 
    });

    it('should filter todos to show only completed todos', () => {
        render(<App />);
        const inputElements = screen.getAllByPlaceholderText(/add new todo/i);
        const inputElement = inputElements[0];
        const addButtons = screen.getAllByRole('button', { name: /add/i });
        const addButton = addButtons[0];

        fireEvent.change(inputElement, { target: { value: 'Completed Todo' } });
        fireEvent.click(addButton);

        const completedTodoElements = screen.getAllByText(/Completed Todo/i);
        const completedTodoElement = completedTodoElements[0];
        const completedCheckbox = completedTodoElement.closest('label')?.querySelector('input[type="checkbox"]');
        if (completedCheckbox) {
            fireEvent.click(completedCheckbox);
        }

        fireEvent.change(inputElement, { target: { value: 'Incomplete Todo' } });
        fireEvent.click(addButton);

        const completedButton = screen.getAllByRole('button', { name: /completed/i })[0];
        fireEvent.click(completedButton);


        expect(screen.getAllByText(/Completed Todo/i)[0]).toBeInTheDocument();
        expect(screen.queryByText(/Incomplete Todo/i)).not.toBeInTheDocument();
    });

    
});