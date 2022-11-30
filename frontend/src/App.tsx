import React from 'react'
import './Background'
import './components/pageBackground.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskData from './components/subPages/taskData/taskData'
import TaskDataError from './components/errorSubpage/taskDataError'
import MainContainer from './components/mainContainer/mainContainer'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

export default function App () {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path = '*' element={<TaskDataError />} />
					<Route path = '/' element={<MainContainer />} />
					<Route path = '/:id' element={<TaskData />}/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>

	)
}
