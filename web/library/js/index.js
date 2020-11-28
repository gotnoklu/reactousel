function createCarousel(
	carouselBox,
	carouselPrevControl,
	carouselNextControl,
	carouselSlides,
	carouselIndicatorsBox,
	config = { swipeable: false, carouselSwipeableBox: null, carouselSlideDelay: 0 }
) {
	const elemState = new State({
		carouselBox,
		carouselPrevControl,
		carouselNextControl,
		carouselSlides,
		carouselIndicatorsBox,
		carouselIndicators: Array.from(carouselIndicatorsBox.children),
		carouselSwipeableBox: config.carouselSwipeableBox
	})
	const configState = new State({
		slidesData: { offset: 0, counter: 0, delay: config.carouselSlideDelay }
	})
	const breakpointState = new State({
		xs: '(min-width: 0px) and (max-width: 600px)',
		sm: '(min-width: 601px) and (max-width: 900px)',
		md: '(min-width: 901px) and (max-width: 1024px)',
		lg: '(min-width: 1025px)'
	})

	function startCarousel() {
		const {
			carouselPrevControl,
			carouselNextControl,
			carouselBox,
			carouselSwipeableBox
		} = elemState.values
		const { slidesData } = configState.values

		// Set transition duration of slide
		carouselBox.style.transitionDuration = `${configState.values.delay || 0.3}s`

		// Bind event handlers to controls
		carouselPrevControl.addEventListener('click', handlePrevClick)
		carouselNextControl.addEventListener('click', handleNextClick)

		// Bind touch event handlers
		if (config.swipeable) {
			const { handleDragStart, handleDragMove, handleDragEnd } = handleSwipe()
			carouselSwipeableBox.addEventListener('touchstart', handleDragStart)
			carouselSwipeableBox.addEventListener('touchmove', handleDragMove)
			carouselSwipeableBox.addEventListener('touchend', handleDragEnd)
		}

		// Create indicators
		createIndicators()

		// Handle responsiveness
		handleResponsiveness()

		// Start slide translation
		handleSlideTranslation(slidesData.offset, slidesData.counter)
	}

	function handleResponsiveness() {
		function useMediaQuery(query, callback) {
			document.body.onload = () => {
				const matches = matchMedia(query).matches
				callback(query, matches)
			}
			matchMedia(query).onchange = () => {
				callback(query, matchMedia(query).matches)
			}
		}

		const { xs, sm, md, lg } = breakpointState.values
		let arrayOfArrays = []
		const dataArray = Array.from(elemState.values.carouselSlides)
		let dataArrayChildren = []
		let result = []

		dataArray.forEach((slide) => {
			if (slide.children.length > 1 && slide) {
				dataArrayChildren = dataArrayChildren.concat(Array.from(slide.children))
			}
		})

		function createSlide() {
			const slide = document.createElement('DIV')
			slide.classList.add('carousel-item')
			return slide
		}

		function splitData(screen) {
			Array.from(carouselBox.children).forEach((child) => {
				carouselBox.removeChild(child)
			})
			function split(chunk) {
				switch (screen) {
					case xs: {
						result = dataArrayChildren
						break
					}
					case md && sm: {
						let temp = []
						let counter = 0
						while (counter < dataArrayChildren.length) {
							temp.push(dataArrayChildren.slice(counter, counter + 3))
							arrayOfArrays = temp
							counter += chunk
							result = arrayOfArrays
						}
						break
					}
					default: {
						result = Array.from(elemState.initialState.carouselSlides)
						console.log({ result })
						break
					}
				}

				result.forEach((item) => {
					const slide = createSlide()
					console.log({ children: item.children, box: carouselBox.id })
					if (item.children) {
						Array.from(item.children).forEach((child) => {
							slide.appendChild(child)
						})
					}
					carouselBox.appendChild(slide)
				})

				elemState.setState({ carouselSlides: result })
				createIndicators()
				handleSlideTranslation(0, 0)
				console.log({ result }, carouselBox.children)
			}

			switch (screen) {
				case xs: {
					split()
					break
				}
				case sm: {
					split(2)
					break
				}
				case md: {
					split(3)
					break
				}
				default:
					split()
					break
			}
		}

		function getIsMatch(query, isMatch) {
			if (isMatch) {
				splitData(query)
			}
		}

		useMediaQuery(lg, getIsMatch)
		useMediaQuery(md, getIsMatch)
		useMediaQuery(sm, getIsMatch)
		useMediaQuery(xs, getIsMatch)
	}

	/* @function handleIndicatorClick
	 ** @param index: Number
	 ** Handles translation of carousel when an indicator is clicked
	 */
	function handleIndicatorClick(index) {
		handleSlideTranslation(index * -100, index)
	}

	/* @function createIndicators
	 ** @param indicatorsBox: Element
	 ** Create indicators for carousel
	 */
	function createIndicators() {
		const { carouselIndicatorsBox, carouselSlides } = elemState.values
		if (carouselIndicatorsBox) {
			Array.from(carouselIndicatorsBox.children).forEach((child) =>
				carouselIndicatorsBox.removeChild(child)
			)
		}

		let result = []
		carouselSlides.forEach((item, index) => {
			const indicator = document.createElement('i')
			indicator.classList.add('rounded')
			indicator.addEventListener('click', function () {
				handleIndicatorClick(index)
			})
			result.push(indicator)
		})
		elemState.setState({ carouselIndicators: result })
		elemState.values.carouselIndicators.forEach((indicator) =>
			carouselIndicatorsBox.appendChild(indicator)
		)
	}

	function handleSwipe() {
		const swipeState = new State({
			currentX: 0,
			initialX: 0,
			startX: 0,
			finalTranslateValue: 0,
			enableSwipe: config.swipeable,
			isSwipe: false,
			swipedToLeft: false,
			swipedToRight: false
		})

		const {
			carouselBox,
			carouselSlides,
			carouselPrevControl,
			carouselNextControl,
			carouselSwipeableBox
		} = elemState.values
		const { clientWidth } = carouselSwipeableBox

		function getLeftBreakpoint(element) {
			const getBounding = element.getBoundingClientRect()
			return getBounding.left
		}

		function translateToBreakpoints() {
			const { isSwipe, swipedToLeft, swipedToRight } = swipeState.values
			const expression = -(
				clientWidth * Math.ceil(Math.abs(getLeftBreakpoint(carouselBox)) / clientWidth)
			)
			if (isSwipe) {
				let result
				if (swipedToLeft) {
					result = expression
				} else if (swipedToRight) {
					result = expression + clientWidth
				}
				swipeState.setState({ finalTranslateValue: result })
				setTimeout(() => {
					const { finalTranslateValue } = swipeState.values
					handleSlideTranslation(
						(finalTranslateValue / clientWidth) * 100,
						Math.abs(finalTranslateValue / clientWidth)
					)
					configState.setState({
						slidesData: {
							offset: (finalTranslateValue / clientWidth) * 100,
							counter: Math.abs(finalTranslateValue / clientWidth)
						}
					})
				}, 500)
			}
		}

		function translateElementByPx(element, translateValue) {
			elemState.values.carouselBox.style.transform = `translateX(${translateValue}px)`
		}

		function handleDragStart(event = null) {
			let clientX = event.touches[0].clientX
			if (event.touches.length) {
				swipeState.setState({
					startX: clientX,
					initialX: clientX - getLeftBreakpoint(elemState.values.carouselBox)
				})
			}
		}

		function handleDragMove(event) {
			event.preventDefault()
			let clientX = event.changedTouches[0].clientX
			const { startX, enableSwipe } = swipeState.values
			if (startX > clientX) {
				// Left swipe
				// NOTE: X values decrease (approach 0)
				swipeState.setState({
					isSwipe: true,
					swipedToLeft: true,
					swipedToRight: false,
					enableSwipe: !(
						Math.abs(getLeftBreakpoint(carouselBox)) >=
						clientWidth * (carouselSlides.length - 1)
					)
				})
			} else if (startX < clientX) {
				// Right swipe
				// NOTE: X values increase (move away from 0)
				swipeState.setState({
					isSwipe: true,
					swipedToRight: true,
					swipedToLeft: false,
					enableSwipe: Math.abs(getLeftBreakpoint(carouselBox)) > 0
				})
			}
			if (enableSwipe) {
				if (event.touches.length) {
					swipeState.setState({
						currentX: clientX - swipeState.values.initialX
					})
					translateElementByPx(carouselBox, swipeState.values.currentX)
				}
			}
		}

		function handleDragEnd() {
			if (swipeState.values.enableSwipe) {
				translateToBreakpoints()
				swipeState.setState({ isSwipe: false })
			}
		}

		function disableSwipe() {
			swipeState.setState({ enableSwipe: false, isSwipe: false })
		}

		if ('ontouchstart' in carouselSwipeableBox) {
			carouselPrevControl.addEventListener('touchstart', function () {
				const touchHandler = function (event) {
					event.preventDefault()
					this.removeEventListener('touchend', touchHandler)
					disableSwipe()
					handlePrevClick(event)
				}
				this.addEventListener('touchend', touchHandler)
			})

			carouselNextControl.addEventListener('touchstart', function () {
				const touchHandler = function (event) {
					event.preventDefault()
					this.removeEventListener('touchend', touchHandler)
					disableSwipe()
					handleNextClick(event)
				}
				this.addEventListener('touchend', touchHandler)
			})
		}

		return { handleDragStart, handleDragMove, handleDragEnd }
	}

	/* @function handleSlideTranslation
	 ** @param offset: Number
	 ** @param counter: Number
	 ** Sets translation effects of control buttons, indicators and slides
	 */
	function handleSlideTranslation(offset, counter) {
		const {
			carouselSlides,
			carouselIndicators,
			carouselNextControl,
			carouselPrevControl,
			carouselBox
		} = elemState.values
		if (carouselSlides.length !== 1) {
			if (counter < carouselSlides.length - 1 && counter !== 0) {
				carouselPrevControl.style.transform = 'translateX(0px)'
				carouselNextControl.style.transform = 'translateX(0px)'
			} else if (counter === carouselSlides.length - 1) {
				carouselPrevControl.style.transform = 'translateX(0px)'
				carouselNextControl.style.transform = 'translateX(100%)'
			} else {
				carouselNextControl.style.transform = 'translateX(0px)'
				carouselPrevControl.style.transform = 'translateX(-100%)'
			}
		}
		if (carouselIndicators.length) {
			carouselIndicators.forEach((indicator) => {
				indicator.classList.remove('current')
			})
			carouselIndicators[counter].classList.add('current')
		}
		carouselBox.style.transform = `translateX(${offset}%)`
	}

	function handlePrevClick() {
		const { slidesData } = configState.values
		configState.setState({
			slidesData: {
				offset: slidesData.offset === 0 ? 0 : slidesData.offset + 100,
				counter: slidesData.counter <= 0 ? 0 : slidesData.counter - 1
			}
		})
		handleSlideTranslation(
			configState.values.slidesData.offset,
			configState.values.slidesData.counter
		)
	}

	function handleNextClick() {
		const { slidesData } = configState.values
		const { carouselSlides } = elemState.values
		const offset =
			slidesData.offset === (carouselSlides.length - 1) * -100
				? (carouselSlides.length - 1) * -100
				: slidesData.offset - 100
		const counter =
			slidesData.counter === carouselSlides.length - 1
				? carouselSlides.length - 1
				: slidesData.counter + 1

		configState.setState({ slidesData: { offset, counter } })
		handleSlideTranslation(
			configState.values.slidesData.offset,
			configState.values.slidesData.counter
		)
	}

	// Start the carousel
	startCarousel()
}
