import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type StatusCode = {
	clientResponse: number,
}

const initialState:StatusCode = {clientResponse: 0}

export const clientResponse = createSlice({
	name: 'clientResponse',
	initialState,
	reducers: {
		getClientResponse: (state, action:PayloadAction<{number: number}>) => {
			state.clientResponse = action.payload.number
		}
	}
})

export const {getClientResponse} = clientResponse.actions
