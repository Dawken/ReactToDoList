import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
	<>
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
		<App />
	</>

)

