import * as React from 'react'
import TodoList from "./todoList";
import {useEffect, useState} from "react";


export default function Header () {


    const [todoInput, setTodoInput] = useState('')

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todo") || '[]'))
    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos))
    }, [todos])

    const[durings, setDurings] = useState(JSON.parse(localStorage.getItem("during") || '[]'))
    useEffect(() => {
        localStorage.setItem("during", JSON.stringify(durings))
    }, [durings])

    const[dones, setDones] = useState(JSON.parse(localStorage.getItem("done") || '[]'))
    useEffect(() => {
        localStorage.setItem("done", JSON.stringify(dones))
    }, [dones])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
