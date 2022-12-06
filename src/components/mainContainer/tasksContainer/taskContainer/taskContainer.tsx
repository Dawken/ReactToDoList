import React from 'react'
import './taskContainer.scss'
import {useEffect, useRef, useState} from 'react'
import {TaskStatus} from '../../../../types/taskStatus'
import {Link} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import requestTaskApi from '../../../axiosConfig'

type PropsTaskContainer = {
    text: string,
    id: string,
    taskStatus: TaskStatus,
    date: string,
    description: string
}

const TaskContainer = ({text,id,taskStatus}:PropsTaskContainer) => {

	const queryClient = useQueryClient()
	const [isOptionsVisible , SetIsOptionsVisible ] = useState(false)
	const containerReference = useRef<HTMLDivElement>(null)

	const {mutate} = useMutation(() => {
		return requestTaskApi.delete(`/api/tasks/${id}`)
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
			toast.success('Task was deleted correctly!')
		},
		onError: () => {
			toast.error('Error! Can\'t delete task!')
		}
	})

	const {mutate: patchTaskStatus} = useMutation((task:TaskStatus) => {
		return requestTaskApi.patch(`/api/tasks/${id}`, {taskStatus: task})
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
			toast.success('Task was pushed correctly!')
		},
		onError: () => {
			toast.error('Error! Can\'t push task!')
		}
	})

	useEffect(() => {
		containerReference.current && setTimeout(() => containerReference.current?.classList.add('animation'),150)
	}, [containerReference])

	const deleteAnimation = () => {
		setTimeout(() => containerReference.current?.classList.remove('animation'),100)
		setTimeout(() => mutate(), 200)
	}

	return (
		<div className="taskContainer" ref={containerReference}>
			<div className="todofirst">
				<Link to={id}>
					<button className='eye'>
						<div className="EyeButton"></div>
					</button>
				</Link>
				{text}
				<button className="trash" onClick={() => SetIsOptionsVisible(prevState => !prevState)}>
					<i className="trashIcon"></i>
				</button>
			</div>
			<div className={isOptionsVisible ? 'options animation' : 'options'}>
				<button id="delete" onClick={deleteAnimation}>Delete</button>
				{taskStatus !== 'todo' && <button id="todo"  onClick={() => patchTaskStatus('todo')}>To do</button>}
				{taskStatus !== 'during' && <button id="during" onClick={() => patchTaskStatus('during')}>During</button>}
				{taskStatus !== 'done' && <button id="done" onClick={() => patchTaskStatus('done')}>Done</button>}
			</div>
		</div>
	)
}
export default TaskContainer
