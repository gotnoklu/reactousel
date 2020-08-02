import React from 'react'
import PropTypes from 'prop-types'
import RightIcon from './RightIcon'

export default function NextControlButton({
	id = '',
	color = {},
	controlsNext,
	controlsStyle,
	hideControl = false,
	styles,
	handleClick
}) {
	const handleButtonClick = (event) => {
		const { currentTarget, clientX, clientY } = event
		const rippleElem = document.createElement('span')
		rippleElem.classList.add('ripple')
		const clientRect = currentTarget.getBoundingClientRect()
		const Y = clientY - clientRect.top
		const X = clientX - clientRect.left
		rippleElem.style.top = `${Y}px`
		rippleElem.style.left = `${X}px`
		currentTarget.appendChild(rippleElem)
		setTimeout(() => {
			currentTarget.removeChild(rippleElem)
		}, 700)
		handleClick()
	}
	const handleTouch = (event) => {
		const { currentTarget } = event
		const touchHandler = function(event) {
			event.preventDefault()
			this.removeEventListener('touchend', touchHandler)
			// enableSwipe = false
			// isSwipe = false
			handleButtonClick(event)
		}
		currentTarget.addEventListener('touchend', touchHandler)
	}
	return (
		<div className={'carousel_control_box next'}>
			<button
				id={id}
				className={`${
					controlsNext ? 'carousel_control_custom' : 'carousel_control'
				} next ${`style_${controlsStyle}` || 'style_default'} ${
					hideControl ? 'no_display' : ''
				}`}
				style={{ backgroundColor: color.main || '' }}
				onClick={handleButtonClick}
				onTouchStart={handleTouch}
			>
				{controlsNext || <RightIcon color={color.contrast} />}
			</button>
		</div>
	)
}

NextControlButton.propTypes = {
	id: PropTypes.string.isRequired,
	color: PropTypes.object,
	controlsPrevious: PropTypes.node,
	controlsStyle: PropTypes.oneOf(['circle', 'box', 'transparent', 'default']),
	hideControl: PropTypes.bool,
	styles: PropTypes.object,
	handleClick: PropTypes.func.isRequired
}
