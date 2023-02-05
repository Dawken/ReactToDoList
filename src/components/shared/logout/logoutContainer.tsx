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
				toast.success('Your session expired')
				store.dispatch(getClientResponse({ isLogged: false }))
			},
			onError: () => {
				toast.error('Logout failed')
			},
		}
	)

	return (
		<nav className='logoutContainer'>
			<button className='logout' onClick={() => logout()}>
				<div className='logoutIcon'></div>
				<div className='logoutText'>Logout</div>
			</button>
		</nav>
	)
}

export default LogoutContainer
