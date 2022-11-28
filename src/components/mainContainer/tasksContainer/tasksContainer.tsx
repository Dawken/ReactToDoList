import * as React from 'react'
import TaskContainer from './taskContainer/taskContainer'
import './tasksContainer.scss'
import {useAppSelector} from '../../redux/store'


const TasksContainer = () => {

	const todos = useAppSelector((state) => state.todos)

	return (
		<div className="container">
			<div className="tasksContainer">
				<div className="top">
					<h1 className='topTodo'>To do</h1>
				</div>
				{todos.container.map((todo) => (
					todo.taskStatus === 'todo' &&
					<TaskContainer
						text={todo.text}
						id={todo.id}
						key={todo.id}
						date={todo.date}
						description={todo.description}
						taskStatus="todo"
					/>
				))}
			</div>

			<div className="tasksContainer">
				<div className="top">
					<h1 className='topDuring'>During</h1>
				</div>
				{todos.container.map((during) => (
					during.taskStatus === 'during' &&
					<TaskContainer
						text={during.text}
						id={during.id}
						key={during.id}
						date={during.date}
						description={during.description}
						taskStatus="during"
					/>
				))}
			</div>

			<div className="tasksContainer">
				<div className="top">
					<h1 className='topDone'>Done</h1>
				</div>
				{todos.container.map((done) => (
					done.taskStatus === 'done' &&
					<TaskContainer
						text={done.text}
						id={done.id}
						key={done.id}
						date={done.date}
						description={done.description}
						taskStatus="done"
					/>
				))}
			</div>
		</div>
	)
}
export default TasksContainer
