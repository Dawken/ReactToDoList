import React from 'react'
import TaskInput from './taskInput/taskInput'
import TasksListContainers from './taskListsContainers/tasksListContainers'
import LogoutContainer from '../shared/logout/logoutContainer'
import { useQuery } from 'react-query'
import requestTaskApi from '../../config/axiosConfig'
import LoadingAnimation from '../animations/loadingAnimation'
import TaskDataError from '../errorSubpages/taskDataError'

const MainContainer = () => {
	const { isLoading, data } = useQuery('tasks', () =>
		requestTaskApi.get('/api/tasks')
	)

	if (isLoading) {
		return <LoadingAnimation />
	}

	if (!data) return <TaskDataError />

	return (
		<>
			<LogoutContainer />
			<TaskInput />
			<TasksListContainers data={data} isLoading={isLoading} />
		</>
	)
}

export default MainContainer
