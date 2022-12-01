import React, {ChangeEvent, useEffect, useState} from 'react'
import './taskData.scss'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import TaskDataError from '../../errorSubpage/taskDataError'

type UserData = {
	_id?: string,
	text?: string,
	date?: string,
	description?: string,
	taskStatus?: string,
}
const TaskData = () => {

	const {id} = useParams()

	const [taskData, setTaskData] = useState<UserData>({})

	useEffect(() => {
		const fetchData = async() => {
			const downloadTask = await axios.get(`/api/tasks/${id}`)
			setTaskData(downloadTask.data)
		}
		fetchData()
	},[])

	const onSubmit = async(event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		await axios.patch(`/api/tasks/${id}`, {description: taskData?.description})
	}

	return (
		<section className='taskData'>
			<div className='taskDataContainer'>
				<Link to={'/'}>
					<i className="gg-arrow-left"></i>
				</Link>
				<div className='taskName'>{`Task name: ${taskData?.text}`}</div>
				<div className='taskDate'>{`Task date: ${taskData?.date}`}</div>
				<div className='taskStatus'>{`Task Status: ${taskData?.taskStatus}`}</div>
				<form onSubmit={onSubmit}>
					<textarea
						className='description'
						onChange={(event) => setTaskData({
							...taskData,
							description:event.target.value
						})}
						value={taskData.description}
						placeholder='Description'
					/>
					<button className='save'>Save</button>
				</form>
			</div>
		</section>
	)
}

export default TaskData
