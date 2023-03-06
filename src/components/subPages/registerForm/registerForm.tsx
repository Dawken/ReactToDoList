import React from 'react'
import styles from './registerForm.module.scss'
import useRegisterForm from './useRegisterForm'
import { Controller, FormProvider } from 'react-hook-form'
import FormInput from '../../shared/formInput/formInput'
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material'
import { Link } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const RegisterForm = () => {
	const {
		register,
		methods,
		showPassword,
		handleClickShowPassword,
		handleMouseDownPassword,
	} = useRegisterForm()

	return (
		<div className={styles.background}>
			<div className={styles.joinUsContainer}>
				<div className={styles.joinUs}>Join us</div>
			</div>
			<main>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit((formv) => register(formv))}
						className={styles.registerForm}
					>
						<FormInput
							name='login'
							className={styles.registerLabel}
							label='login'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<AccountCircle />
									</InputAdornment>
								),
							}}
						/>
						<FormInput
							name='name'
							className={styles.registerLabel}
							label='name'
						/>
						<FormInput
							name='lastName'
							className={styles.registerLabel}
							label='last name'
						/>
						<FormInput
							name='password'
							className={styles.registerLabel}
							label='password'
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockOutlinedIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<FormInput
							name='repeatPassword'
							className={styles.registerLabel}
							label='repeat password'
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LockOutlinedIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<FormControl fullWidth={true}>
							<Controller
								control={methods.control}
								name='gender'
								render={({ field }) => (
									<>
										<InputLabel className={styles.registerLabel}>
											gender
										</InputLabel>
										<Select
											{...field}
											label='gender'
											className={styles.registerLabel}
											value={field.value ?? ''}
										>
											<MenuItem value='Male'>Male</MenuItem>
											<MenuItem value='Female'>Female</MenuItem>
											<MenuItem value='Other'>Other</MenuItem>
										</Select>
									</>
								)}
							/>
						</FormControl>
						<div>
							<button className={styles.registerButton}>Register</button>
						</div>
						<Link to={'/login'} className={styles.login}>
							<div className={styles.createAccount}>
								Do you already have an account? Login now
							</div>
						</Link>
					</form>
				</FormProvider>
			</main>
		</div>
	)
}

export default RegisterForm
