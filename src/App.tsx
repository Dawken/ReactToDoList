import React from 'react'
import './Background'
import './components/pageBackground.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TaskData from './components/subPages/taskData/taskData'
import TaskDataError from './components/errorSubpage/taskDataError'
import MainContainer from './components/mainContainer/mainContainer'
export default function App () {
	return (
		<Router>
			<Routes>
				<Route path = '*' element={<TaskDataError />} />
				<Route path = '/' element={<MainContainer />} />
				<Route path = '/:id' element={<TaskData />}/>
			</Routes>
		</Router>

	)
}
