import React from 'react'
import TodoListContainer from './container/Header'
import './Background'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TaskData from './subPages/taskData'
import TaskData404 from './subPages/taskData404'
export default function App () {
	return (
		<Router>
			<Routes>
				<Route path = '*' element={<TaskData404 />} />
				<Route path = '/' element={<TodoListContainer />} />
				<Route path = '/:id' element={<TaskData />}/>
			</Routes>
		</Router>

	)
}
