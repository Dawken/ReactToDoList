import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useAppSelector} from '../../redux/store'

const PrivateRoutes = () => {

	const isLogged = useAppSelector(state => state.auth.isLoggedIn)

	return (
		isLogged ? <Outlet /> : <Navigate to='/login' />
	)
}

export default PrivateRoutes
