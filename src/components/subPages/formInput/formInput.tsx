import {TextField, TextFieldProps} from '@mui/material'
import React, {FC} from 'react'
import {Controller, useFormContext, get} from 'react-hook-form'

type IFormInputProps = {
	name: string
} & TextFieldProps

const style = {
	width: 300,
	marginTop: '40px'
}

const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }) => {

	const {
		control,
		formState: {errors},
	} = useFormContext()

	const error = get(errors, name)


	return (
		<Controller
			control={control}
			name={name}
			render={({field}) => (
				<TextField
					{...otherProps}
					{...field}
					value={field.value ?? otherProps.value ?? ''}
					error={!!errors[name]}
					style={style}
					helperText={error ? error.message : ''}
				/>
			)}
		/>
	)
}
export default FormInput

