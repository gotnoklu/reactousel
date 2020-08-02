import React from 'react'

export default function useSwipe({ carouselId, slideboxId, slides, translateFunction }) {
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
		const carousel = document.querySelector(carouselId)
		const slidebox = document.querySelector(slideboxId)
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
				clientWidth * Math.ceil(Math.abs(getBreakpoint(slidebox).left) / clientWidth)
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
			element.style.transform = `translateX(${translateValue}px)`
		}

		const handleDragStart = (event = null) => {
			const { clientX } = event.touches[0]
			if (event.touches.length) {
				setXValues({
					...xValues,
					startX: clientX,
					initialX: clientX - getBreakpoint(slidebox).left
				})
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
						Math.abs(getBreakpoint(slidebox).left) >=
						clientWidth * (slides - 1)
					)
				})
			} else if (startX < clientX) {
				// Right swipe
				// NOTE: X values increase (move away from 0)
				setBoolValues({
					isSwipe: true,
					isSwipedToLeft: false,
					isSwipedToRight: true,
					enableSwipe: Math.abs(getBreakpoint(slidebox).left) > 0
				})
			}
			if (enableSwipe) {
				if (event.touches.length) {
					setXValues({ ...xValues, currentX: clientX - initialX })
					translateElementByPx(slidebox, currentX)
				}
			}
		}

		const handleDragEnd = () => {
			if (enableSwipe) {
				translateToBreakpoints()
				setBoolValues({ ...boolValues, isSwipe: false })
			}
		}

		carousel.onTouchStart = handleDragStart
		carousel.onTouchMove = handleDragMove
		carousel.onTouchEnd = handleDragEnd
	}, [])

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
