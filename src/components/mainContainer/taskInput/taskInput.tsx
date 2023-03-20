import React from 'react'
import styles from './taskInput.module.scss'
import useTaskInput from './useTaskInput'
import { CircularProgress } from '@mui/material'

const TaskInput = () => {
	const { task, isLoading, inputChange, onSubmit } = useTaskInput()

	return (
		<form onSubmit={onSubmit}>
			<div className={styles.taskInputContainer}>
				<input
					type='text'
					className={styles.taskInput}
					placeholder={isLoading ? 'Saving your changes' : 'Add your task'}
					onChange={inputChange}
					value={task}
					required={true}
					disabled={isLoading}
				/>
				<button className={styles.submit} disabled={isLoading}>
					{isLoading ? <CircularProgress size={30} /> : 'Add task'}
				</button>
			</div>
		</form>
	)
}

export default TaskInput
