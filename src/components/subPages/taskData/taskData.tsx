import React, {ChangeEvent, useState} from 'react'
import './taskData.scss'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {textAreaInput} from '../../redux/todoSlice'
import {Link, useParams} from 'react-router-dom'
import TaskDataError from '../../errorSubpage/taskDataError'

const TaskData = () => {

	const {id} = useParams()

	const todos = useAppSelector((state) => state.todos)
	const downloadTask = todos.container.find((element) => element.id === id)

	const [value, setValue] = useState(downloadTask?.description)
	const dispatch = useAppDispatch()


	const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (value) {
			dispatch(
				textAreaInput({
					description: value,
					id: downloadTask?.id
				}),
			)
		}
	}
	if(!downloadTask) {
		return <TaskDataError />
	}
	return (
		<section className='taskData'>
			<div className='taskDataContainer'>
				<Link to={'/'}>
					<i className="gg-arrow-left"></i>
				</Link>
				<div className='taskName'>{`Task name: ${downloadTask?.text}`}</div>
				<div className='taskDate'>{`Task date: ${downloadTask?.date}`}</div>
				<div className='taskStatus'>{`Task Status: ${downloadTask?.taskStatus}`}</div>
				<form onSubmit={onSubmit}>
					<textarea className='description' onChange={(event) => setValue(event.target.value)} value={value} placeholder='Description'/>
					<button className='save'>Save</button>
				</form>
			</div>
		</section>
	)
}

export default TaskData
