import React, { useState } from 'react'
import { useMutation } from 'react-query'
import requestTaskApi from '../../../config/axiosConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { store } from '../../../redux/store'
import { getClientResponse } from '../../../redux/user'
import axios from 'axios'

const useLoginForm = () => {
	const navigate = useNavigate()

	const [loginForm, setLoginForm] = useState({
		login: '',
		password: '',
	})

	const [userExist, setUserExist] = useState({
		login: true,
		password: true,
	})

	const [showPassword, setShowPassword] = React.useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setLoginForm((prevState) => ({
			...prevState,
			[name]: value,
		}))
		setUserExist((prevState) => ({
			...prevState,
			[name]: true,
		}))
	}

	const { isLoading, mutate: login } = useMutation(
		() => {
			const { login, password } = loginForm
			return requestTaskApi.post('/api/login', {
				login: login,
				password: password,
			})
		},
		{
			onSuccess: () => {
				toast.success('Login success!')
				store.dispatch(getClientResponse({ isLogged: true }))
				navigate('/')
			},
			onError: (error) => {
				store.dispatch(getClientResponse({ isLogged: false }))
				if (axios.isAxiosError(error)) {
					if (error.response?.data.errorCode === 'user-does-not-exist') {
						setUserExist({
							...userExist,
							login: false,
						})
					} else if (error.response?.data.errorCode === 'incorrect-password') {
						setUserExist({
							...userExist,
							password: false,
						})
					}
				} else {
					toast.error('Login failed')
				}
			},
		}
	)

	return {
		showPassword,
		handleClickShowPassword,
		handleMouseDownPassword,
		handleChange,
		loginForm,
		isLoading,
		login,
		userExist,
	}
}

export default useLoginForm
