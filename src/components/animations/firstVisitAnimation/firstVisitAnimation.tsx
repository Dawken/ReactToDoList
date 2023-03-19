import React, { useEffect } from 'react'
import styles from './firstVisitAnimation.module.scss'
import { useNavigate } from 'react-router-dom'

const FirstVisitAnimation = () => {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate('/login')
		}, 3000)
	}, [])
	return (
		<div className={styles.buildingBlocksContainer}>
			<div className={styles.buildingBlocks}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default FirstVisitAnimation
