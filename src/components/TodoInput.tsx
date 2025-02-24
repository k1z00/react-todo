import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface TodoInputProps {
    onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim() !== '') {
            onAddTodo(text);
            setText('');
        }
    };

    return (
        <Space.Compact style={{width:'100%'}}>
            <Input
                style={{ width: 'calc(100% - 80px)' }}
                placeholder="Add new todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onPressEnter={handleSubmit}
            />
            <Button type="primary" onClick={handleSubmit} icon={<PlusOutlined />}>
                Add
            </Button>
        </Space.Compact>
    );
};

export default TodoInput;
