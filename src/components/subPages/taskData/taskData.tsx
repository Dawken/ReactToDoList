import React, {ChangeEvent, useState} from 'react'
import './taskData.scss'
import {Link, useParams} from 'react-router-dom'
import TaskDataError from '../../errorSubpage/taskDataError'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import LoadingAnimation from '../../animations/loadingAnimation'
import {toast} from 'react-toastify'
import requestTaskApi from '../../axiosConfig'

const TaskData = () => {

	const {id} = useParams()
	const queryClient = useQueryClient()

	const {isLoading, data} = useQuery(['task', `${id}`],  () =>
		requestTaskApi.get(`/api/tasks/${id}`),
	{
		refetchOnWindowFocus: false
	}
	)

	const [description, setDescription] = useState(data?.data.description)

	const {isLoading: patchDescription, mutate} = useMutation(() => {
		return requestTaskApi.patch(`/api/tasks/${id}`, {description: description})
	}, {
		onMutate: () => {
			toast.promise(
				new Promise(resolve => setTimeout(resolve, 500)),
				{
					pending: 'Updating description...',
					success: 'Description has been updated 👌',
					error: 'Error, couldn\'t update description 🤯',
				}
			)
		},
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
		}
	})

	const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate()
	}

	if(isLoading) return <LoadingAnimation />

	if(!data) return <TaskDataError />
	return (
		<section className='taskData'>
			<div className='taskDataContainer'>
				<Link to={'/'}>
					<div className="arrowLeft"></div>
				</Link>
				<div className='taskDate'>{`Task name: ${data.data.text}`}</div>
				<div className='taskDate'>{`Task date: ${data.data.date}`}</div>
				<div className='taskDate'>{`Task Status: ${data.data.taskStatus}`}</div>
				<form onSubmit={onSubmit}>
					<textarea
						className='description'
						onChange={(event) => setDescription(event.target.value)}
						value={description === undefined ? data.data.description : description}
						placeholder='Description'
						required={true}
						disabled={patchDescription}
					/>
					<button className='save' disabled={patchDescription}>Save</button>
				</form>

			</div>
		</section>
	)
}

export default TaskData
