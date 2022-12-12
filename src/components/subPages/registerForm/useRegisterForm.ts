import React, {useState} from 'react'
import {useMutation} from 'react-query'
import requestTaskApi from '../../axiosConfig'
import {toast} from 'react-toastify'

type types = {
	login: string,
	name: string,
	lastName: string,
	password: string,
	repeatPassword: string,
	gender: string,
	birthDate:string,
	userAdult: boolean
}

const useRegisterForm = () => {
	const [formData, setFormData] = useState<types>({
		login: '',
		name: '',
		lastName: '',
		password: '',
		repeatPassword: '',
		gender: '',
		birthDate: '',
		userAdult: false
	})
	const formValid = {
		login: formData.login.length > 2 && formData.login.length < 17,
		name: formData.name.length > 2,
		lastName: formData.lastName.length > 2,
		password: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(formData.password)
		, //Check if password has at least 1 Capital letter, 1 special symbol, 1 number and is 8 symbols long
		repeatPassword: formData.password === formData.repeatPassword &&
			/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(formData.password),
		gender: 'Male' || 'Female' || 'Other',
		userAdult: formData.userAdult,
		birthDate: formData.birthDate !== ''
	}
	const [isLabelEmpty, setIsLabelEmpty] = useState(  {
		login: true,
		name: true,
		lastName: true,
		password: true,
		repeatPassword: true,
		gender: 'Male' || 'Female' || 'Other',
		birthDate: true
	})
	const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target
		const birth = formData.birthDate
		const date18YearsAgo = new Date()
		date18YearsAgo.setFullYear(date18YearsAgo.getFullYear()-18)
		const isUserAdult = new Date(birth) <= date18YearsAgo
		setFormData(prevState => ({
			...prevState,
			[name]:value,
			userAdult: isUserAdult
		}))
	}
	const {mutate} = useMutation(() => {
		const {login, name, lastName, password, gender, birthDate} = formData
		return requestTaskApi.post('/api/register', {
			login:login,
			name:name,
			lastName:lastName,
			password:password,
			gender:gender,
			birthDate: birthDate
		})},{
		onSuccess: () => {
			toast.success('Register success!')
		},
		onError: () => {
			toast.error('Register failed')
		}
	})
	const submitForm = () => {
		if(Object.values(formValid).every(value => value)){
			mutate()
			console.log('Register success!')
		} else {
			console.log('Register failed')
			setIsLabelEmpty(formValid)
		}

	}
	return {
		formData,
		handleChange,
		submitForm,
		formValid,
		isLabelEmpty
	}
}
export default useRegisterForm
