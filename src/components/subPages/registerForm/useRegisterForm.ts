import {useMutation} from 'react-query'
import requestTaskApi from '../../axiosConfig'
import {toast} from 'react-toastify'
import {SubmitHandler, useForm} from 'react-hook-form'
import {object, string, TypeOf} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const registerSchema = object({
	login: string()
		.nonempty('Name is required')
		.min(3)
		.max(16, 'Name must be less than 100 characters'),
	name: string()
		.nonempty('Name is required')
		.min(3),
	lastName: string()
		.nonempty('Name is required')
		.min(3),
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

	const {mutate} = useMutation((values:RegisterInput) => {
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
		onError: () => {
			toast.error('Register failed')
		}
	})

	const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
		mutate(values)
	}
	const methods = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	})
	return {
		onSubmitHandler,
		methods
	}
}
export default useRegisterForm
