import TodoForm from './component/TodoForm';
import Todo from './component/Todo';
import { useState } from 'react';
import './todos.css';

export type TodoProps = {
  id: number;
  text: string;
  isComplete: boolean;
}

function Todos() {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const addTodo = (todo: TodoProps) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos: TodoProps[] = [todo, ...todos];

    setTodos(newTodos);
  };


  const removeTodo = (id: number) => {
    const removeArr : TodoProps[] = todos.filter(todo => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id: number) => {
    const completedTodo : TodoProps[] = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }

      return todo;
    })

    setTodos(completedTodo);
  }

  return (
    <div>
      <div className="todo-app">
        <h1>To Do List</h1>
        <h2>오늘은 무슨 일을 계획하나요?</h2>
        <TodoForm onSubmit={addTodo} />
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      </div>
    </div>
  );
}

export default Todos;
