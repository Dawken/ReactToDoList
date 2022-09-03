import * as React from 'react'
import {useEffect, useRef, useState} from "react";

export type PropsCreateContainer = {
    text: string,
    id: number,
    deleteTask: (id:number, taskStatus:string) => void
    flipTask:(taskStatus:string,text:string, id:number) => void
    taskStatus: string,
}

export default function CreateContainer ({text,id,deleteTask,flipTask,taskStatus}:PropsCreateContainer) {

    const [options, setOptions] = useState<boolean>(false)
    const containerReference = useRef<HTMLDivElement>(null)

    useEffect(() => {
        containerReference.current && setTimeout(() => containerReference.current?.classList.add("animation"),150)
    }, [containerReference])

    const deleteAnimation = () => {
        setTimeout(() => containerReference.current?.classList.remove("animation"),100)
        setTimeout(() => deleteTask(id, taskStatus), 350)
    }
    const pushTask= (taskStatus:string) => {
        flipTask(taskStatus,text, id)
        deleteAnimation()
    }

    return (
        <div className="taskContainer" ref={containerReference}>
            <div id="todofirst">{text}
                <button className="trash" onClick={() => setOptions(prevState => !prevState)}>
                    <i className="gg-trash"></i>
                </button>
            </div>
            <div className={options ? 'options animation' : 'options'}>
                <button id="delete" onClick={deleteAnimation}>Delete</button>
                {taskStatus !== "todo" ? <button id="todo" onClick={() => pushTask('todos')}>To do</button> : null}
                {taskStatus !== "during" ? <button id="during" onClick={() => pushTask('durings')}>During</button> : null}
                {taskStatus !== "done" ? <button id="done" onClick={() => pushTask('dones')}>Done</button> : null}
            </div>
        </div>
    )
}
