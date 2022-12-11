import React from 'react'
import {MenuItem, TextField} from '@mui/material'
import './form.scss'
import useForm from './useForm'

const style = {
	width: 300,
	marginTop: '30px'
}

const Form = () => {

	const {
		formData,
		handleChange,
		submitForm,
		formValid,
		yikes
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
					error={formData.login === '' ? !yikes.login : !formValid.login}
					focused={formData.login.length > 0}
					helperText={formData.login.length > 16 ? 'Login cannot be longer than 16 symbols' : 'Login must be at least 3 symbols long.' }
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
					error={formData.name === '' ? !yikes.name : !formValid.name}
					focused={formData.name.length > 0}
					helperText={formData.name.length < 3 && 'User name must be at least 3 symbols long.'}
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
					error={formData.lastName === '' ? !yikes.lastName : !formValid.lastName}
					helperText={formData.name.length < 3 && 'User name must be at least 3 symbols long.'}
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
					color={/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(formData.password)
						? 'success' : undefined}
					error={formData.password === '' ? !yikes.password : !formValid.password}
					focused={formData.password.length > 0}
					helperText={(formData.password.length > 0 &&
						(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(formData.password)))
							&& 'Password need to has at least 1 Capital letter, 1 special symbol, 1 number and be 8 symbols long'}
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
					error={formData.repeatPassword === '' ? !yikes.repeatPassword : !formValid.repeatPassword}
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
					error={formData.birthDate === '' ? !yikes.birthDate : !formData.birthDate}
					focused={formData.birthDate !== ''}
					helperText={!formData.userAdult && formData.birthDate !== '' && 'You have to be at least 18 years old'}
					onChange={handleChange}
				/>
			</form>
			<div><button onClick={submitForm}>Submit</button></div>
		</main>
	)
}
export default Form
