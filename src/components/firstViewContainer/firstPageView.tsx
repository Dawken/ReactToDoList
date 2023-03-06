import React from 'react'
import TaskInput from './taskInput/taskInput'
import TasksContainers from './tasksContainers/tasksContainers'

const FirstPageView = () => {
	return (
		<>
			<TaskInput />
			<TasksContainers />
		</>
	)
}

export default FirstPageView
