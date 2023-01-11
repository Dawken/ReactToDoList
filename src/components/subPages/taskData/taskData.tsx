import React from 'react'
import './taskData.scss'
import {Link} from 'react-router-dom'
import TaskDataError from '../../errorSubpage/taskDataError'
import LoadingAnimation from '../../animations/loadingAnimation'
import useTaskData from './useTaskData'
import LogoutContainer from '../../shared/logout/logoutContainer'


const TaskData = () => {

	const {
		isLoading,
		data,
		description,
		setDescription,
		patchDescription,
		onSubmit
	} = useTaskData()

	if(isLoading) return <LoadingAnimation />

	if(!data) return <TaskDataError />

	return (
		<>
			<LogoutContainer />
			<section className='taskData'>
				<div className='taskDataContainer'>
					<Link to={'/'}>
						<div className="arrowLeft"></div>
					</Link>
					<div className='taskDate'>{`Task name: ${data.data.text}`}</div>
					<div className='taskDate'>{`Task date: ${data.data.date}`}</div>
					<div className='taskDate'>{`Task Status: ${data.data.taskStatus}`}</div>
					<form onSubmit={onSubmit}>
						<textarea
							className='description'
							onChange={(event) => setDescription(event.target.value)}
							value={description === undefined ? data.data.description : description}
							placeholder='Description'
							required={true}
							disabled={patchDescription}
						/>
						<button className='save' disabled={patchDescription}>Save</button>
					</form>
				</div>
			</section>
		</>
	)
}

export default TaskData
