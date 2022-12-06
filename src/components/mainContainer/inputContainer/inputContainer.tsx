import React, {ChangeEvent, useState} from 'react'
import './inputContainer.scss'
import {useMutation, useQueryClient} from 'react-query'
import requestTaskApi from '../../axiosConfig'
import {toast} from 'react-toastify'

const TodoListContainer = () => {

	const queryClient = useQueryClient()

	const [task, setTask] = useState('')

	const {isLoading, mutate} = useMutation(() => {
		return requestTaskApi.post('/api/tasks', {text: task})
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
			toast.success('Task was added correctly!')
		},
		onError: () => {
			toast.error('Error! Can\'t add task!')
		}
	})

	const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate()
		setTask('')
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
					<button className="submit" disabled={isLoading}>Add task</button>
				</div>
			</form>

		</main>
	)
}
export default TodoListContainer
