import { combineReducers, createStore } from '@reduxjs/toolkit'
import { user } from './user'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const rootReducer = combineReducers({ auth: user.reducer })

export const store = createStore(rootReducer)
