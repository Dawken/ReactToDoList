import * as React from 'react'
import Task from './task/task'
import styles from './tasksListContainers.module.scss'
import LoadingAnimation from '../../animations/loadingAnimation'

type PropsUserData = {
	_id: string;
	text: string;
	date: string;
	description: string;
	taskStatus: string;
};

interface useQueryProps {
	isLoading: boolean;
	data: {
		data: [];
	};
}

const TasksListContainers = ({ data, isLoading }: useQueryProps) => {
	if (isLoading) return <LoadingAnimation />

	return (
		<div className={styles.container}>
			<div className={styles.tasksContainer}>
				<div className={styles.top}>
					<h1 className={styles.topTodo}>To do</h1>
				</div>
				{data?.data.map(
					(todo: PropsUserData) =>
						todo.taskStatus === 'todo' && (
							<Task
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
							<Task
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
							<Task
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

export default TasksListContainers
