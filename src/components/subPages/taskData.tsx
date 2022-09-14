import React, {ChangeEvent, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../redux/store";
import {textAreaInput} from "../redux/todoSlice";
import {Link, useParams} from "react-router-dom";

const TaskData = () => {

    const {id} = useParams();
    const todos = useAppSelector((state) => state.todos);

    const [value, setValue] = useState(todos.tasks.description);
    const dispatch = useAppDispatch();

    const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value) {
            dispatch(
                textAreaInput({
                    description: value,
                    taskStatus: todos.tasks.taskStatus,
                    id: todos.tasks.id
                }),
            );
        }
    };

    return (
        <section className='taskData'>
            <div className='taskDataContainer'>
                <Link to={'/'}>
                    <i className="gg-arrow-left">
                    </i>
                </Link>
                <div className='taskName'>{`Task name: ${todos.tasks.text}`}</div>
                <div className='taskDate'>{`Task date: ${todos.tasks.date}`}</div>
                <div className='taskStatus'>{`Task Status: ${todos.tasks.taskStatus}`}</div>
                <form onSubmit={onSubmit}>
                    <textarea className='description' onChange={(event) => setValue(event.target.value)} value={value} placeholder='Description'/>
                    <button className='save'>Save</button>
                </form>
            </div>
        </section>
    )
}

export default TaskData
