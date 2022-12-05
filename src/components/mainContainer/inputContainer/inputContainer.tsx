import React, {ChangeEvent, useState} from 'react'
import './inputContainer.scss'
import {useMutation, useQueryClient} from 'react-query'
import requestTaskApi from '../../axiosConfig'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
			<ToastContainer
				position="top-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
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
