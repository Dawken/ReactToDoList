import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useAppSelector} from '../../redux/store'

const PrivateRoutes = () => {

	const responseCode = useAppSelector(state => state.auth.clientResponse)
	const auth = responseCode !== 401

	return (
		auth ? <Outlet /> : <Navigate to='/login' />
	)
}
export default PrivateRoutes
