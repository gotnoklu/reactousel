import React from 'react'
import PropTypes from 'prop-types'
import PrevControlButton from './PrevControlButton'
import NextControlButton from './NextControlButton'
import Indicators from './Indicators'
import Slide from './Slide'
import FallbackSlide from './FallbackSlide'
import useSwipe from '../hooks/useSwipe'

function Carousel({
	name,
	primaryColor = {},
	secondaryColor = {},
	controlsStyle,
	controlsPrevious,
	controlsNext,
	noIndicators = false,
	noControls = false,
	indicatorsStyle,
	delay,
	spacing,
	height,
	swipeable = false,
	children
}) {
	const [ids, setIds] = React.useState({
		carousel: `#${name}-carousel`,
		slidebox: `#${name}-slidebox`,
		indicatorsBox: `#${name}-indicators`,
		prevControl: `#${name}-carousel-prev-control`,
		nextControl: `#${name}-carousel-next-control`
	})
	const [elems, setElems] = React.useState({
		carousel: null,
		slidebox: null,
		indicatorsBox: null,
		prevControl: null,
		nextControl: null
	})
	const [values, setValues] = React.useState({
		slidesData: { offset: 0, counter: 0 },
		slides: 0
	})

	React.useEffect(() => {
		const carousel = document.querySelector(ids.carousel)
		const slidebox = document.querySelector(ids.slidebox)
		const indicatorsBox = document.querySelector(ids.indicatorsBox)
		const prevControl = document.querySelector(ids.prevControl)
		const nextControl = document.querySelector(ids.nextControl)
		setElems({ carousel, slidebox, indicatorsBox, prevControl, nextControl })
		setValues({ ...values, slides: (children && children.length) || 1 })
	}, [children])

	const computeTranslation = () => {
		const { slidebox, prevControl, nextControl, indicatorsBox } = elems
		const { slidesData, slides } = values
		const { counter, offset } = slidesData
		if (slidebox) {
			if (slides !== 1) {
				if (counter < slides - 1 && counter !== 0) {
					prevControl.style.transform = 'translateX(0px)'
					nextControl.style.transform = 'translateX(0px)'
				} else if (counter === slides - 1) {
					prevControl.style.transform = 'translateX(0px)'
					nextControl.style.transform = 'translateX(100%)'
				} else {
					nextControl.style.transform = 'translateX(0px)'
					prevControl.style.transform = 'translateX(-100%)'
				}
			}

			if (indicatorsBox) {
				indicatorsBox.childNodes.forEach((indicator, index) => {
					indicator.classList.remove('current')
					indicator.style.backgroundColor = ''
				})
				indicatorsBox.childNodes[counter].classList.add('current')
				indicatorsBox.childNodes[counter].style.backgroundColor = secondaryColor.main
			}
			slidebox.style.transform = `translateX(${offset}%)`
		}
	}

	React.useEffect(() => {
		computeTranslation()
	}, [values])

	const handlePrevClick = () => {
		setValues(({ slidesData }) => ({
			...values,
			slidesData: {
				offset: slidesData.offset === 0 ? 0 : slidesData.offset + 100,
				counter: slidesData.counter <= 0 ? 0 : slidesData.counter - 1
			}
		}))
	}

	const handleNextClick = (event) => {
		setValues(({ slidesData }) => ({
			...values,
			slidesData: {
				offset:
					slidesData.offset === (children.length - 1) * -100
						? (children.length - 1) * -100
						: slidesData.offset - 100,
				counter:
					slidesData.counter === children.length - 1
						? children.length - 1
						: slidesData.counter + 1
			}
		}))
	}

	const handleIndicatorClick = (index) => {
		setValues({
			...values,
			slidesData: { offset: index * -100, counter: index }
		})
	}

	const handleInit = () => {
		if (children) {
			if (children.length) {
				return children.map((child, index) =>
					child.type === Slide ? child : <FallbackSlide styles={styles} key={index} />
				)
			} else if (children.type.name === 'Slide') {
				return children
			} else {
				return <FallbackSlide />
			}
		} else {
			return 'No slides'
		}
	}

	const [xValues, setXValues] = React.useState({
		startX: 0,
		initialX: 0,
		currentX: 0
	})
	const [boolValues, setBoolValues] = React.useState({
		isSwipe: false,
		isSwipedToLeft: false,
		isSwipedToRight: false,
		enableSwipe: false,
		swipeHasStarted: false,
		swipeHasEnded: false
	})

	const getBreakpoint = (element) => {
		const getBounding = element.getBoundingClientRect()
		return { left: getBounding.left, right: getBounding.right }
	}

	const translateElementByPx = (element, translateValue) => {
		element.style.transform = `translateX(${translateValue}px)`
	}

	const translateToBreakpoints = () => {
		const { carousel, slidebox } = elems
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
		}
		return finalTranslateValue
	}

	const handleTouchStart = (event) => {
		const { slidebox } = elems
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
		const { slidebox, carousel } = elems
		const { startX, initialX } = xValues
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
					carousel.clientWidth * (values.slides - 1)
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
		setXValues({ ...xValues, currentX: clientX - initialX })
	}

	const handleTouchEnd = () => {
		const { enableSwipe, isSwipe } = boolValues
		if (enableSwipe && isSwipe) {
			setBoolValues({ ...boolValues, swipeHasEnded: true })
		}
	}

	React.useLayoutEffect(() => {
		const { currentX } = xValues
		const { enableSwipe } = boolValues
		const { slidebox } = elems
		if (enableSwipe) {
			translateElementByPx(slidebox, currentX)
		}
	}, [xValues.currentX])

	// React.useLayoutEffect(() => {
	// 	const { slidebox } = elems
	// 	const { enableSwipe, isSwipe, swipeHasEnded } = boolValues
	// 	if (enableSwipe) {
	// 		// translateElementByPx(slidebox, xValues.currentX)
	// 		// if (swipeHasEnded) {
	// 		// 	const translateValue = translateToBreakpoints()
	// 		// 	console.log({ translateValue })
	// 		// 	setTimeout(() => {
	// 		// 		computeTranslation(
	// 		// 			(translateValue / carousel.clientWidth) * 100,
	// 		// 			Math.abs(translateValue / carousel.clientWidth)
	// 		// 		)
	// 		// 	}, 1000)
	// 		// } else {
	// 		// 	translateElementByPx(slidebox, xValues.currentX)
	// 		// }
	// 	}
	// 	console.log({ initialX: xValues.initialX, currentX: xValues.currentX })
	// 	// translateElementByPx(slidebox, xValues.currentX)
	// }, [boolValues, xValues.currentX])

	return (
		<div
			id={`${name}-carousel`}
			className={'carousel_wrapper'}
			style={{
				padding: spacing ? `${spacing}%` : 'inherit',
				height: height || '500px'
			}}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div className='carousel_box'>
				<PrevControlButton
					id={`${name}-carousel-prev-control`}
					color={primaryColor}
					controlsPrevious={controlsPrevious}
					controlsStyle={controlsStyle}
					handleClick={handlePrevClick}
					hideControl={noControls}
				/>
				<div
					id={`${name}-slidebox`}
					className='carousel_box'
					style={{
						transitionDuration: delay ? `${delay}s` : '0.3s'
					}}
				>
					{handleInit()}
				</div>
				<NextControlButton
					id={`${name}-carousel-next-control`}
					color={primaryColor}
					controlsNext={controlsNext}
					controlsStyle={controlsStyle}
					handleClick={handleNextClick}
					hideControl={noControls}
				/>
			</div>
			<Indicators
				id={`${name}-indicators`}
				handleIndicatorClick={handleIndicatorClick}
				hideIndicators={noIndicators}
				indicatorsStyle={indicatorsStyle}
				indicators={children || 1}
			/>
		</div>
	)
}

Carousel.propTypes = {
	name: PropTypes.string.isRequired,
	primaryColor: PropTypes.object,
	secondaryColor: PropTypes.object,
	controlsStyle: PropTypes.oneOf(['circle', 'box', 'transparent', 'default']),
	controlsPrevious: PropTypes.node,
	controlsNext: PropTypes.node,
	noIndicators: PropTypes.bool,
	noControls: PropTypes.bool,
	indicatorsStyle: PropTypes.oneOf(['circle', 'rounded', 'default']),
	delay: PropTypes.number,
	spacing: PropTypes.number,
	height: PropTypes.string,
	swipeable: PropTypes.bool,
	children: PropTypes.any
}

export default Carousel
