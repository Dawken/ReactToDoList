import React from 'react'
import TaskInput from './taskInput/taskInput'
import TasksListContainers from './taskListsContainers/tasksListContainers'

const MainContainer = () => {
	return (
		<>
			<TaskInput />
			<TasksListContainers />
		</>
	)
}

export default MainContainer
