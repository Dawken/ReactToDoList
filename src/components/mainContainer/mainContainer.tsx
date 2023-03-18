import React from 'react'
import TaskInput from './taskInput/taskInput'
import TasksListContainers from './taskListsContainers/tasksListContainers'
import LogoutContainer from '../shared/logout/logoutContainer'
import { useQuery } from 'react-query'
import requestTaskApi from '../../config/axiosConfig'
import BookLoaderAnimation from '../animations/bookLoaderAnimation/bookLoaderAnimation'

const MainContainer = () => {
	const { isLoading, data } = useQuery('tasks', () =>
		requestTaskApi.get('/api/tasks')
	)

	if (isLoading) return <BookLoaderAnimation />

	return (
		<>
			<LogoutContainer />
			<TaskInput />
			<TasksListContainers data={data} />
		</>
	)
}

export default MainContainer
