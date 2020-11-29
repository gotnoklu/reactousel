/**
 *
 * @param {HTMLElement} carouselBox The carousel box with slides
 * @param {HTMLElement} carouselPrevControl The button to show previous slides
 * @param {HTMLElement} carouselNextControl The button to show next slides
 * @param {HTMLNodeList} carouselSlides A list of slides in the carousel box
 * @param {HTMLElement} carouselIndicatorsBox The box where indicators would be rendered
 * @param {Object} config An object containing options for the carousel
 */
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
		const breakpointState = new State({
			xs: '(min-width: 0px) and (max-width: 600px)',
			sm: '(min-width: 601px) and (max-width: 900px)',
			md: '(min-width: 901px) and (max-width: 1024px)',
			lg: '(min-width: 1025px)'
		})
		const screenSlideState = new State({})

		function useMediaQuery(query, callback) {
			const media = matchMedia(query)
			if (media.matches) {
				callback(query, media.matches)
			}
			media.onchange = () => {
				callback(query, matchMedia(query).matches)
			}
		}

		function createChildrenArray(data) {
			let result = []
			if (data.length) {
				data.forEach((elem) => {
					result = result.concat(Array.from(elem.children))
				})
			} else {
				result.push(data)
			}
			return result
		}

		const { xs, sm, md, lg } = breakpointState.values
		const dataArray = Array.from(elemState.values.carouselSlides)
		const childrenArray = createChildrenArray(dataArray)

		function handleDataSplit(data) {
			var factor = Math.round(data.length / 2)
			var result = []
			var temp = []
			var first = 0
			var second = 1
			var counter = 0
			while (counter < factor) {
				temp.push(data[first], data[second])
				result.push(temp)
				temp = []
				counter += 1
				first = second + 1
				second = first + 1
			}
			return result
		}

		function handleCreateSlidesOnLg() {
			const { initialState } = elemState
			const slides = Array.from(initialState.carouselSlides)
			return slides.map(function (slide) {
				return Array.from(slide.children)
			})
		}

		if (childrenArray.length) {
			screenSlideState.setState({
				xsSlides: childrenArray,
				smSlides: childrenArray,
				mdSlides: handleDataSplit(childrenArray),
				lgSlides: handleCreateSlidesOnLg()
			})
		}

		function handleIsMatch(query, isMatch) {
			const { xsSlides, smSlides, mdSlides, lgSlides } = screenSlideState.values

			function createSlide() {
				const slide = document.createElement('div')
				slide.classList.add('carousel-item')
				return slide
			}

			function handleAppendSlides(data) {
				if (Array.isArray(data)) {
					elemState.setState({ carouselSlides: data })
					data.forEach((entry) => {
						const slide = createSlide()
						if (Array.isArray(entry)) {
							entry.forEach((elem) => {
								if (elem) {
									slide.appendChild(elem)
									carouselBox.appendChild(slide)
								}
							})
						} else {
							slide.appendChild(entry)
							carouselBox.appendChild(slide)
						}
					})
					createIndicators()
					configState.setState({ slidesData: { offset: 0, counter: 0 } })
					handleSlideTranslation(0, 0)
				}
			}

			if (isMatch) {
				if (childrenArray.length) {
					Array.from(carouselBox.children).forEach((child) => {
						carouselBox.removeChild(child)
					})
					switch (query) {
						case xs: {
							return handleAppendSlides(xsSlides)
						}
						case sm: {
							return handleAppendSlides(smSlides)
						}
						case md: {
							return handleAppendSlides(mdSlides)
						}
						default:
							return handleAppendSlides(lgSlides)
					}
				}
			}
		}

		const queries = [xs, sm, md, lg]
		queries.forEach(function (query) {
			return useMediaQuery(query, handleIsMatch)
		})
	}

	function handleIndicatorClick(index) {
		handleSlideTranslation(index * -100, index)
	}

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
