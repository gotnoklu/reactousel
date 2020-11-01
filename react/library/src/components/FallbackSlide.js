import React from 'react'
import Slide from './Slide'
import { makeStyles } from '../styles'

const useStyles = makeStyles({
	fallbackSlide: {
		width: '100%',
		backgroundColor: 'grey',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	}
})

function FallbackSlide() {
	const classes = useStyles()
	return (
		<Slide>
			<div className={classes.fallbackSlide}>Use a {'<Slide>'} component instead.</div>
		</Slide>
	)
}

export default FallbackSlide
