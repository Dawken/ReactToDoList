import React from 'react'
import './taskContainer.scss'
import {useEffect, useRef, useState} from 'react'
import {TaskStatus} from '../../../../customTypings'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useMutation, useQueryClient} from 'react-query'
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

	const {mutate, error} = useMutation(() => {
		return requestTaskApi.delete(`/api/tasks/${id}`)
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('tasks')
		},
	})

	useEffect(() => {
		containerReference.current && setTimeout(() => containerReference.current?.classList.add('animation'),150)
	}, [containerReference])

	const deleteAnimation = () => {
		setTimeout(() => containerReference.current?.classList.remove('animation'),100)
		setTimeout(() => mutate(), 200)
	}
	const pushTask= (task:TaskStatus) => {
		axios.patch(`/api/tasks/${id}`, {taskStatus: task})
		queryClient.invalidateQueries('tasks')
	}
	if(error) {
		alert('Error! Can\'t push task!')
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
				{taskStatus !== 'todo' && <button id="todo"  onClick={() => pushTask('todo')}>To do</button>}
				{taskStatus !== 'during' && <button id="during" onClick={() => pushTask('during')}>During</button>}
				{taskStatus !== 'done' && <button id="done" onClick={() => pushTask('done')}>Done</button>}
			</div>
		</div>
	)
}
export default TaskContainer
