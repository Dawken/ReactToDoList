import React from 'react'
import TaskInput from './taskInput/taskInput'
import TasksListContainers from './taskListsContainers/tasksListContainers'

const FirstPageView = () => {
	return (
		<>
			<TaskInput />
			<TasksListContainers />
		</>
	)
}

export default FirstPageView
