import React from 'react'
import TodoListContainer from './container/Header'
import './Background'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TaskData from "./subPages/taskData";
export default function App () {
  return (
      <Router>
        <Routes>
            <Route path = '/' element={<TodoListContainer />} />
            <Route path = '/:id' element={<TaskData />}/>
        </Routes>
      </Router>

  )
}
