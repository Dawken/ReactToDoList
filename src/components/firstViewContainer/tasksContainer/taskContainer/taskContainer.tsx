import React from 'react'
import styles from './taskContainer.module.scss'
import { TaskStatus } from '../../../../types/taskStatus'
import { Link } from 'react-router-dom'
import useTaskContainer from './useTaskContainer'

type PropsTaskContainer = {
	text: string;
	id: string;
	taskStatus: TaskStatus;
	date: string;
	description: string;
};

const TaskContainer = ({ text, id, taskStatus }: PropsTaskContainer) => {
	const {
		changeOptionsVisible,
		containerReference,
		optionsReference,
		patchTaskStatus,
		deleteAnimation,
	} = useTaskContainer()

	return (
		<div className={styles.taskContainer} ref={containerReference}>
			<div className={styles.taskBody}>
				<div className={styles.taskDetailsButton}>
					<Link to={id}>
						<button className={styles.eye}>
							<div className={styles.eyeButton}></div>
						</button>
					</Link>
				</div>
				{text}
				<button
					className={styles.statusContainer}
					onClick={changeOptionsVisible}
				>
					<div className={styles.status}></div>
				</button>
			</div>
			<div className={styles.options} ref={optionsReference}>
				<button className={styles.delete} onClick={() => deleteAnimation(id)}>
					Delete
				</button>
				{taskStatus !== 'todo' && (
					<button
						className={styles.todo}
						onClick={() => patchTaskStatus({ task: 'todo', id: id })}
					>
						To do
					</button>
				)}
				{taskStatus !== 'during' && (
					<button
						className={styles.during}
						onClick={() => patchTaskStatus({ task: 'during', id: id })}
					>
						During
					</button>
				)}
				{taskStatus !== 'done' && (
					<button
						className={styles.done}
						onClick={() => patchTaskStatus({ task: 'done', id: id })}
					>
						Done
					</button>
				)}
			</div>
		</div>
	)
}

export default TaskContainer
