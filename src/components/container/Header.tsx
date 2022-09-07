import * as React from 'react'
import TodoList from "./todoList";
import {useState} from "react";
import {addTodo} from '../redux/todoSlice';
import {useAppDispatch} from "../redux/store";

export default function Header () {

    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (value) {
            dispatch(
                addTodo({
                    title: value,
                }),
            );
            setValue('')
        }
    };

    return (
        <main>
            <form onSubmit={onSubmit}>
            <div className="input" >
                <input type="text" id="task-input" onChange={(event) => setValue(event.target.value)} placeholder="What are we doin today?" value={value}/>
                <button id="submit" >Add task</button>
            </div>
        </form>
            <TodoList/>
        </main>
    )
}
