import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskStatus, ContainerProps} from "../customTypings";
import {v4} from "uuid";

export type State = {
    todo:ContainerProps[], during:ContainerProps[], done:ContainerProps[], tasks: {text:string, id:string, date:string, taskStatus:TaskStatus, description:string}
}

const text = ''
const id = ''
const taskStatus = "todo"
const date = ''
const description = ''

const initialState:State = {todo:[], during:[], done:[], tasks:{text, id, date, taskStatus, description}}

export const todoSlice = createSlice({
    name: 'containers',
    initialState,
    reducers: {
        addTodo: (state,action:PayloadAction<{title:string}>) => {
            const todo = {
                id: v4(),
                text: action.payload.title,
                date: new Date().toLocaleString(),
                description: ''
            };
            state.todo.push(todo);
        },
        deleteTask: (state,action:PayloadAction<{id:string,taskStatus:TaskStatus}>) => {
           state[action.payload.taskStatus] = state[action.payload.taskStatus].filter((element) => element.id !== action.payload.id)
        },
        pushTasks:(state, action:PayloadAction<{id:string, text:string, date:string, description:string, task:TaskStatus}>) => {
            const task = {
                id: action.payload.id,
                text: action.payload.text,
                date: action.payload.date,
                description: action.payload.description
            }
            state[action.payload.task].push(task)
        },
        downloadTask:(state, action:PayloadAction<{id:string, text:string, date:string, task:TaskStatus, description: string}>) => {
            const task = {
                id: action.payload.id,
                text: action.payload.text,
                date: action.payload.date,
                taskStatus: action.payload.task,
                description: action.payload.description
            }
            state.tasks = task
        },
        textAreaInput:(state, action:PayloadAction<{description:string, taskStatus:TaskStatus, id:string}>) => {
            const input = {
                description: action.payload.description
            }
            const found = state[action.payload.taskStatus].find(element => element.id === action.payload.id)
            let taskDescription = JSON.stringify(found?.description)
            if(found) {
                taskDescription = input.description
                found.description = taskDescription
            }
            // console.log(JSON.stringify(state, undefined, 2))
        }
    },
});
export const {addTodo,deleteTask,pushTasks,downloadTask,textAreaInput} = todoSlice.actions;
export default todoSlice.reducer;
