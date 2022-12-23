import React from 'react'
import './inputContainer.scss'
import useInputContainer from './useInputContainer'
import {Link} from 'react-router-dom'

const TodoListContainer = () => {
	const {
		task,
		isLoading,
		inputChange,
		onSubmit
	} = useInputContainer()

	return (
		<main>
			<Link to={'/register'}>
				<div className='register'>Register</div>
			</Link>
			<Link to={'/login'}>
				<div className='login'>Login</div>
			</Link>
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
