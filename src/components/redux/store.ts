import {combineReducers, createStore, Dispatch} from '@reduxjs/toolkit';
import todoReducer, {State} from './todoSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const rootReducer = combineReducers({todos:todoReducer})

function saveToLocalStorage(state:{todos: State}) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}
export const store = createStore(rootReducer, loadFromLocalStorage())
store.subscribe(() => saveToLocalStorage(store.getState()));
