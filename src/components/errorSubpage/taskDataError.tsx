import React from 'react'
import './taskDataError.scss'
import {Link} from 'react-router-dom'

const TaskDataError = () => {
	return (
		<section className='taskData'>
			<div className='errorContainer'>
				<Link to={'/'}>
					<div className="arrowLeft"></div>
				</Link>
				<div className='errorInformation'>Task does not exist!</div>
			</div>
		</section>
	)
}

export default TaskDataError
