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

export default function LeftIcon({ className }) {
	const classes = useStyles()
	return (
		<svg width='100%' height='100%' viewBox='0 0 40.0 40.0' id='SVGRoot' className={classes.svg}>
			<path
				d='m 25.65625,5.7578125 -11.3125,11.3124995 -2.828125,2.830079 2.828125,2.828125 11.3125,11.3125 2.828125,-2.828125 -11.3125,-11.314453 11.3125,-11.3125005 z'
				className={className}
			/>
		</svg>
	)
}

LeftIcon.propTypes = {
	className: PropTypes.string.isRequired
}
