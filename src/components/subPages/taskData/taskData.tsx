import React, {ChangeEvent, useState} from 'react'
import './taskData.scss'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import TaskDataError from '../../errorSubpage/taskDataError'
import {useQuery, useQueryClient} from 'react-query'
import LoadingAnimation from '../../animations/loadingAnimation'

const TaskData = () => {

	const {id} = useParams()
	const queryClient = useQueryClient()

	const {isLoading, data} = useQuery(['task', `${id}`],  () => {
		return axios.get(`/api/tasks/${id}`)
	})

	const [description, setDescription] = useState(data?.data.description)

	const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		axios.patch(`/api/tasks/${id}`, {description: description})
		queryClient.invalidateQueries(['task', `${id}`])
	}
	if(isLoading) return <LoadingAnimation />

	if(!data) return <TaskDataError />
	return (
		<section className='taskData'>
			<div className='taskDataContainer'>
				<Link to={'/'}>
					<i className="gg-arrow-left"></i>
				</Link>
				<div className='taskName'>{`Task name: ${data?.data.text}`}</div>
				<div className='taskDate'>{`Task date: ${data?.data.date}`}</div>
				<div className='taskStatus'>{`Task Status: ${data?.data.taskStatus}`}</div>
				<form onSubmit={onSubmit}>
					<textarea
						className='description'
						onChange={(event) => setDescription(event.target.value)}
						value={description === undefined ? data?.data.description : description}
						placeholder='Description'
					/>
					<button className='save'>Save</button>
				</form>

			</div>
		</section>
	)
}

export default TaskData
