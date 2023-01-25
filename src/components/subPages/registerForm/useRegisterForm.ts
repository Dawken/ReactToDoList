import {useMutation} from 'react-query'
import requestTaskApi from '../../config/axiosConfig'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'
import {object, string, TypeOf} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios'


const registerSchema = object({
	login: string()
		.nonempty('Login is required')
		.min(3, 'Login have to be at least 3 characters long')
		.max(16, 'Login cannot be longer than 16 characters'),
	name: string()
		.nonempty('Name is required')
		.min(3, 'Name have to be at least 3 characters long'),
	lastName: string()
		.nonempty('Last name is required')
		.min(3, 'Last name have to be at least 3 characters long'),
	password: string()
		.nonempty('Password is required')
		// Check password includes at least 1 capital letter, 1 special symbol and has at least 8 symbols
		.regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
			'Password need to has at least 1 Capital letter, 1 special symbol, 1 number and be 8 symbols long'
		),
	repeatPassword: string()
		.nonempty('Please confirm your password')
		.regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, 'Passwords don\'t match!'),
	gender: string(),
}).refine((data) => data.password === data.repeatPassword, {
	path: ['repeatPassword'],
	message: 'Passwords do not match',
})

type RegisterInput = TypeOf<typeof registerSchema>

const useRegisterForm = () => {

	const {mutate: register} = useMutation((values:RegisterInput) => {
		const {login, name, lastName, password, gender} = values
		return requestTaskApi.post('/api/register', {
			login:login,
			name:name,
			lastName:lastName,
			password:password,
			gender:gender,
		})},{
		onSuccess: () => {
			toast.success('Register success!')
		},
		onError: (error) => {
			if(axios.isAxiosError(error)) {
				if(error.response?.data.errorCode === 'user-already-exist') {
					toast.error('User already exist!')
				} else {
					toast.error('Register failed')
				}
			}
		}
	})

	const methods = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	})

	return {
		register,
		methods
	}
}

export default useRegisterForm
