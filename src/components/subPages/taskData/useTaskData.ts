import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import requestTaskApi from '../../../config/axiosConfig'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { SelectChangeEvent } from '@mui/material'
import axios from 'axios'

const useTaskData = () => {
	const { id } = useParams()
	const queryClient = useQueryClient()

	const [isEdited, setIsEdited] = useState(false)
	const [taskData, setTaskData] = useState({
		description: '',
		taskStatus: '',
		text: '',
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
	const taskStatusChange = (event: SelectChangeEvent) => {
		setTaskData((prevState) => ({
			...prevState,
			taskStatus: event.target.value,
		}))
	}

	const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		patchData()
		if (isEdited) setIsEdited((prevState) => !prevState)
	}

	return {
		isLoading,
		data,
		taskData,
		setTaskData,
		patchDescription,
		taskStatusChange,
		onSubmit,
		isEdited,
		setIsEdited,
	}
}

export default useTaskData
