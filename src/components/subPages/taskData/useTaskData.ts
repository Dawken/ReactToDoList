import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import requestTaskApi from '../../../config/axiosConfig'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SelectChangeEvent } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'

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
	const [isLoadingIcon, setIsLoadingIcon] = useState(false)
	const [isLoadingComponent, setIsLoadingComponent] = useState(true)

	const { isLoading: isTaskLoading, data } = useQuery(
		['task', `${id}`],
		() => requestTaskApi.get(`/api/tasks/${id}`),
		{
			onSuccess: (data) => {
				const date = dayjs(data.data.date).format('DD/MM/YYYY HH:mm:ss')
				setTaskData({
					...data.data,
					date: date,
				})
			},
		}
	)
	useEffect(() => {
		setTimeout(() => {
			setIsLoadingComponent(false)
		}, 1300)
	}, [])

	const { mutate: patchTask } = useMutation(
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

	const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
		setIsLoadingIcon((prevState) => !prevState)
		event.preventDefault()
		patchTask()
		setTimeout(() => {
			setIsLoadingIcon((prevState) => !prevState)
		}, 2000)
	}

	return {
		isTaskLoading,
		isLoadingComponent,
		data,
		taskData,
		setTaskData,
		deleteTask,
		isLoadingIcon,
		taskStatusChange,
		onSubmit,
	}
}

export default useTaskData
