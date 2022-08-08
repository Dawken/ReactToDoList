import * as React from 'react'
import TodoList from "./todoList.tsx";

export default function Header () {
    const [todoInput, setTodoInput] = React.useState<string>('')

    const [todos, setTodos] = React.useState<Array<object>>([])
    const[durings, setDurings] = React.useState<Array<object>>([])
    const[dones, setDones] = React.useState<Array<object>>([])

  const handleChange = (event) => {
    setTodoInput(event.target.value)
  }
  const submitTodo = () => {
    setTodos([
        ...todos,
        {text: todoInput, id: Math.random() * 1000}
    ])
      setTodoInput('')
  }

  return (
      <div>
        <div className="input">
            <input type="text" id="task-input" onChange={handleChange} placeholder="What are we doin today?" value={todoInput}/>
            <button id="submit" onClick={submitTodo}>Add task</button>
        </div>
      <TodoList todos={todos} setTodos={setTodos} durings={durings} setDurings={setDurings} dones={dones} setDones={setDones}/>
</div>
  )
}
