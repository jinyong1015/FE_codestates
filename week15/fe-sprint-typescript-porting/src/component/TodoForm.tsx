import { useState, useEffect, useRef, FC, FormEvent} from 'react';

interface TodoProps {
  id: number;
  text: string;
}

interface TodoFormProps {
  onSubmit: (todo: TodoProps) => void;
}

const TodoForm: FC<TodoFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');
  const [number, setNumber] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    setNumber((prevNumber) => prevNumber + 1);

    onSubmit({
      id: number,
      text: input,
    });

    setInput('');
  }

  return (
    <form id="todoForm" className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="todo-button">Add todo</button>
    </form>
  )
}

export default TodoForm
