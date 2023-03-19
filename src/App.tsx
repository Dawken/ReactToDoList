import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskData from './components/subPages/taskData/taskData'
import PageNotFound from './components/errorSubpages/pageNotFound/pageNotFound'
import MainContainer from './components/mainContainer/mainContainer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './background.scss'
import RegisterForm from './components/subPages/registerForm/registerForm'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LoginForm from './components/subPages/loginForm/loginForm'
import PrivateRoutes from './components/utils/privateRoutes'

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

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route element={<PrivateRoutes />}>
							<Route path='/' element={<MainContainer />} />
							<Route path='/:id' element={<TaskData />} />
						</Route>
						<Route path='*' element={<PageNotFound />} />
						<Route path='/register' element={<RegisterForm />} />
						<Route path='/login' element={<LoginForm />} />
					</Routes>
					<ToastContainer
						position='top-left'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='dark'
					/>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
export default App
