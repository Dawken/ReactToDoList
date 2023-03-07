import { createTheme } from '@mui/material/styles'

const purpleTheme = createTheme({
	palette: {
		primary: {
			main: '#5500ff',
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: '#FFFFFF',
				},
			},
		},
	},
})
const pinkTheme = createTheme({
	palette: {
		primary: {
			main: '#bf00ff',
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: '#FFFFFF',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				icon: {
					color: '#FFFFFF',
				},
			},
		},
	},
})
const redTheme = createTheme({
	palette: {
		primary: {
			main: '#ff0000',
		},
	},
})
const greenTheme = createTheme({
	palette: {
		primary: {
			main: '#00ff13',
		},
	},
})
export { purpleTheme, redTheme, greenTheme, pinkTheme }
