import React, {useState} from 'react'
import {useMutation} from 'react-query'
import requestTaskApi from '../../axiosConfig'

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

const useForm = () => {
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
		password: formData.password === formData.repeatPassword,
		gender: 'Male' || 'Female' || 'Other',
		userAdult: formData.userAdult
	}
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
			birthDate:birthDate
		})
	})

	const submitForm = () => {
		console.log(formValid)
		if(Object.values(formValid).every(value => value)){
			mutate()
			console.log('Register success!')
		} else {
			console.log('Register failed')
		}

	}
	return {
		formData,
		handleChange,
		submitForm,
		formValid
	}
}
export default useForm
