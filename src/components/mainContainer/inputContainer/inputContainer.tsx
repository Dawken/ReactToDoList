import React, {ChangeEvent, useState} from 'react'
import './inputContainer.scss'
import axios from 'axios'

const TodoListContainer = () => {

	const [task, setTask] = useState('')

	const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		axios.post('/api/tasks', {text: task})
		setTask('')
	}

	return (
		<main>
			<form onSubmit={onSubmit}>
				<div className="input" >
					<input
						type="text"
						className="taskInput"
						placeholder="What are we doin today?"
						onChange={(event) => setTask(event.target.value)}
						value={task}
					/>
					<button className="submit">Add task</button>
				</div>
			</form>

		</main>
	)
}
export default TodoListContainer
