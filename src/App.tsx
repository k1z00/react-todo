import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Todo } from './models/Todo';
import { loadTodos, saveTodos } from './utils/LocalStorage';
import './style/App.css';
import { Button, Typography, Space } from 'antd';


const { Title } = Typography;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos());
  const [isTodo, setIsTodo] = useState<string>('All')

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const incompleteTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="App">
      <Title style={{ textAlign: 'center' }} level={2}>Todo</Title>
      <TodoInput onAddTodo={addTodo} />
      <Space direction="vertical" style={{ width: '100%' }}>
        {isTodo === 'All' && (
          <>
            <Typography.Title level={4}>All Todos</Typography.Title>
            <TodoList todos={todos} onToggleComplete={toggleComplete} onDeleteTodo={deleteTodo} />
          </>
        )}
        {isTodo === 'Incomplete' && (
          <>
            <Typography.Title level={4}>Incomplete Todos</Typography.Title>
            <TodoList
              todos={todos.filter((todo) => !todo.completed)}
              onToggleComplete={toggleComplete}
              onDeleteTodo={deleteTodo}
            /> </>)}
        {isTodo === 'Completed' && (
          <>
            <Typography.Title level={4}>Completed Todos</Typography.Title>
            <TodoList
              todos={completedTodos}
              onToggleComplete={toggleComplete}
              onDeleteTodo={deleteTodo}
            /></>)}
        <div>
          <Button className='buttot-app' type="primary" onClick={() => setIsTodo('All')} >All</Button>
          <Button className='buttot-app' type="primary" onClick={() => setIsTodo('Incomplete')} disabled={!incompleteTodos} >Incomplete</Button>
          <Button className='buttot-app' type="primary" onClick={() => setIsTodo('Completed')} disabled={!completedTodos.length}>Completed</Button>
          <Button className='buttot-app' type="primary" danger onClick={clearCompleted} disabled={!completedTodos.length}>Clear Completed</Button>
        </div>
      </Space>

    </div>
  );
};

export default App;
