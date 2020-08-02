import React from 'react'
import PropTypes from 'prop-types'
import LeftIcon from './LeftIcon'

export default function PrevControlButton({
	id = '',
	color = {},
	controlsPrevious,
	controlsStyle,
	hideControl = false,

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
		currentTarget.append(rippleElem)
		setTimeout(() => {
			currentTarget.removeChild(rippleElem)
		}, 700)
		handleClick()
	}
	const handleTouch = (event) => {
		const { target } = event
		const touchHandler = function() {
			event.preventDefault()
			this.removeEventListener('touchend', touchHandler)
			enableSwipe = false
			isSwipe = false
			handlePrevClick(event)
		}
		target.addEventListener('touchend', touchHandler)
	}
	return (
		<div className={'carousel_control_box prev'}>
			<button
				id={id}
				className={`
                   ${
						controlsPrevious ? 'carousel_control_custom' : 'carousel_control'
					} prev ${`style_${controlsStyle}` || 'style_default'}
                } ${hideControl ? 'no_display' : ''}
                `}
				style={{ backgroundColor: color.main || '' }}
				onClick={handleButtonClick}
				onTouchStart={handleTouch}
			>
				{controlsPrevious || <LeftIcon color={color.contrast} />}
			</button>
		</div>
	)
}

PrevControlButton.propTypes = {
	id: PropTypes.string.isRequired,
	color: PropTypes.object,
	controlsPrevious: PropTypes.node,
	controlsStyle: PropTypes.oneOf(['circle', 'box', 'transparent', 'default']),
	hideControl: PropTypes.bool,
	styles: PropTypes.object,
	handleClick: PropTypes.func.isRequired
}
