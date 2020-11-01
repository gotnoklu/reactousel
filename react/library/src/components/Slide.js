import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '../styles'

const useStyles = makeStyles({
	slide: {
		minWidth: '100%',
		height: '100%',
		display: 'flex'
	}
})

export default function Slide({ children }) {
	const classes = useStyles()
	return <div className={classes.slide}>{children}</div>
}

Slide.propTypes = {
	children: PropTypes.node.isRequired
}
