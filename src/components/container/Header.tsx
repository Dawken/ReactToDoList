import * as React from 'react'
import TodoList from "./todoList";
import {useState} from "react";
import {useCustom} from "../hooks/customHooks";

export default function Header () {

    const [todoInput, setTodoInput] = useState('')
    const [todos, setTodos] = useCustom("todo" )
    const [durings, setDurings] =useCustom("during")
    const [dones, setDones] =useCustom("done" )

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
