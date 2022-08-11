import * as React from 'react'
import {useEffect, useRef, useState} from "react";


interface type_alias {
    text: string,
    id:number
}

type Props = {
    text: string,
    id: number,
    tasks: type_alias[],
    task: type_alias,
    deleteTask:  React.Dispatch<type_alias[]>,
    todos: type_alias[],
    setTodos:  React.Dispatch<type_alias[]>,
    durings: type_alias[],
    setDurings:  React.Dispatch<type_alias[]>,
    dones: type_alias[],
    setDones:  React.Dispatch<type_alias[]>,
    taskStatus: string
}

export default function CreateContainer ({text,id,tasks,task,deleteTask,todos,setTodos,durings,setDurings,dones,setDones,taskStatus}:Props) {

    const [options, setOptions] = useState<boolean>(false)
    const containerReference = useRef<HTMLDivElement>(null)

    useEffect(() => {
        containerReference.current && setTimeout(() => containerReference.current?.classList.add("animation"),150)
    }, [containerReference])

   const deleteAnimation = () => {
       setTimeout(() => containerReference.current?.classList.remove("animation"),100)
       setTimeout(() => deleteTask(tasks.filter((el) => el.id !== task.id)), 350)
   }
    const pushTodo = () => {
      setTodos([
          ...todos,
          {text: text, id: id}
      ])
        deleteAnimation()
    }
    const pushDuring = () => {
        setDurings([
            ...durings,
            {text: text, id: id}
        ])
        deleteAnimation()
    }
    const pushDone = () => {
        setDones([
            ...dones,
            {text: text, id:id}
        ])
        deleteAnimation()
    }
    return (
        <div className="taskContainer" ref={containerReference}>
          <div id="todofirst">{text}
            <button className="trash" onClick={ () => setOptions(prevState => !prevState)}>
                <i className="gg-trash"></i>
            </button>
          </div>
          <div className={options ? 'options animation' : 'options'}>
            <button id="delete" onClick={deleteAnimation}>Delete</button>
            {taskStatus !== "todo" ? <button id="todo" onClick={pushTodo}>To do</button> : null}
            {taskStatus !== "during" ? <button id="during" onClick={pushDuring}>During</button> : null}
            {taskStatus !== "done" ? <button id="done" onClick={pushDone}>Done</button> : null}
          </div>
        </div>
  )
}
