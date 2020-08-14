/*
 ** @author Enoch Klu.
 ** Reactousel JS v1.0.0 – (Copyright 2020 - present)
 ** Reactousel JS simplifies the creation of sliding carousels.
 ** License: MIT
 */

/* @function createCarousel
 ** @param box: HTMLElement
 ** @param controlsPrev: HTMLElement
 ** @param controlsNext: HTMLElement
 ** @param slides: {Array | Nodelist | HTML Collection}
 ** @param config: Object
 ** Takes carousel elements as inputs and handles animation
 */
function createCarousel(
	box = Element,
	controlsPrev = Element,
	controlsNext = Element,
	slides = [],
	indicatorsBox = Element,
	config = { swipeable: false, swipeableBox: Element, delay: 0 }
) {
	// Carousel properties
	let carousel = {
		state: { slidesData: { offset: 0, counter: 0 } },
		elems: {
			box: null,
			controlsPrev: null,
			controlsNext: null,
			slides: [],
			indicatorsBox: null,
			swipeableBox: null
		},
		enableSwipe: config.swipeable
	}

	let { state, elems, enableSwipe } = carousel
	const { slidesData } = state

	function makeSwipeable(element = Element, parent = Element) {
		let currentX = 0
		let initialX = 0
		let startX = 0
		let finalTranslateValue = 0
		let isSwipe = false
		let swipedToLeft = false
		let swipedToRight = false
		const { clientWidth } = parent

		function getBreakpoint(element) {
			const getBounding = element.getBoundingClientRect()
			return { left: getBounding.left, right: getBounding.right }
		}

		function translateToBreakpoints() {
			const expression = -(
				clientWidth * Math.ceil(Math.abs(getBreakpoint(element).left) / clientWidth)
			)
			if (isSwipe) {
				if (swipedToLeft) {
					finalTranslateValue = expression
				} else if (swipedToRight) {
					finalTranslateValue = expression + clientWidth
				}
				console.log({ finalTranslateValue })
				setTimeout(() => {
					computeTranslation(
						(finalTranslateValue / clientWidth) * 100,
						Math.abs(finalTranslateValue / clientWidth)
					)
					slidesData.offset = (finalTranslateValue / clientWidth) * 100
					slidesData.counter = Math.abs(finalTranslateValue / clientWidth)
				}, 1000)
			}
		}

		function translateElementByPx(element, translateValue) {
			elems.box.style.transform = `translateX(${translateValue}px)`
		}

		function handleDragStart(event = null) {
			let clientX = event.touches[0].clientX
			if (event.touches.length) {
				startX = clientX
				initialX = clientX - getBreakpoint(element).left
			}
		}

		function handleDragMove(event = null) {
			event.preventDefault()
			let clientX = event.changedTouches[0].clientX
			if (startX > clientX) {
				// Left swipe
				// NOTE: X values decrease (approach 0)
				isSwipe = true
				swipedToLeft = true
				swipedToRight = false
				enableSwipe = !(
					Math.abs(getBreakpoint(element).left) >=
					clientWidth * (elems.slides.length - 1)
				)
			} else if (startX < clientX) {
				// Right swipe
				// NOTE: X values increase (move away from 0)
				isSwipe = true
				swipedToRight = true
				swipedToLeft = false
				enableSwipe = Math.abs(getBreakpoint(element).left) > 0
			}
			if (enableSwipe) {
				if (event.touches.length) {
					currentX = clientX - initialX
					console.log({ initialX, currentX })
					translateElementByPx(element, currentX)
				}
			}
		}

		function handleDragEnd() {
			if (enableSwipe) {
				translateToBreakpoints()
				isSwipe = false
			}
		}

		parent.addEventListener('touchstart', handleDragStart)
		parent.addEventListener('touchmove', handleDragMove)
		parent.addEventListener('touchend', handleDragEnd)

		if ('ontouchstart' in elems.swipeableBox) {
			elems.controlsPrev.addEventListener('touchstart', function() {
				const touchHandler = function(event) {
					event.preventDefault()
					this.removeEventListener('touchend', touchHandler)
					enableSwipe = false
					isSwipe = false
					handlePrevClick(event)
				}
				this.addEventListener('touchend', touchHandler)
			})

			elems.controlsNext.addEventListener('touchstart', function() {
				const touchHandler = function(event) {
					event.preventDefault()
					this.removeEventListener('touchend', touchHandler)
					enableSwipe = false
					isSwipe = false
					handleNextClick(event)
				}
				this.addEventListener('touchend', touchHandler)
			})
		}
	}

	/* @function computeTranslation
	 ** @param offset: Number
	 ** @param counter: Number
	 ** Sets translation effects of control buttons, indicators and slides
	 */
	function computeTranslation(offset, counter) {
		if (slides.length !== 1) {
			if (counter < slides.length - 1 && counter !== 0) {
				elems.controlsPrev.style.transform = 'translateX(0px)'
				elems.controlsNext.style.transform = 'translateX(0px)'
			} else if (counter === slides.length - 1) {
				elems.controlsPrev.style.transform = 'translateX(0px)'
				elems.controlsNext.style.transform = 'translateX(100%)'
			} else {
				elems.controlsNext.style.transform = 'translateX(0px)'
				elems.controlsPrev.style.transform = 'translateX(-100%)'
			}
		}
		if (elems.indicatorsBox) {
			elems.indicatorsBox.childNodes.forEach((indicator) => {
				indicator.classList.remove('current')
				indicator.style.backgroundColor = ''
			})
			elems.indicatorsBox.childNodes[counter].classList.add('current')
		}
		elems.box.style.transform = `translateX(${offset}%)`
	}

	/* @function handleIndicatorClick
	 ** @param index: Number
	 ** Handles translation of carousel when an indicator is clicked
	 */
	function handleIndicatorClick(index) {
		computeTranslation(slidesData.offset + index * -100, index)
	}

	/* @function createIndicators
	 ** @param indicatorsBox: Element
	 ** Create indicators for carousel
	 */
	function createIndicators(indicatorsBox) {
		const temp = Array.isArray(slides) ? slides : Array.from(slides)
		temp.forEach((item, index) => {
			const indicator = document.createElement('i')
			indicator.classList.add('rounded')
			indicator.addEventListener('click', function() {
				handleIndicatorClick(index)
			})
			indicatorsBox.append(indicator)
		})
	}

	// Set state values of carousel
	function initCarousel() {
		elems.box = box
		elems.controlsPrev = controlsPrev
		elems.controlsNext = controlsNext
		elems.slides = slides
		elems.indicatorsBox = indicatorsBox
		elems.swipeableBox = config.swipeableBox
		elems.box.style.transitionDuration = `${config.delay || 0.3}s`
		if (enableSwipe) {
			makeSwipeable(elems.box, elems.swipeableBox)
		}
		createIndicators(elems.indicatorsBox)
		computeTranslation(slidesData.offset, slidesData.counter)
	}

	// Ripple effect for button
	function createRippleEffect(event) {
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
	}

	// Handle previous slide control button onclick event
	function handlePrevClick(event) {
		createRippleEffect(event)
		slidesData.offset = slidesData.offset === 0 ? 0 : slidesData.offset + 100
		slidesData.counter = slidesData.counter <= 0 ? 0 : slidesData.counter - 1
		computeTranslation(slidesData.offset, slidesData.counter)
	}

	// Handle next slide control button onclick event
	function handleNextClick(event) {
		createRippleEffect(event)
		slidesData.offset =
			slidesData.offset === (slides.length - 1) * -100
				? (slides.length - 1) * -100
				: slidesData.offset - 100
		slidesData.counter =
			slidesData.counter === slides.length - 1 ? slides.length - 1 : slidesData.counter + 1
		computeTranslation(slidesData.offset, slidesData.counter)
	}

	initCarousel()

	// Bind event listeners to controls when clicked
	elems.controlsPrev.addEventListener('click', handlePrevClick)
	elems.controlsNext.addEventListener('click', handleNextClick)
}
