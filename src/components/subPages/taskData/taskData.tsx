import React from 'react'
import styles from './taskData.module.scss'
import { Link } from 'react-router-dom'
import PageNotFound from '../../errorSubpages/pageNotFound/pageNotFound'
import useTaskData from './useTaskData'
import LogoutContainer from '../../shared/logout/logoutContainer'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
	purpleTheme,
	redTheme,
	greenTheme,
} from '../../themes/customMuiThemes'
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import BookLoaderAnimation from '../../animations/bookLoaderAnimation/bookLoaderAnimation'

const TaskData = () => {
	const {
		isTaskLoading,
		isLoadingComponent,
		data,
		taskData,
		setTaskData,
		deleteTask,
		isLoadingIcon,
		taskStatusChange,
		onSubmit,
	} = useTaskData()

	if (isTaskLoading || isLoadingComponent) return <BookLoaderAnimation />

	if (!data) return <PageNotFound />

	return (
		<>
			<LogoutContainer />
			<div className={styles.taskData}>
				<div className={styles.taskDataContainer}>
					<Link to={'/'}>
						<ArrowBackIcon />
					</Link>
					<ThemeProvider theme={purpleTheme}>
						<div className={styles.taskInfo}>
							<TextField
								fullWidth
								label='Task name'
								variant='outlined'
								focused
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
								fullWidth
								label='Creation time'
								variant='outlined'
								value={taskData.date}
								focused
							/>
						</div>
						<div className={styles.taskInfo}>
							<FormControl fullWidth={true} focused>
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
								focused={true}
								rows={4}
								onChange={(event) =>
									setTaskData((prevState) => ({
										...prevState,
										description: event.target.value,
									}))
								}
								value={taskData.description}
							/>
						</div>
					</ThemeProvider>
					<div className={styles.optionsButtons}>
						<ThemeProvider theme={redTheme}>
							<Button
								variant='outlined'
								className={styles.deleteButton}
								onClick={() => deleteTask()}
								startIcon={<DeleteIcon />}
							>
								Delete
							</Button>
						</ThemeProvider>
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
							<ThemeProvider theme={greenTheme}>
								<Button
									variant='outlined'
									onClick={onSubmit}
									className={styles.saveButton}
								>
									Save
								</Button>
							</ThemeProvider>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default TaskData
