import React from 'react'
import './Background'
import './components/pageBackground.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskData from './components/subPages/taskData/taskData'
import TaskDataError from './components/errorSubpage/taskDataError'
import MainContainer from './components/mainContainer/mainContainer'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Form from './components/subPages/form/form'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
})

export default function App () {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route path = '*' element={<TaskDataError />} />
						<Route path = '/' element={<MainContainer />} />
						<Route path = '/:id' element={<TaskData />}/>
						<Route path = '/register' element={<Form />} />
					</Routes>
					<ToastContainer
						position="top-left"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
