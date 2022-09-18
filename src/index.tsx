import React from 'react'
import ReactDOM from 'react-dom/client'
import './components/css/index.scss'
import './components/subPages/taskData.scss'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import {store} from './components/redux/store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

reportWebVitals()

