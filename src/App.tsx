import React from 'react'
import './Background'
import './components/pageBackground.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskData from './components/subPages/taskData/taskData'
import TaskDataError from './components/errorSubpage/taskDataError'
import FirstPageView from './components/firstViewContainer/firstPageView'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterForm from './components/subPages/registerForm/registerForm'
import {ThemeProvider, createTheme} from '@mui/material/styles'
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
						<Route path = '/' element={<FirstPageView />} />
						<Route path = '/:id' element={<TaskData />}/>
						<Route path = '/register' element={<RegisterForm />} />
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
