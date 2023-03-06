import React from 'react'
import styles from './taskData.module.scss'
import { Link } from 'react-router-dom'
import TaskDataError from '../../errorSubpages/taskDataError'
import LoadingAnimation from '../../animations/loadingAnimation'
import useTaskData from './useTaskData'
import LogoutContainer from '../../shared/logout/logoutContainer'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

import {
	Button,
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
		isLoadingIcon,
		deleteTask,
		taskStatusChange,
		onSubmit,
	} = useTaskData()

	if (isLoading) return <LoadingAnimation />

	if (!data) return <TaskDataError />

	return (
		<>
			<LogoutContainer />
			<div className={styles.taskData}>
				<div className={styles.taskDataContainer}>
					<Link to={'/'}>
						<div className={styles.arrowLeft}></div>
					</Link>
					<div className={styles.taskInfo}>
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
					<div className={styles.taskInfo}>
						<TextField
							fullWidth={true}
							label='Creation time'
							variant='outlined'
							value={taskData.date}
							disabled={true}
						/>
					</div>
					<div className={styles.taskInfo}>
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
					<div className={styles.description}>
						<TextField
							label='Description'
							fullWidth={true}
							multiline
							rows={4}
							onChange={(event) =>
								setTaskData((prevState) => ({
									...prevState,
									description: event.target.value,
								}))
							}
							value={taskData.description}
							disabled={patchDescription}
						/>
					</div>
					<div className={styles.optionsButtons}>
						<Button
							variant='outlined'
							className={styles.deleteButton}
							onClick={() => deleteTask()}
							startIcon={<DeleteIcon />}
						>
							Delete
						</Button>
						{isLoadingIcon ? (
							<LoadingButton
								loading
								className={styles.saveButton}
								loadingPosition='start'
								startIcon={<SaveIcon />}
								variant='outlined'
							>
								Save
							</LoadingButton>
						) : (
							<Button
								variant='outlined'
								onClick={onSubmit}
								className={styles.saveButton}
								disabled={patchDescription}
							>
								Save
							</Button>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default TaskData
