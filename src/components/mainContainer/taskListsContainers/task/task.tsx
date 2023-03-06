import React from 'react'
import styles from './task.module.scss'
import { TaskStatus } from '../../../../types/taskStatus'
import { Link } from 'react-router-dom'
import useTask from './useTask'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RateReviewIcon from '@mui/icons-material/RateReview'

type PropsTaskContainer = {
	text: string;
	id: string;
	taskStatus: TaskStatus;
	date: string;
	description: string;
};

const Task = ({ text, id, taskStatus }: PropsTaskContainer) => {
	const {
		changeOptionsVisible,
		containerReference,
		optionsReference,
		patchTaskStatus,
		deleteAnimation,
	} = useTask()

	return (
		<div className={styles.taskContainer} ref={containerReference}>
			<div className={styles.taskBody}>
				<div className={styles.taskDetailsButton}>
					<Link to={id}>
						<button className={styles.eye}>
							<VisibilityIcon />
						</button>
					</Link>
				</div>
				{text}
				<button
					className={styles.statusContainer}
					onClick={changeOptionsVisible}
				>
					<RateReviewIcon />
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

export default Task
