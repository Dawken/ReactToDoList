import React from 'react'
import {MenuItem, TextField} from '@mui/material'
import './form.scss'
import useForm from './useForm'

const style = {
	'& label.Mui-focused': {
	},
	'& .MuiOutlinedInput-root': {
		color: 'white',
		'&.Mui-focused fieldset': { /// border focused color
		},
		'&.MuiFormLabel-root': {
			color: 'white'
		}
	}
}

const Form = () => {

	const {
		formData,
		handleChange,
		submitForm,
	} = useForm()

	return (
		<main>
			<form noValidate autoComplete='off'>
				<TextField
					sx={style}
					label='login'
					variant='outlined'
					value={formData.login}
					color={formData.login.length > 2 ? 'success' : undefined}
					name='login'
					onChange={handleChange}
					error={(formData.login.length < 3 && formData.login.length > 0 ) || formData.login.length > 16}
					focused={formData.login.length > 0}
					helperText='Login must be at least 3 symbols long.'
					required
				/>
				<TextField
					sx={style}
					label='User name'
					variant='outlined'
					value={formData.name}
					color={formData.name.length > 2 ? 'success' : undefined}
					name='name'
					onChange={handleChange}
					error={(formData.name.length < 3 && formData.name.length > 0) || formData.name.length > 10}
					focused={formData.name.length > 0}
					helperText='User name must be at least 3 symbols long.'
					required
				/>
				<TextField
					sx={style}
					label='Last name'
					variant="outlined"
					value={formData.lastName}
					color={formData.lastName.length > 2 ? 'success' : undefined}
					name='lastName'
					onChange={handleChange}
					error={formData.lastName.length < 3 && formData.lastName.length > 0}
					focused={formData.lastName.length > 0}
					required
				/>
				<TextField
					sx={style}
					label='Password'
					variant='outlined'
					value={formData.password}
					name='password'
					type="password"
					onChange={handleChange}
					color={formData.password.length > 7 ? 'success' : undefined}
					error={formData.password.length < 8 && formData.password.length > 0}
					focused={formData.password.length > 0}
					helperText={formData.password.length < 8  && 'Password must be at least 8 symbols.'}
					required
				/>
				<TextField
					sx={style}
					label='Repeat Password'
					variant="outlined"
					value={formData.repeatPassword}
					name='repeatPassword'
					type="password"
					onChange={handleChange}
					color={formData.repeatPassword === formData.password ? 'success' : undefined}
					error={formData.repeatPassword !== formData.password}
					focused={formData.password.length > 0}
					helperText={formData.repeatPassword !== formData.password && 'Password does not match.'}
					required
				/>
				<TextField
					sx={style}
					label='Select gender'
					select
					value={formData.gender}
					color={formData.gender !== '' ? 'success' : undefined}
					focused={formData.gender !== ''}
					name='gender'
					onChange={handleChange}>
					<MenuItem value='Male'>Male</MenuItem>
					<MenuItem value='Female'>Female</MenuItem>
					<MenuItem value='Other'>Other</MenuItem>
				</TextField>
				<TextField
					sx={style}
					type='date'
					variant="outlined"
					name='birthDate'
					color={formData.userAdult ? 'success' : undefined}
					value={formData.birthDate}
					error={!formData.userAdult}
					focused={formData.birthDate !== ''}
					helperText={!formData.userAdult && 'You have to be atleast 18 years old'}
					onChange={handleChange}
				/>
			</form>
			<div><button onClick={submitForm}>Submit</button></div>
		</main>
	)
}
export default Form
