import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskStatus, ContainerProps} from "../customTypings";
import {v4} from "uuid";


export type State = {
    todo:ContainerProps[], during:ContainerProps[], done:ContainerProps[],
}

const initialState:State = {todo:[], during:[], done:[]}

export const todoSlice = createSlice({
    name: 'containers',
    initialState,
    reducers: {
        addTodo: (state,action:PayloadAction<{title:string}>) => {
            const todo = {
                id: v4(),
                text: action.payload.title,
            };
            state.todo.push(todo);
        },

        deleteTask: (state,action:PayloadAction<{id:string,taskStatus:TaskStatus}>) => {
           state[action.payload.taskStatus] = state[action.payload.taskStatus].filter((element) => element.id !== action.payload.id)
        },

        pushTasks:(state, action:PayloadAction<{id:string,text:string,task:TaskStatus}>) => {
            const task = {
                id: action.payload.id,
                text: action.payload.text
            }
            state[action.payload.task].push(task)
        },
    },
});
export const {addTodo,deleteTask,pushTasks} = todoSlice.actions;
export default todoSlice.reducer;
