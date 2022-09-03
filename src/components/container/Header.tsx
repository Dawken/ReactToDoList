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
    const deleteTask = (id:number, taskStatus:string) => {
        if(taskStatus === 'todo') {
            setTodos(todos.filter((el) => el.id !== id))
        }
        if(taskStatus === 'during') {
            setDurings(durings.filter((el) => el.id !== id))
        }
        if(taskStatus === 'done') {
            setDones(dones.filter((el) => el.id !== id))
        }
    }
    const flipTask = (taskStatus:string,text:string, id:number) => {
        if(taskStatus === 'durings') {
            setDurings([
                ...durings,
                {text: text, id: id}
            ])
        }
        if(taskStatus === 'todos') {
            setTodos([
                ...todos,
                {text: text, id: id}
            ])
        }
        if(taskStatus === 'dones') {
            setDones([
                ...dones,
                {text: text, id: id}
            ])
        }

    }

    return (

        <main>
            <div className="input">
                <input type="text" id="task-input" onChange={handleChange} placeholder="What are we doin today?" value={todoInput}/>
                <button id="submit" onClick={submitTodo}>Add task</button>
            </div>
            <TodoList todos={todos} durings={durings} dones={dones} deleteTask={deleteTask} flipTask={flipTask}/>
        </main>
    )
}
