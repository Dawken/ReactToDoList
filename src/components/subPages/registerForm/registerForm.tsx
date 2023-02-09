import React from 'react'
import styles from './registerForm.module.scss'
import useRegisterForm from './useRegisterForm'
import { Controller, FormProvider } from 'react-hook-form'
import FormInput from '../formInput/formInput'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
	const { register, methods } = useRegisterForm()

	return (
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
						helperText='Login must be at least 3 symbols long'
					/>
					<FormInput
						name='name'
						className={styles.registerLabel}
						label='name'
						helperText='Name must be at least 3 symbols long'
					/>
					<FormInput
						name='lastName'
						className={styles.registerLabel}
						label='last name'
						helperText='Last name must be at least 3 symbols long'
					/>
					<FormInput
						name='password'
						className={styles.registerLabel}
						label='password'
						type='password'
					/>
					<FormInput
						name='repeatPassword'
						className={styles.registerLabel}
						label='repeat password'
						type='password'
					/>
					<FormControl fullWidth={true}>
						<Controller
							control={methods.control}
							name='gender'
							render={({ field }) => (
								<>
									<InputLabel>gender</InputLabel>
									<Select
										{...field}
										className={styles.registerLabel}
										label='gender'
										value={field.value}
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
	)
}

export default RegisterForm
