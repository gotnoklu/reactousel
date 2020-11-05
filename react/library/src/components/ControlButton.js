import React from 'react'
import PropTypes from 'prop-types'
import LeftIcon from './LeftIcon'
import ControlBox from './ControlBox'
import { makeStyles } from '../styles'

const useStyles = makeStyles((theme) => ({
	control: ({ customControl }) => ({
		cursor: 'pointer',
		width: customControl ? 'max-content' : '40px',
		height: customControl ? 'maax-content' : '40px',
		outline: 'none',
		border: 'none',
		position: 'relative',
		overflow: 'hidden',
		backgroundColor: theme.controls.colorPrimary,
		color: theme.controls.colorSecondary,
		transition: 'all 0.2s ease-in-out',
		transformOrigin: '0 100%'
	}),
	icon: {
		fill: theme.controls.colorSecondary
	},
	'@keyframes rippleEffect': {
		from: {
			transform: 'scale(1)',
			opacity: 0.4
		},
		to: {
			transform: 'scale(100)',
			opacity: 0
		}
	},
	ripple: {
		backgroundColor: theme.indicators.colorSecondary,
		position: 'absolute',
		width: '5px',
		height: '5px',
		opacity: 0,
		borderRadius: '50%',
		animation: '$rippleEffect 0.3s 1 ease-in-out'
	},
	circle: {
		borderRadius: '50%'
	}
}))

export default function ControlButton({
	id,
	controlsStyle,
	customControl,
	position,
	hideControl,
	handleClick,
	children
}) {
	const classes = useStyles({ customControl })

	const handleButtonClick = (event) => {
		const { currentTarget, clientX, clientY } = event
		const rippleElem = document.createElement('span')
		rippleElem.classList.add(classes.ripple)
		const clientRect = currentTarget.getBoundingClientRect()
		const Y = clientY - clientRect.top
		const X = clientX - clientRect.left
		rippleElem.style.top = `${Y}px`
		rippleElem.style.left = `${X}px`
		currentTarget.append(rippleElem)
		setTimeout(() => {
			currentTarget.removeChild(rippleElem)
		}, 300)
		handleClick()
	}

	const handleTouch = (event) => {
		const { currentTarget } = event
		const touchHandler = function (event) {
			event.preventDefault()
			this.removeEventListener('touchend', touchHandler)
			handleButtonClick(event)
		}
		currentTarget.addEventListener('touchend', touchHandler)
	}

	return (
		<ControlBox position={position} hideControl={hideControl}>
			<button
				id={id}
				className={`${classes.control} ${controlsStyle ? classes[controlsStyle] : ''}`}
				onClick={handleButtonClick}
				onTouchStart={handleTouch}
			>
				{children}
			</button>
		</ControlBox>
	)
}

ControlButton.propTypes = {
	id: PropTypes.string.isRequired,
	customControl: PropTypes.node,
	controlsStyle: PropTypes.oneOf(['circle']),
	position: PropTypes.oneOf(['left', 'right']),
	hideControl: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
}
