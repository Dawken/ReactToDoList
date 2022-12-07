import {useMutation, useQueryClient} from 'react-query'
import {ChangeEvent, useState} from 'react'
import requestTaskApi from '../../axiosConfig'
import {toast} from 'react-toastify'


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

	const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate()
		setTask('')
	}
	return {
		task,
		setTask,
		isLoading,
		onSubmit
	}
}
export default useInputContainer
