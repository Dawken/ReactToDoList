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
			<div className='userAccount'>
				<Link to={'/register'}>
					<div className='account'>Register</div>
				</Link>
				<Link to={'/login'}>
					<div className='account'>Login</div>
				</Link>
			</div>
			<form onSubmit={onSubmit}>
				<div className="taskInputContainer" >
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
