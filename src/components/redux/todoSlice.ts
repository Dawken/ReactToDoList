import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskStatus, type_alias} from "../customTypings";
import {v4} from "uuid";


export type State = {
    todo:type_alias[], during:type_alias[], done:type_alias[],
}

const initialState:State = {todo:[], during:[], done:[]}

export const todoSlice = createSlice({
    name: 'containers',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: v4(),
                text: action.payload.title,
            };
            state.todo.push(todo);
        },

        deleteTask: (state,action:PayloadAction<{id:string,taskStatus:TaskStatus}>) => {
           state[action.payload.taskStatus] = state[action.payload.taskStatus].filter((el) => el.id !== action.payload.id)
        },

        pushTasks:(state, action:PayloadAction<{id:string,text:string,push:TaskStatus}>) => {
            const task = {
                id: action.payload.id,
                text: action.payload.text
            }
            state[action.payload.push].push(task)
        },
    },
});
export const { addTodo,deleteTask,pushTasks} = todoSlice.actions;
export default todoSlice.reducer;
