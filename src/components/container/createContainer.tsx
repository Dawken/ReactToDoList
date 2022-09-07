import * as React from 'react'
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {pushTasks, deleteTask} from "../redux/todoSlice";
import {TaskStatus} from "../customTypings";

export type PropsCreateContainer = {
    text: string,
    id: string,
    taskStatus: TaskStatus,
}

export default function CreateContainer ({text,id,taskStatus}:PropsCreateContainer) {
    const dispatch = useDispatch();
    const [options, setOptions] = useState<boolean>(false)
    const containerReference = useRef<HTMLDivElement>(null)

    useEffect(() => {
        containerReference.current && setTimeout(() => containerReference.current?.classList.add("animation"),150)
    }, [containerReference])

    const deleteAnimation = () => {
        setTimeout(() => containerReference.current?.classList.remove("animation"),100)
        setTimeout(() => dispatch(deleteTask({ id,taskStatus })), 350)
    }
    const pushTask= (push:TaskStatus) => {
        dispatch(pushTasks({id,text, push}))
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
                {taskStatus !== "todo" && <button id="todo"  onClick={() => pushTask('todo')}>To do</button>}
                {taskStatus !== "during" && <button id="during" onClick={() => pushTask('during')}>During</button>}
                {taskStatus !== "done" && <button id="done" onClick={() => pushTask('done')}>Done</button>}
            </div>
        </div>
    )
}
