import axios from 'axios'

const requestTaskApi = axios.create({
	baseURL: 'http://localhost:5000',
	withCredentials: true
})
export default requestTaskApi
