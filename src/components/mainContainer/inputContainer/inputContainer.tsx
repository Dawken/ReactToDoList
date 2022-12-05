import React, {ChangeEvent, useState} from 'react'
import './inputContainer.scss'
import {useMutation, useQueryClient} from 'react-query'
import requestTaskApi from '../../axiosConfig'

const TodoListContainer = () => {

	const queryClient = useQueryClient()

	const [task, setTask] = useState('')

	const {isLoading, mutate, error} = useMutation(() => {
		return requestTaskApi.post('/api/tasks', {text: task})
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
		},
	})

	const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate()
		setTask('')
	}
	if(error) {
		alert('Error! Please try again later')
	}
	return (
		<main>
			<form onSubmit={onSubmit}>
				<div className="input" >
					<input
						type="text"
						className="taskInput"
						placeholder={isLoading ? 'Saving your changes' : 'What are we doin today?'}
						onChange={(event) => setTask(event.target.value)}
						value={task}
						required={true}
						disabled={isLoading}
					/>
					<button className="submit">Add task</button>
				</div>
			</form>

		</main>
	)
}
export default TodoListContainer
