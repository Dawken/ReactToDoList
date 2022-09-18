import {combineReducers, createStore, Dispatch} from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const rootReducer = combineReducers({todos:todoReducer})

function saveToLocalStorage() {
	try {
		const serialisedState = JSON.stringify(store.getState())
		localStorage.setItem('tasksState', serialisedState)
	} catch (elements) {
		console.warn(elements)
	}

}

function loadFromLocalStorage() {
	try {
		const serialisedState = localStorage.getItem('tasksState')
		if (serialisedState === null) return undefined
		return JSON.parse(serialisedState)
	} catch (elements) {
		console.warn(elements)
		return undefined
	}
}
export const store = createStore(rootReducer, loadFromLocalStorage())
store.subscribe(() => saveToLocalStorage())
