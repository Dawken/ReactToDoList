import axios from 'axios'
import {getClientResponse} from '../redux/clientResponse'
import {store} from '../redux/store'


const requestTaskApi = axios.create({
	baseURL: 'http://localhost:5000',
	withCredentials: true
})

requestTaskApi.interceptors.response.use((response) => {
	return response
}, (error) => {
	store.dispatch(getClientResponse({number: error.response.status}))
	return Promise.reject(error)
})

export default requestTaskApi
