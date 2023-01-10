import React from 'react'
import './taskContainer.scss'
import {TaskStatus} from '../../../../types/taskStatus'
import {Link} from 'react-router-dom'
import useTaskContainer from './useTaskContainer'

type PropsTaskContainer = {
    text: string,
    id: string,
    taskStatus: TaskStatus,
    date: string,
    description: string
}

const TaskContainer = ({text,id,taskStatus}:PropsTaskContainer) => {

	const {
		isOptionsVisible,
		changeOptionsVisible,
		containerReference,
		patchTaskStatus,
		deleteAnimation
	} = useTaskContainer()

	return (
		<div className="taskContainer" ref={containerReference}>
			<div className="taskBody">
				<Link to={id}>
					<button className='eye'>
						<div className="EyeButton"></div>
					</button>
				</Link>
				{text}
				<button className="trash" onClick={changeOptionsVisible}>
					<i className="trashIcon"></i>
				</button>
			</div>
			<div className={isOptionsVisible ? 'options animation' : 'options'}>
				<button id="delete" onClick={() => deleteAnimation(id)}>Delete</button>
				{taskStatus !== 'todo' && <button id="todo"  onClick={() => patchTaskStatus({task: 'todo', id:id})}>To do</button>}
				{taskStatus !== 'during' && <button id="during" onClick={() => patchTaskStatus({task:'during', id:id})}>During</button>}
				{taskStatus !== 'done' && <button id="done" onClick={() => patchTaskStatus({task:'done', id:id})}>Done</button>}
			</div>
		</div>
	)
}

export default TaskContainer
