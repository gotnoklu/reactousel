function makeSwipeable(element = HTMLElement, parent = HTMLElement) {
	let active = false
	let currentX = 0
	let initialX = 0
	let startX = 0
	let xOffset = 0
	let leftEdge = 0
	let swipedToLeft = false
	let swipedToRight = false
	const { clientWidth } = parent

	function translateElement(element, x) {
		element.style.transform = `translateX(${x}px)`
	}

	function getLeftBreakpoint(element) {
		const getBounding = element.getBoundingClientRect()
		const { left } = getBounding
		return left
	}

	function translateToBreakpoints(element) {
		let finalTranslateValue = 0
		const expression = -(clientWidth * Math.ceil(Math.abs(leftEdge) / clientWidth))
		if (swipedToLeft) {
			finalTranslateValue = expression
		} else if (swipedToRight) {
			finalTranslateValue = expression + clientWidth
		}
		setTimeout(() => {
			translateElement(element, finalTranslateValue)
		}, 1500)
	}

	function handleDragStart(event = null) {
		const { type } = event
		event.preventDefault()
		if (type === 'touchstart') {
			startX = event.touches[0].clientX
			initialX = event.touches[0].clientX - xOffset
		} else {
			startX = event.clientX
			initialX = event.clientX - xOffset
		}
		active = true
	}

	function handleDragMove(event = null) {
		const { type } = event
		if (active) {
			event.preventDefault()
			if (type === 'touchmove') {
				currentX = event.touches[0].clientX - initialX
			} else {
				currentX = event.clientX - initialX
			}
			xOffset = currentX
			translateElement(element, currentX)
			leftEdge = getLeftBreakpoint(element)
		}
	}

	function handleDragEnd(event = null) {
		event.preventDefault()
		const { type } = event
		let clientX = 0
		if (type === 'touchmove') {
			clientX = event.touches[0].clientX
		} else {
			clientX = event.clientX
		}
		if (startX > clientX) {
			swipedToLeft = true
			swipedToRight = false
		} else if (startX < clientX) {
			swipedToRight = true
			swipedToLeft = false
		}
		initialX = currentX
		active = false
		translateToBreakpoints(element)
	}

	parent.addEventListener('touchstart', handleDragStart, false)
	parent.addEventListener('touchmove', handleDragMove, false)
	parent.addEventListener('touchend', handleDragEnd, false)

	parent.addEventListener('mousedown', handleDragStart, false)
	parent.addEventListener('mousemove', handleDragMove, false)
	parent.addEventListener('mouseup', handleDragEnd, false)
}
