import React from 'react'
import {TextField} from '@mui/material'
import useLoginForm from './useLoginForm'
import './loginForm.scss'


const style = {
	width: 300,
	marginTop: '40px'
}

const LoginForm = () => {

	const {
		handleChange,
		loginForm,
		login
	} = useLoginForm()

	return (
		<div className='loginForm'>
			<form noValidate autoComplete='off'>
				<TextField
					sx={style}
					label='login'
					variant='outlined'
					value={loginForm.login}
					name='login'
					onChange={handleChange}
					required
				/>
				<TextField
					sx={style}
					label='Password'
					variant='outlined'
					value={loginForm.password}
					name='password'
					type="password"
					onChange={handleChange}
					required
				/>
			</form>
			<div><button onClick={login}>Login</button></div>
		</div>
	)
}
export default LoginForm
