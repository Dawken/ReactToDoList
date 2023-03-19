import React from 'react'
import TaskInput from './taskInput/taskInput'
import TasksListContainers from './taskListsContainers/tasksListContainers'
import LogoutContainer from '../shared/logout/logoutContainer'
import { useQuery } from 'react-query'
import requestTaskApi from '../../config/axiosConfig'
import BookLoaderAnimation from '../animations/bookLoaderAnimation/bookLoaderAnimation'
import PageNotFound from '../errorSubpages/pageNotFound/pageNotFound'

const MainContainer = () => {
	const { isLoading, data } = useQuery('tasks', () =>
		requestTaskApi.get('/api/tasks')
	)

	if (isLoading) return <BookLoaderAnimation />

	if (!data) return <PageNotFound />

	return (
		<>
			<LogoutContainer />
			<TaskInput />
			<TasksListContainers data={data} />
		</>
	)
}

export default MainContainer
