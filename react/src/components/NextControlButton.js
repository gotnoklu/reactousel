import React from 'react'
import PropTypes from 'prop-types'
import RightIcon from './RightIcon'
import ControlButton from './ControlButton'
import { makeStyles } from '../styles'

const useStyles = makeStyles((theme) => ({
	icon: {
		fill: theme.controls.colorSecondary
	}
}))

export default function NextControlButton({
	id,
	controlsNext,
	controlsStyle,
	hideControl,
	handleClick
}) {
	const classes = useStyles()

	return (
		<ControlButton
			id={id}
			position='right'
			customControl={controlsNext}
			controlsStyle={controlsStyle}
			handleClick={handleClick}
			hideControl={hideControl}
		>
			{controlsNext || <RightIcon className={classes.icon} />}
		</ControlButton>
	)
}

NextControlButton.propTypes = {
	id: PropTypes.string.isRequired,
	controlsPrevious: PropTypes.node,
	controlsStyle: PropTypes.oneOf(['circle']),
	hideControl: PropTypes.bool,
	handleClick: PropTypes.func.isRequired
}
