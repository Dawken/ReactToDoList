import React from 'react'
import './registerForm.scss'
import useRegisterForm from './useRegisterForm'
import { Controller, FormProvider } from 'react-hook-form'
import FormInput from '../formInput/formInput'
import { MenuItem, Select } from '@mui/material'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
	const { register, methods } = useRegisterForm()

	return (
		<main>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((formv) => register(formv))}
					className='registerForm'
				>
					<FormInput
						name='login'
						className='registerLabel'
						label='login'
						helperText='Login must be at least 3 symbols long'
					/>
					<FormInput
						name='name'
						className='registerLabel'
						label='name'
						helperText='Name must be at least 3 symbols long'
					/>
					<FormInput
						name='lastName'
						className='registerLabel'
						label='last name'
						helperText='Last name must be at least 3 symbols long'
					/>
					<FormInput
						name='password'
						className='registerLabel'
						label='password'
						type='password'
					/>
					<FormInput
						name='repeatPassword'
						className='registerLabel'
						label='repeat password'
						type='password'
					/>
					<Controller
						control={methods.control}
						name='gender'
						render={({ field }) => (
							<Select
								{...field}
								className='registerLabel'
								value={field.value || ''}
							>
								<MenuItem value='Male'>Male</MenuItem>
								<MenuItem value='Female'>Female</MenuItem>
								<MenuItem value='Other'>Other</MenuItem>
							</Select>
						)}
					/>
					<div>
						<button className='registerButton'>Register</button>
					</div>
					<Link to={'/login'} className='login'>
						<div className='createAccount'>
							Do you already have an account? Login now
						</div>
					</Link>
				</form>
			</FormProvider>
		</main>
	)
}

export default RegisterForm
