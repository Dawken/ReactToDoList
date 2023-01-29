import React from 'react'
import { useMutation } from 'react-query'
import requestTaskApi from '../../../config/axiosConfig'
import './logoutContainer.scss'
import { toast } from 'react-toastify'
import { store } from '../../../redux/store'
import { getClientResponse } from '../../../redux/user'

const LogoutContainer = () => {
	const { mutate: logout } = useMutation(
		() => {
			return requestTaskApi.post('/api/logout')
		},
		{
			onSuccess: () => {
				toast.success('Logout success!')
				store.dispatch(getClientResponse({ isLogged: false }))
			},
			onError: () => {
				toast.error('Logout failed')
			},
		}
	)

	return (
		<div className='logoutContainer'>
			<div className='logoutIcon'></div>
			<button className='logout' onClick={() => logout()}>
				Logout
			</button>
		</div>
	)
}

export default LogoutContainer
