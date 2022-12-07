import React from 'react'
import './inputContainer.scss'
import useInputContainer from './useInputContainer'

const TodoListContainer = () => {
	const {
		task,
		isLoading,
		inputChange,
		onSubmit
	} = useInputContainer()
	return (
		<main>
			<form onSubmit={onSubmit}>
				<div className="input" >
					<input
						type="text"
						className="taskInput"
						placeholder={isLoading ? 'Saving your changes' : 'What are we doin today?'}
						onChange={inputChange}
						value={task}
						required={true}
						disabled={isLoading}
					/>
					<button className="submit" disabled={isLoading}>Add task</button>
				</div>
			</form>
		</main>
	)
}
export default TodoListContainer
