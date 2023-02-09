import React from 'react'
import styles from './inputContainer.module.scss'
import useInputContainer from './useInputContainer'
import LogoutContainer from '../../shared/logout/logoutContainer'

const TodoListContainer = () => {
	const { task, isLoading, inputChange, onSubmit } = useInputContainer()

	return (
		<>
			<LogoutContainer />
			<form onSubmit={onSubmit}>
				<div className={styles.taskInputContainer}>
					<input
						type='text'
						className={styles.taskInput}
						placeholder={
							isLoading ? 'Saving your changes' : 'What are we doing today?'
						}
						onChange={inputChange}
						value={task}
						required={true}
						disabled={isLoading}
					/>
					<button className={styles.submit} disabled={isLoading}>
						Add task
					</button>
				</div>
			</form>
		</>
	)
}

export default TodoListContainer
