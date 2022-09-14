import React from 'react'
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {pushTasks, deleteTask, downloadTask} from "../redux/todoSlice";
import {TaskStatus} from "../customTypings";
import {Link} from "react-router-dom";

type PropsTaskContainer = {
    text: string,
    id: string,
    taskStatus: TaskStatus,
    date: string,
    description: string
}

export default function TaskContainer({text,id,taskStatus,date,description}:PropsTaskContainer) {
    const dispatch = useDispatch();
    const [isOptionsVisible , SetIsOptionsVisible ] = useState(false)
    const containerReference = useRef<HTMLDivElement>(null)

    useEffect(() => {
        containerReference.current && setTimeout(() => containerReference.current?.classList.add("animation"),150)
    }, [containerReference])

    const deleteAnimation = () => {
        setTimeout(() => containerReference.current?.classList.remove("animation"),100)
        setTimeout(() => dispatch(deleteTask({ id,taskStatus })), 350)
    }
    const pushTask= (task:TaskStatus) => {
        dispatch(pushTasks({id,text,task,description,date}))
        deleteAnimation()
    }
    const downloadTasks = (task:TaskStatus) => {
        dispatch(downloadTask({id,text,task,date,description}))
    }
    return (
        <div className="taskContainer" ref={containerReference}>
            <div id="todofirst">
                <Link to={id}>
                    <button className='eye' onClick={() => downloadTasks(taskStatus)}>
                        <i className="gg-eye-alt"></i>
                    </button>
                </Link>
                {text}
                <button className="trash" onClick={() => SetIsOptionsVisible(prevState => !prevState)}>
                    <i className="gg-trash"></i>
                </button>
            </div>
            <div className={isOptionsVisible ? 'options animation' : 'options'}>
                <button id="delete" onClick={deleteAnimation}>Delete</button>
                {taskStatus !== "todo" && <button id="todo"  onClick={() => pushTask('todo')}>To do</button>}
                {taskStatus !== "during" && <button id="during" onClick={() => pushTask('during')}>During</button>}
                {taskStatus !== "done" && <button id="done" onClick={() => pushTask('done')}>Done</button>}
            </div>
        </div>
    )
}
