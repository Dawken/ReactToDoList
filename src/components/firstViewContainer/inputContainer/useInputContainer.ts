import {useMutation, useQueryClient} from 'react-query'
import {ChangeEvent, useState} from 'react'
import {toast} from 'react-toastify'
import requestTaskApi from '../../config/axiosConfig'
import {store} from '../../../redux/store'
import {getClientResponse} from '../../../redux/clientResponse'


const useInputContainer = () => {

	const queryClient = useQueryClient()

	const [task, setTask] = useState('')

	const {isLoading, mutate} = useMutation(() => {
		return requestTaskApi.post('/api/tasks', {text: task})
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
			toast.success('Task was added correctly!')
		},
		onError: () => {
			toast.error('Error! Can\'t add task!')
		}
	})
	const {mutate: logout} = useMutation(() => {
		return requestTaskApi.post('/api/logout')},{
		onSuccess: () => {
			toast.success('Logout success!')
			store.dispatch(getClientResponse({isLogged:false}))
		},
		onError: () => {
			toast.error('Logout failed')
		}

	})

	const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate()
		setTask('')
	}

	const inputChange = (event:ChangeEvent<HTMLInputElement>) => {
		setTask(event.target.value)
	}

	return {
		task,
		isLoading,
		inputChange,
		onSubmit,
		logout
	}
}

export default useInputContainer
