import * as React from 'react'
import TaskContainer from './createContainer'
import {useAppSelector} from '../redux/store'


const TodoList = () => {

	const todos = useAppSelector((state) => state.todos)
	return (
		<div className="container">
			<div className="tasksContainers">
				<div className="top">
					<h1 id='topTodo'>To do</h1>
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

			<div className="tasksContainers">
				<div className="top">
					<h1 id='topDuring'>During</h1>
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

			<div className="tasksContainers">
				<div className="top">
					<h1 id='topDone'>Done</h1>
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
export default TodoList
