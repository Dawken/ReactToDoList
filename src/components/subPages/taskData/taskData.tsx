import React from 'react'
import './taskData.scss'
import { Link } from 'react-router-dom'
import TaskDataError from '../../errorSubpage/taskDataError'
import LoadingAnimation from '../../animations/loadingAnimation'
import useTaskData from './useTaskData'
import LogoutContainer from '../../shared/logout/logoutContainer'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'

const TaskData = () => {
	const {
		isLoading,
		data,
		taskData,
		setTaskData,
		patchDescription,
		deleteTask,
		taskStatusChange,
		onSubmit,
	} = useTaskData()

	if (isLoading) return <LoadingAnimation />

	if (!data) return <TaskDataError />

	return (
		<>
			<LogoutContainer />
			<div className='taskData'>
				<div className='taskDataContainer'>
					<Link to={'/'}>
						<div className='arrowLeft'></div>
					</Link>
					<div className='taskInfo'>
						<TextField
							fullWidth={true}
							label='Task name'
							variant='outlined'
							value={taskData.text}
							onChange={(event) =>
								setTaskData((prevState) => ({
									...prevState,
									text: event.target.value,
								}))
							}
						/>
					</div>
					<div className='taskDate'>
						<TextField
							fullWidth={true}
							label='Creation time'
							variant='outlined'
							value={taskData.date}
							disabled={true}
						/>
					</div>
					<div className='taskInfo'>
						<FormControl fullWidth={true}>
							<InputLabel>Task status</InputLabel>
							<Select
								label='Task status'
								value={taskData.taskStatus}
								onChange={taskStatusChange}
							>
								<MenuItem value='todo'>todo</MenuItem>
								<MenuItem value='during'>during</MenuItem>
								<MenuItem value='done'>done</MenuItem>
							</Select>
						</FormControl>
					</div>
					<form onSubmit={onSubmit} className='descriptionForm'>
						<TextField
							label='Description'
							fullWidth={true}
							multiline
							rows={4}
							className='description'
							onChange={(event) =>
								setTaskData((prevState) => ({
									...prevState,
									description: event.target.value,
								}))
							}
							value={taskData.description}
							disabled={patchDescription}
						/>
						<div className='optionsButtons'>
							<button className='deleteButton' onClick={() => deleteTask()}>
								Delete<div className='trashIcon'></div>
							</button>
							<button className='saveButton' disabled={patchDescription}>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default TaskData
