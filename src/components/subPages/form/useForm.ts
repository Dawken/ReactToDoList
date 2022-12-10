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
	ageNumber: number,
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
		ageNumber: 0,
	})
	const age = Math.floor((new Date().valueOf() - new Date(formData.birthDate).getTime()) / 3.15576e+10)
	const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target
		setFormData(prevState => ({
			...prevState,
			[name]:value,
			ageNumber: age
		}))
		console.log(formData.ageNumber)
	}

	const {mutate} = useMutation(() => {
		const {login, name, lastName, password, gender, birthDate} = formData
		return requestTaskApi.post('/api/register', {text: {
			login:login,
			name:name,
			lastName:lastName,
			password:password,
			gender:gender,
			birthDate:birthDate
		}})
	})

	const submitForm = () => {
		mutate()
	}

	console.log(formData)
	return {
		formData,
		handleChange,
		submitForm
	}
}
export default useForm
