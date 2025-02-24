import React from 'react';
import { Todo } from '../models/Todo';
import { Checkbox, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface TodoItemProps {
    todo: Todo;
    onToggleComplete: (id: string) => void;
    onDeleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDeleteTodo }) => {
    return (
        <li>
            <Checkbox checked={todo.completed} onChange={() => onToggleComplete(todo.id)}>
                {todo.text}
            </Checkbox>
            <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => onDeleteTodo(todo.id)}
                danger
                data-testid="delete-button"
            />
        </li>
    );
};

export default TodoItem;
