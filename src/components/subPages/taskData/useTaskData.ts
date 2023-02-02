import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import requestTaskApi from '../../../config/axiosConfig'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { SelectChangeEvent } from '@mui/material'
import axios from 'axios'

const useTaskData = () => {
	const { id } = useParams()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const [taskData, setTaskData] = useState({
		description: '',
		taskStatus: '',
		text: '',
		date: '',
	})

	const { isLoading, data } = useQuery(
		['task', `${id}`],
		() => requestTaskApi.get(`/api/tasks/${id}`),
		{
			onSuccess: (data) => {
				setTaskData(data.data)
			},
		}
	)

	const { isLoading: patchDescription, mutate: patchData } = useMutation(
		() => {
			if (taskData.text === '') {
				toast.error('Text cannot be empty')
			}
			return requestTaskApi.patch(`/api/tasks/${id}`, {
				description: taskData?.description,
				text: taskData.text,
				taskStatus: taskData.taskStatus,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('task')
				toast.success('Task data has been updated!')
			},
			onError: (error) => {
				if (axios.isAxiosError(error)) {
					if (error.response?.data.errorCode === 'nothing-changed') {
						toast.error('Nothing changed!')
					}
				} else {
					toast.error('Error! Can\'t update taskData!')
				}
			},
		}
	)
	const { mutate: deleteTask } = useMutation(
		() => {
			return requestTaskApi.delete(`/api/tasks/${id}`)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('tasks')
				navigate('/')
				toast.success('Task was deleted correctly!')
			},
			onError: () => {
				toast.error('Error! Can\'t delete task!')
			},
		}
	)

	const taskStatusChange = (event: SelectChangeEvent) => {
		setTaskData((prevState) => ({
			...prevState,
			taskStatus: event.target.value,
		}))
	}

	const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		patchData()
	}

	return {
		isLoading,
		data,
		taskData,
		setTaskData,
		patchDescription,
		deleteTask,
		taskStatusChange,
		onSubmit,
	}
}

export default useTaskData
