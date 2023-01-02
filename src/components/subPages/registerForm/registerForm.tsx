import React from 'react'
import './registerForm.scss'
import useRegisterForm from './useRegisterForm'
import {Controller, FormProvider} from 'react-hook-form'
import FormInput from '../formInput/formInput'
import {MenuItem, Select} from '@mui/material'
import {Link} from 'react-router-dom'


const RegisterForm = () => {

	const {
		onSubmitHandler,
		methods
	} = useRegisterForm()

	return (
		<main>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmitHandler)}>
					<FormInput
						name='login'
						label='login'
						helperText='Login must be at least 3 symbols long'
					/>
					<FormInput
						name='name'
						label='name'
						helperText='Name must be at least 3 symbols long'
					/>
					<FormInput
						name='lastName'
						label='last name'
						helperText='Last name must be at least 3 symbols long'
					/>
					<FormInput
						name='password'
						label='password'
						type='password'
					/>
					<FormInput
						name='repeatPassword'
						label='repeat Password'
						type='password'
					/>
					<Controller
						control={methods.control}
						name='gender'
						render={({field}) => (
							<Select
								{...field}
								style={{width: '300px', marginTop: '40px'}}
								value={field.value || ''}
							>
								<MenuItem value='Male'>Male</MenuItem>
								<MenuItem value='Female'>Female</MenuItem>
								<MenuItem value='Other'>Other</MenuItem>
							</Select>
						)}
					/>
					<div><button>Register</button></div>
					<Link to={'/login'} style={{textDecoration:'none', color: 'white', marginTop: '40px'}}>
						<div className='createAccount'>Do you already have an account? Login now</div>
					</Link>
				</form>
			</FormProvider>
		</main>
	)
}
export default RegisterForm
