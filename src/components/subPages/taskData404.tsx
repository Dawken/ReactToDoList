import React from 'react'
import {Link} from 'react-router-dom'

const TaskData404 = () => {
	return (
		<section className='taskData'>
			<div className='taskDataContainer'>
				<Link to={'/'}>
					<i className="gg-arrow-left"></i>
				</Link>
				<div className='error404'>Task does not exist!</div>
			</div>
		</section>
	)
}
export default TaskData404
