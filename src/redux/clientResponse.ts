import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type StatusCode = {
	isLoggedIn: boolean,
}

const initialState:StatusCode = {isLoggedIn: true}

export const clientResponse = createSlice({
	name: 'clientResponse',
	initialState,
	reducers: {
		getClientResponse: (state, action:PayloadAction<{isLogged: boolean}>) => {
			state.isLoggedIn = action.payload.isLogged
		}
	}
})

export const {getClientResponse} = clientResponse.actions
