import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import FirstVisitAnimation from '../animations/firstVisitAnimation/firstVisitAnimation'

const PrivateRoutes = () => {
	const isLogged = useAppSelector((state) => state.auth.isLoggedIn)

	return isLogged ? <Outlet /> : <FirstVisitAnimation />
}

export default PrivateRoutes
