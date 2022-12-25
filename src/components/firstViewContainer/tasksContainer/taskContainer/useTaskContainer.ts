import {useMutation, useQueryClient} from 'react-query'
import {useEffect, useRef, useState} from 'react'
import requestTaskApi from '../../../axiosConfig'
import {toast} from 'react-toastify'
import {TaskStatus} from '../../../../types/taskStatus'

const useTaskContainer = () => {

	const queryClient = useQueryClient()

	const [isOptionsVisible, setIsOptionsVisible] = useState(false)
	const containerReference = useRef<HTMLDivElement>(null)

	const {mutate} = useMutation((id:string)=> {
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

	const {mutate: patchTaskStatus} = useMutation((variables:{task:TaskStatus, id:string}) => {
		return requestTaskApi.patch(`/api/tasks/${variables.id}`, {taskStatus: variables.task})
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
		containerReference.current && setTimeout(() => containerReference.current?.classList.add('animation'), 150)
	}, [containerReference])

	const deleteAnimation = (id:string) => {
		setTimeout(() => containerReference.current?.classList.remove('animation'), 100)
		setTimeout(() => mutate(id), 200)
	}
	const changeOptionsVisible = () => {
		setIsOptionsVisible(prevState => !prevState)
	}
	return {
		isOptionsVisible,
		changeOptionsVisible,
		containerReference,
		patchTaskStatus,
		deleteAnimation
	}
}
export default useTaskContainer
