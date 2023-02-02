import React from 'react'
import { TextField } from '@mui/material'
import useLoginForm from './useLoginForm'
import './loginForm.scss'
import { Link } from 'react-router-dom'

const LoginForm = () => {
	const { handleChange, loginForm, login } = useLoginForm()

	return (
		<div className='loginForm'>
			<form noValidate autoComplete='off'>
				<TextField
					label='login'
					variant='outlined'
					value={loginForm.login}
					name='login'
					onChange={handleChange}
					required
				/>
				<TextField
					label='Password'
					variant='outlined'
					value={loginForm.password}
					name='password'
					type='password'
					onChange={handleChange}
					required
				/>
			</form>
			<div>
				<button onClick={() => login()}>Login</button>
			</div>
			<Link to={'/register'} className='createAccount'>
				<div>Dont have account? Register now</div>
			</Link>
		</div>
	)
}

export default LoginForm
