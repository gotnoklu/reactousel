import React from 'react'
export default function useSwipe({ carousel, slidebox, slidesNumber, translateFn }) {
	const [xValues, setXValues] = React.useState({
		startX: 0,
		initialX: 0
	})
	const [boolValues, setBoolValues] = React.useState({
		isSwipe: false,
		isSwipedToLeft: false,
		isSwipedToRight: false,
		enableSwipe: false
	})

	const getBreakpoint = (element) => {
		const getBounding = element.getBoundingClientRect()
		return { left: getBounding.left, right: getBounding.right }
	}

	const translateElementByPx = (element, translateValue) => {
		element.style.transform = `translateX(${translateValue}px)`
	}

	const translateToBreakpoints = () => {
		const { isSwipe, isSwipedToLeft, isSwipedToRight } = boolValues
		let finalTranslateValue = 0
		const expression = -(
			carousel.clientWidth *
			Math.ceil(Math.abs(getBreakpoint(slidebox).left) / carousel.clientWidth)
		)
		if (isSwipe) {
			if (isSwipedToLeft) {
				finalTranslateValue = expression
			} else if (isSwipedToRight) {
				finalTranslateValue = expression + carousel.clientWidth
			}
			setTimeout(() => {
				translateFn(
					(finalTranslateValue / carousel.clientWidth) * 100,
					Math.abs(finalTranslateValue / carousel.clientWidth)
				)
			}, 700)
		}
	}

	const handleTouchStart = (event) => {
		const { clientX } = event.touches[0]
		if (event.touches.length) {
			setXValues({
				...xValues,
				startX: clientX,
				initialX: clientX - getBreakpoint(slidebox).left
			})
		}
	}
	const handleTouchMove = (event) => {
		const { startX } = xValues
		const { enableSwipe } = boolValues
		const { clientX } = event.changedTouches[0]
		if (startX > clientX) {
			// Left swipe
			// NOTE: X values decrease (approach 0)
			setBoolValues({
				...boolValues,
				isSwipe: true,
				isSwipedToLeft: true,
				isSwipedToRight: false,
				enableSwipe: !(
					Math.abs(getBreakpoint(slidebox).left) >=
					carousel.clientWidth * (slidesNumber - 1)
				)
			})
		} else if (startX < clientX) {
			// Right swipe
			// NOTE: X values increase (move away from 0)
			setBoolValues({
				...boolValues,
				isSwipe: true,
				isSwipedToLeft: false,
				isSwipedToRight: true,
				enableSwipe: Math.abs(getBreakpoint(slidebox).left) > 0
			})
		}
		if (enableSwipe) {
			if (event.changedTouches.length) {
				translateElementByPx(slidebox, clientX - xValues.initialX)
			}
		}
	}

	const handleTouchEnd = () => {
		const { enableSwipe, isSwipe } = boolValues
		if (enableSwipe && isSwipe) {
			translateToBreakpoints()
		}
	}

	return {
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		setEnableSwipe: (bool) => setBoolValues({ ...boolValues, enableSwipe: bool }),
		setIsSwipe: (bool) => setBoolValues({ ...boolValues, isSwipe: bool })
	}
}
