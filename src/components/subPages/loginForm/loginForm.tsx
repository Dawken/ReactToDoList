import React from 'react'
import {
	FormControl,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material'
import useLoginForm from './useLoginForm'
import styles from './loginForm.module.scss'
import { Link } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { ThemeProvider } from '@mui/material/styles'
import { purpleTheme } from '../../themes/customMuiThemes'

const LoginForm = () => {
	const {
		handleChange,
		loginForm,
		login,
		showPassword,
		handleClickShowPassword,
		handleMouseDownPassword,
		userExist,
	} = useLoginForm()

	return (
		<div className={styles.loginForm}>
			<div className={styles.loginBackground}>
				<form noValidate autoComplete='off'>
					<ThemeProvider theme={purpleTheme}>
						<FormControl sx={{ margin: 'normal' }}>
							<TextField
								label='login'
								variant='outlined'
								value={loginForm.login}
								name='login'
								className={styles.loginLabel}
								error={!userExist.login}
								helperText={
									!userExist.login &&
									loginForm.login.length > 0 &&
									'User does not exist!'
								}
								onChange={handleChange}
								required
								focused
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<AccountCircle style={{ color: '#FFFFFF' }} />
										</InputAdornment>
									),
								}}
							/>
						</FormControl>
						<FormControl sx={{ margin: 'normal' }}>
							<TextField
								label='password'
								variant='outlined'
								type={showPassword ? 'text' : 'password'}
								value={loginForm.password}
								className={styles.loginLabel}
								name='password'
								onChange={handleChange}
								error={!userExist.password}
								helperText={!userExist.password && 'Incorrect password!'}
								required
								focused
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LockOutlinedIcon style={{ color: '#FFFFFF' }} />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge='end'
												style={{ color: '#FFFFFF' }}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</FormControl>
					</ThemeProvider>
				</form>
				<div>
					<button className={styles.login} onClick={() => login()}>
						Login
					</button>
				</div>
				<Link to={'/register'} className={styles.createAccountLink}>
					<div className={styles.createAccount}>
						Dont have account? Register now
					</div>
				</Link>
			</div>
		</div>
	)
}

export default LoginForm
