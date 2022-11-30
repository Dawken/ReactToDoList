import React, {ChangeEvent} from 'react'
import './inputContainer.scss'
import {useState} from 'react'
import {addTodo} from '../../redux/todoSlice'
import {useAppDispatch} from '../../redux/store'

const TodoListContainer = () => {

	const [value, setValue] = useState('')
	const dispatch = useAppDispatch()

	const onSubmit = (event:ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		if(value) {
			dispatch(
				addTodo({
					title: value,
					taskStatus: 'todo'
				}),
			)
			setValue('')
		}
	}
	return (
		<main>
			<form onSubmit={onSubmit}>
				<div className="input" >
					<input
						type="text"
						className="taskInput"
						onChange={(event) => setValue(event.target.value)}
						placeholder="What are we doin today?"
						value={value}
					/>
					<button className="submit" >Add task</button>
				</div>
			</form>

		</main>
	)
}
export default TodoListContainer
