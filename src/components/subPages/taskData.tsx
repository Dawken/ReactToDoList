import React, {ChangeEvent, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../redux/store";
import {textAreaInput} from "../redux/todoSlice";

const TaskData = () => {
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
        <section>
            <div className='taskDataContainer'>
                <div className='taskName'>{`Task name: ${todos.tasks.text}`}</div>
                <div className='taskDate'>{`Task date: ${todos.tasks.date}`}</div>
                <div className='taskStatus'>{`Task Status: ${todos.tasks.taskStatus}`}</div>
                <form onSubmit={onSubmit}>
                    <textarea onChange={(event) => setValue(event.target.value)} value={value} placeholder='Description'/>
                    <button>Save</button>
                </form>
            </div>
        </section>
    )
}

export default TaskData
