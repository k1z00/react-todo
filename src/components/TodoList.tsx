
import React from 'react';
import { Todo } from '../models/Todo';
import TodoItem from './TodoItems';
import { List } from 'antd';

interface TodoListProps {
    todos: Todo[];
    onToggleComplete: (id: string) => void;
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDeleteTodo }) => {
    return (
        <List
            dataSource={todos}
            renderItem={(todo) => (
                <List.Item>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggleComplete={onToggleComplete}
                        onDeleteTodo={onDeleteTodo}
                    />
                </List.Item>
            )}
        />
    );
};

export default TodoList;
