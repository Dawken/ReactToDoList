import React from 'react'
import styles from './taskDataError.module.scss'
import { Link } from 'react-router-dom'

const TaskDataError = () => {
	return (
		<section className={styles.taskData}>
			<div className={styles.errorContainer}>
				<Link to={'/'}>
					<div className={styles.arrowLeft}></div>
				</Link>
				<div className={styles.errorInformation}>Task does not exist!</div>
			</div>
		</section>
	)
}

export default TaskDataError
