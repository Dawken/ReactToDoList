import React from 'react'
import './taskDataError.scss'
import {Link} from 'react-router-dom'

const TaskDataError = () => {
	return (
		<section className='taskData'>
			<div className='errorContainer'>
				<Link to={'/'}>
					<i className="gg-arrow-left"></i>
				</Link>
				<div className='errorInformation'>Task does not exist!</div>
			</div>
		</section>
	)
}
export default TaskDataError
