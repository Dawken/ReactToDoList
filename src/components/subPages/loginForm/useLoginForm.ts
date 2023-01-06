import React, {useState} from 'react'
import {useMutation} from 'react-query'
import requestTaskApi from '../../config/axiosConfig'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {store} from '../../../redux/store'
import {getClientResponse} from '../../../redux/clientResponse'


const useLoginForm = () => {

	const navigate = useNavigate()

	const [loginForm, setLoginForm] = useState({
		login: '',
		password: ''
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target
		setLoginForm(prevState => ({
			...prevState,
			[name]: value
		}))
	}
	const {mutate: login} = useMutation(() => {
		const {login, password} = loginForm
		return requestTaskApi.post('/api/login', {
			login:login,
			password:password
		})},{
		onSuccess: () => {
			toast.success('Login success!')
			store.dispatch(getClientResponse({isLogged:true}))
			navigate('/')
		},
		onError: () => {
			store.dispatch(getClientResponse({isLogged:false}))
			toast.error('Login failed')
		}
	})
	return {
		handleChange,
		loginForm,
		login
	}
}
export default useLoginForm
