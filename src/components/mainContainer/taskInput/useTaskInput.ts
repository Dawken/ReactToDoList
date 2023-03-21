import { useMutation, useQueryClient } from 'react-query'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import requestTaskApi from '../../../config/axiosConfig'

const useTaskInput = () => {
	const queryClient = useQueryClient()
	const [task, setTask] = useState('')
	const [taskLoader, setTaskLoader] = useState(false)

	const { isLoading, mutate } = useMutation(
		() => {
			return requestTaskApi.post('/api/tasks', { text: task })
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('tasks')
				toast.success('Task was added correctly!')
			},
			onError: () => {
				toast.error('Error! Can\'t add task!')
			},
		}
	)

	const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		setTaskLoader((prevState) => !prevState)
		setTimeout(() => {
			setTaskLoader((prevState) => !prevState)
		}, 2000)
		event.preventDefault()
		mutate()
		setTask('')
	}

	const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTask(event.target.value)
	}

	return {
		task,
		isLoading,
		taskLoader,
		inputChange,
		onSubmit,
	}
}

export default useTaskInput
