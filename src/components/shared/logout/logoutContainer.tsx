import React from 'react'
import { useMutation } from 'react-query'
import requestTaskApi from '../../../config/axiosConfig'
import styles from './logoutContainer.module.scss'
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
		<nav className={styles.logoutContainer}>
			<button className={styles.logout} onClick={() => logout()}>
				<div className={styles.logoutIcon}></div>
				<div className={styles.logoutText}>Logout</div>
			</button>
		</nav>
	)
}

export default LogoutContainer
