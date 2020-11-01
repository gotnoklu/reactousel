import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '../styles'

const useStyles = makeStyles({
	svg: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default function RightIcon({ className }) {
	const classes = useStyles()
	return (
		<svg width='100%' height='100%' viewBox='0 0 40.0 40.0' id='SVGRoot' className={classes.svg}>
			<path
				d='M 14.34375,5.8574219 11.515625,8.6855469 22.828125,20 11.515625,31.314453 14.34375,34.142578 25.65625,22.828125 28.484375,20 25.65625,17.171875 Z'
				className={className}
			/>
		</svg>
	)
}

RightIcon.propTypes = {
	className: PropTypes.string.isRequired
}
