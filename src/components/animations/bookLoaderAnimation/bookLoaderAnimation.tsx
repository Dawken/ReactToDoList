import React from 'react'
import styles from './bookLoaderAnimation.module.scss'

const BookLoaderAnimation = () => {
	return (
		<div className={styles.bookContainer}>
			<div className={styles.book}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}
export default BookLoaderAnimation
