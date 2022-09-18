import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TaskStatus, ContainerProps} from '../customTypings'
import {v4} from 'uuid'

export type State = {
    container:ContainerProps[],
}

const initialState:State = {container:[]}
export const todoSlice = createSlice({

	name: 'containers',
	initialState,
	reducers: {
		addTodo: (state,action:PayloadAction<{title:string, taskStatus: TaskStatus}>) => {
			const todo = {
				id: v4(),
				text: action.payload.title,
				date: new Date().toLocaleString(),
				description: '',
				taskStatus: action.payload.taskStatus
			}
			state.container.push(todo)
		},
		deleteTask: (state,action:PayloadAction<{id:string}>) => {
			state.container = state.container.filter((element) => element.id !== action.payload.id)
		},
		pushTasks:(state, action:PayloadAction<{id:string,task:string}>) => {
			const properTask = state.container.find((element) => element.id === action.payload.id)
			if(properTask) {
				properTask.taskStatus = action.payload.task
			}
		},
		textAreaInput:(state, action:PayloadAction<{description:string, id:string | undefined}>) => {
			const properTask = state.container.find(element => element.id === action.payload.id)
			if(properTask) {
				properTask.description = action.payload.description
			}
		}
	},
})
export const {addTodo,deleteTask,pushTasks,textAreaInput} = todoSlice.actions
export default todoSlice.reducer
