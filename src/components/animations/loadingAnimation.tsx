import React from 'react'
import styles from './loadingAnimation.module.scss'

const LoadingAnimation = () => {
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

export default LoadingAnimation
