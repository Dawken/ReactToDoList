import React from 'react'
import './taskData.scss'
import { Link } from 'react-router-dom'
import TaskDataError from '../../errorSubpage/taskDataError'
import LoadingAnimation from '../../animations/loadingAnimation'
import useTaskData from './useTaskData'
import LogoutContainer from '../../shared/logout/logoutContainer'
import { FormControl, MenuItem, Select } from '@mui/material'

const TaskData = () => {
	const {
		isLoading,
		data,
		taskData,
		setTaskData,
		patchDescription,
		taskStatusChange,
		onSubmit,
		isEdited,
		setIsEdited,
	} = useTaskData()

	if (isLoading) return <LoadingAnimation />

	if (!data) return <TaskDataError />

	return (
		<>
			<LogoutContainer />
			<section className='taskData'>
				<div className='taskDataContainer'>
					<Link to={'/'}>
						<div className='arrowLeft'></div>
					</Link>
					<button
						className='penButton'
						onClick={() => setIsEdited((prevState) => !prevState)}
					>
						<div className='penIcon'></div>
					</button>
					<div className='taskInfo'>
						{'Task name: '}
						{isEdited ? (
							<input
								className='taskInput'
								value={taskData.text}
								onChange={(event) =>
									setTaskData((prevState) => ({
										...prevState,
										text: event.target.value,
									}))
								}
							/>
						) : (
							data.data.text
						)}
					</div>
					<div className='taskDate'>{`Creation time: ${data.data.date}`}</div>
					<div className='taskInfo'>
						{'Task status: '}
						{isEdited ? (
							<FormControl>
								<Select
									className='taskStatus'
									value={taskData.taskStatus}
									onChange={taskStatusChange}
								>
									{data.data.taskStatus !== 'todo' && (
										<MenuItem value='todo'>todo</MenuItem>
									)}
									{data.data.taskStatus !== 'during' && (
										<MenuItem value='during'>during</MenuItem>
									)}
									{data.data.taskStatus !== 'done' && (
										<MenuItem value='done'>done</MenuItem>
									)}
								</Select>
							</FormControl>
						) : (
							data.data.taskStatus
						)}
					</div>
					<form onSubmit={onSubmit}>
						<textarea
							className='description'
							onChange={(event) =>
								setTaskData((prevState) => ({
									...prevState,
									description: event.target.value,
								}))
							}
							value={taskData.description}
							placeholder='Description'
							disabled={patchDescription}
						/>
						<button className='save' disabled={patchDescription}>
							Save
						</button>
					</form>
				</div>
			</section>
		</>
	)
}

export default TaskData
