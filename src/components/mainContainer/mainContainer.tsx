import React from 'react'
import TaskInput from './taskInput/taskInput'
import TasksListContainers from './taskListsContainers/tasksListContainers'
import LogoutContainer from '../shared/logout/logoutContainer'

const MainContainer = () => {
	return (
		<>
			<LogoutContainer />
			<TaskInput />
			<TasksListContainers />
		</>
	)
}

export default MainContainer
