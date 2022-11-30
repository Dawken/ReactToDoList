import * as React from 'react'
import TaskContainer from './taskContainer/taskContainer'
import './tasksContainer.scss'
import axios from 'axios'
import {useEffect, useState} from 'react'

type UserData = {
	_id: string,
	text: string,
	date: string,
	description: string,
	taskStatus: string,
}
const TasksContainer = () => {

	const [userData, setUserData] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get('/getAll')
			setUserData(data.data)
		}
		fetchData()
	},[userData])
	return (
		<div className="container">
			<div className="tasksContainer">
				<div className="top">
					<h1 className='topTodo'>To do</h1>
				</div>
				{userData.map((todo:UserData) => (
					todo.taskStatus === 'todo' &&
						<TaskContainer
							text={todo.text}
							id={todo._id}
							key={todo._id}
							date={todo.date}
							description={todo.description}
							taskStatus="todo"
						/>
				))}
			</div>

			<div className="tasksContainer">
				<div className="top">
					<h1 className='topDuring'>During</h1>
				</div>
				{userData.map((during:UserData) => (
					during.taskStatus === 'during' &&
					<TaskContainer
						text={during.text}
						id={during._id}
						key={during._id}
						date={during.date}
						description={during.description}
						taskStatus="during"
					/>
				))}
			</div>

			<div className="tasksContainer">
				<div className="top">
					<h1 className='topDone'>Done</h1>
				</div>
				{userData.map((done:UserData) => (
					done.taskStatus === 'done' &&
					<TaskContainer
						text={done.text}
						id={done._id}
						key={done._id}
						date={done.date}
						description={done.description}
						taskStatus="done"
					/>
				))}
			</div>
		</div>
	)
}
export default TasksContainer
