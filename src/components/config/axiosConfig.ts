import axios from 'axios'
import { store } from '../../redux/store'
import { getClientResponse } from '../../redux/clientResponse'

const localHost = process.env.REACT_APP_TASK_BACKEND_HOST

const requestTaskApi = axios.create({
	baseURL: localHost,
	withCredentials: true,
})
requestTaskApi.interceptors.response.use(undefined, (error) => {
	if (error.response.status === 401) {
		store.dispatch(getClientResponse({ isLogged: false }))
	}
	return Promise.reject(error)
})
export default requestTaskApi
