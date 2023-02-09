import * as React from 'react'
import TaskContainer from './taskContainer/taskContainer'
import styles from './tasksContainer.module.scss'
import { useQuery } from 'react-query'
import LoadingAnimation from '../../animations/loadingAnimation'
import TaskDataError from '../../errorSubpage/taskDataError'
import requestTaskApi from '../../../config/axiosConfig'

type PropsUserData = {
	_id: string;
	text: string;
	date: string;
	description: string;
	taskStatus: string;
};

const TasksContainer = () => {
	const { isLoading, data } = useQuery('tasks', () =>
		requestTaskApi.get('/api/tasks')
	)

	if (isLoading) return <LoadingAnimation />

	if (!data) return <TaskDataError />

	return (
		<div className={styles.container}>
			<div className={styles.tasksContainer}>
				<div className={styles.top}>
					<h1 className={styles.topTodo}>To do</h1>
				</div>
				{data?.data.map(
					(todo: PropsUserData) =>
						todo.taskStatus === 'todo' && (
							<TaskContainer
								text={todo.text}
								id={todo._id}
								key={todo._id}
								date={todo.date}
								description={todo.description}
								taskStatus='todo'
							/>
						)
				)}
			</div>

			<div className={styles.tasksContainer}>
				<div className={styles.top}>
					<h1 className={styles.topDuring}>During</h1>
				</div>
				{data?.data.map(
					(during: PropsUserData) =>
						during.taskStatus === 'during' && (
							<TaskContainer
								text={during.text}
								id={during._id}
								key={during._id}
								date={during.date}
								description={during.description}
								taskStatus='during'
							/>
						)
				)}
			</div>

			<div className={styles.tasksContainer}>
				<div className={styles.top}>
					<h1 className={styles.topDone}>Done</h1>
				</div>
				{data?.data.map(
					(done: PropsUserData) =>
						done.taskStatus === 'done' && (
							<TaskContainer
								text={done.text}
								id={done._id}
								key={done._id}
								date={done.date}
								description={done.description}
								taskStatus='done'
							/>
						)
				)}
			</div>
		</div>
	)
}

export default TasksContainer
