import * as React from 'react'
import TaskContainer from './taskContainer/taskContainer'
import './tasksContainer.scss'
import {useQuery} from 'react-query'
import LoadingAnimation from '../../animations/loadingAnimation'
import TaskDataError from '../../errorSubpage/taskDataError'
import requestTaskApi from '../../axiosConfig'
import {useAppSelector} from '../../../redux/store'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'


type PropsUserData = {
	_id: string,
	text: string,
	date: string,
	description: string,
	taskStatus: string,
}

const TasksContainer = () => {

	const responseCode = useAppSelector(state => state.auth.clientResponse)

	const navigate = useNavigate()

	const {isLoading, data} = useQuery('tasks',  () =>
		requestTaskApi.get('/api/tasks'),
	)

	useEffect(() => {
		if(responseCode === 401) {
			navigate('/login')
		}
	})
	if(isLoading) return <LoadingAnimation />

	if(!data) return <TaskDataError />

	return (
		<div className="container">
			<div className="tasksContainer">
				<div className="top">
					<h1 className='topTodo'>To do</h1>
				</div>
				{data?.data.map((todo:PropsUserData) => (
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
				{data?.data.map((during:PropsUserData) => (
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
				{data?.data.map((done:PropsUserData) => (
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
