import React from 'react'

export default function useSwipe({ carousel, slideBox, translateFunction }) {
	const [xValues, setXValues] = React.useState({
		startX: 0,
		initialX: 0,
		currentX: 0
	})
	const [boolValues, setBoolValues] = React.useState({
		isSwipe: false,
		isSwipedToLeft: false,
		isSwipedToRight: false,
		enableSwipe: false
	})

	React.useEffect(() => {
		const { startX, initialX, currentX } = xValues
		const { isSwipe, isSwipedToLeft, isSwipedToRight, enableSwipe } = boolValues
		const { clientWidth } = parent

		const getBreakpoint = (element) => {
			const getBounding = element.getBoundingClientRect()
			return { left: getBounding.left, right: getBounding.right }
		}

		const translateToBreakpoints = () => {
			let finalTranslateValue = 0
			const expression = -(
				clientWidth * Math.ceil(Math.abs(getBreakpoint(element).left) / clientWidth)
			)
			if (isSwipe) {
				if (isSwipedToLeft) {
					finalTranslateValue = expression
				} else if (isSwipedToRight) {
					finalTranslateValue = expression + clientWidth
				}
				// offset = (finalTranslateValue / clientWidth) * 100
				// 	counter = Math.abs(finalTranslateValue / clientWidth)
				setTimeout(() => {
					translateFunction(
						(finalTranslateValue / clientWidth) * 100,
						Math.abs(finalTranslateValue / clientWidth)
					)
				}, 1000)
			}
		}

		const translateElementByPx = (element, translateValue) => {
			elems.box.style.transform = `translateX(${translateValue}px)`
		}

		const handleDragStart = (event = null) => {
			let clientX = event.touches[0].clientX
			if (event.touches.length) {
				startX = clientX
				initialX = clientX - getBreakpoint(element).left
			}
			console.log('drag start')
		}

		const handleDragMove = (event = null) => {
			event.preventDefault()
			let clientX = event.changedTouches[0].clientX
			if (startX > clientX) {
				// Left swipe
				// NOTE: X values decrease (approach 0)
				setBoolValues({
					isSwipe: true,
					isSwipedToLeft: true,
					isSwipedToRight: false,
					enableSwipe: !(
						Math.abs(getBreakpoint(element).left) >=
						clientWidth * (elems.slides.length - 1)
					)
				})
			} else if (startX < clientX) {
				// Right swipe
				// NOTE: X values increase (move away from 0)
				setBoolValues({
					isSwipe: true,
					isSwipedToLeft: false,
					isSwipedToRight: true,
					enableSwipe: Math.abs(getBreakpoint(element).left) > 0
				})
			}
			if (enableSwipe) {
				if (event.touches.length) {
					currentX = clientX - initialX
					translateElementByPx(slideBox, currentX)
				}
			}
		}

		const handleDragEnd = () => {
			if (enableSwipe) {
				translateToBreakpoints()
				isSwipe = false
			}
		}

		carousel.addEventListener('touchstart', handleDragStart)
		carousel.addEventListener('touchmove', handleDragMove)
		carousel.addEventListener('touchend', handleDragEnd)
	}, [carousel, slideBox, xValues, boolValues])

	// if ('ontouchstart' in elems.swipeableBox) {
	// 	elems.controlsPrev.addEventListener('touchstart', function() {
	// 		const touchHandler = function(event) {
	// 			event.preventDefault()
	// 			this.removeEventListener('touchend', touchHandler)
	// 			enableSwipe = false
	// 			isSwipe = false
	// 			handlePrevClick(event)
	// 		}
	// 		this.addEventListener('touchend', touchHandler)
	// 	})

	// 	elems.controlsNext.addEventListener('touchstart', function() {
	// 		const touchHandler = function(event) {
	// 			event.preventDefault()
	// 			this.removeEventListener('touchend', touchHandler)
	// 			enableSwipe = false
	// 			isSwipe = false
	// 			handleNextClick(event)
	// 		}
	// 		this.addEventListener('touchend', touchHandler)
	// 	})
	// }
}
