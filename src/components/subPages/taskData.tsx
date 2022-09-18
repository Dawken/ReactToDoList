import React, {ChangeEvent, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../redux/store'
import {textAreaInput} from '../redux/todoSlice'
import {Link, useParams} from 'react-router-dom'
import taskData404 from './taskData404'
import TaskData404 from './taskData404'

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
		return <TaskData404 />
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
