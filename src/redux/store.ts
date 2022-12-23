import {combineReducers, createStore} from '@reduxjs/toolkit'
import {clientResponse} from './clientResponse'
import {TypedUseSelectorHook, useSelector} from 'react-redux'


type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const rootReducer = combineReducers({auth:clientResponse.reducer})

export const store = createStore(rootReducer)
