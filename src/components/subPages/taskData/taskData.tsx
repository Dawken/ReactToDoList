import React, {ChangeEvent, useState} from 'react'
import './taskData.scss'
import {Link, useParams} from 'react-router-dom'
import TaskDataError from '../../errorSubpage/taskDataError'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import LoadingAnimation from '../../animations/loadingAnimation'
import requestTaskApi from '../../axiosConfig'
import {toast, ToastContainer} from 'react-toastify'

const TaskData = () => {

	const {id} = useParams()
	const queryClient = useQueryClient()

	const {isLoading, data} = useQuery(['task', `${id}`],  () => {
		return requestTaskApi.get(`/api/tasks/${id}`)
	})

	const [description, setDescription] = useState(data?.data.description)

	const {mutate} = useMutation(() => {
		return requestTaskApi.patch(`/api/tasks/${id}`, {description: description})
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries(['task', `${id}`])
			toast.success('Description has been updated!')
		},
		onError: () => {
			toast.error('Error! Can\'t update description!')
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
			<ToastContainer
				position="top-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<div className='taskDataContainer'>
				<Link to={'/'}>
					<div className="arrowLeft"></div>
				</Link>
				<div className='taskName'>{`Task name: ${data.data.text}`}</div>
				<div className='taskDate'>{`Task date: ${data.data.date}`}</div>
				<div className='taskStatus'>{`Task Status: ${data.data.taskStatus}`}</div>
				<form onSubmit={onSubmit}>
					<textarea
						className='description'
						onChange={(event) => setDescription(event.target.value)}
						value={description === undefined ? data.data.description : description}
						placeholder='Description'
					/>
					<button className='save'>Save</button>
				</form>

			</div>
		</section>
	)
}

export default TaskData
