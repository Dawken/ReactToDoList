import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import requestTaskApi from '../../config/axiosConfig'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

const useTaskData = () => {
	const { id } = useParams()

	const queryClient = useQueryClient()

	const { isLoading, data } = useQuery(['task', `${id}`], () =>
		requestTaskApi.get(`/api/tasks/${id}`)
	)

	const [description, setDescription] = useState(data?.data.description)

	const { isLoading: patchDescription, mutate } = useMutation(
		() => {
			return requestTaskApi.patch(`/api/tasks/${id}`, {
				description: description,
			})
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('task')
				toast.success('Description has been updated!')
			},
			onError: () => {
				toast.error('Error! Can\'t update description!')
			},
		}
	)

	const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate()
	}

	return {
		isLoading,
		data,
		description,
		setDescription,
		patchDescription,
		onSubmit,
	}
}

export default useTaskData
