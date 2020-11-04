/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import PrevControlButton from './PrevControlButton'
import NextControlButton from './NextControlButton'
import IndicatorsBox from './IndicatorsBox'
import Slide from './Slide'
import FallbackSlide from './FallbackSlide'
import { makeStyles, withCarouselTheme } from '../styles'
import useSwipe from '../utils/useSwipe'
import useCarousel from '../utils/useCarousel'

const useStyles = makeStyles((theme) => ({
	carousel: {
		overflow: 'hidden',
		outline: 'none',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		position: 'relative',
		padding: ({ spacing }) => `${spacing}%` || 'inherit',
		height: ({ height }) => height || '500px'
	},
	carouselInnerBox: {
		width: '100%',
		height: '100%',
		display: 'flex'
	},
	slidebox: {
		transition: ({ delay }) => `all ${delay || 0.3}s ease`
	},
	indicatorCurrent: {
		backgroundColor: theme.indicators.colorSecondary
	}
}))

function Carousel({
	name,
	controlsStyle,
	controlsPrevious,
	controlsNext,
	noIndicators,
	noControls,
	indicatorsStyle,
	delay,
	spacing,
	height,
	swipeable,
	children
}) {
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
		const carousel = document.querySelector(`#${name}-carousel`)
		const slidebox = document.querySelector(`#${name}-slidebox`)
		const indicatorsBox = document.querySelector(`#${name}-indicators`)
		const prevControl = document.querySelector(`#${name}-carousel-prev-control`)
		const nextControl = document.querySelector(`#${name}-carousel-next-control`)
		setElems({ carousel, slidebox, indicatorsBox, prevControl, nextControl })
		setValues({ ...values, slides: (children && children.length) || 1 })

		return () => {
			setElems({})
			setValues({})
		}
	}, [])

	const classes = useStyles({ spacing, height, delay })

	const computeTranslation = (finalOffset, finalCounter = 0) => {
		const { slidebox, prevControl, nextControl, indicatorsBox } = elems
		const { slidesData, slides } = values
		const { counter, offset } = slidesData
		const currentIndicatorIndex = finalCounter || counter
		if (slidebox) {
			if (slides !== 1) {
				if (currentIndicatorIndex < slides - 1 && currentIndicatorIndex !== 0) {
					prevControl.style.transform = 'translateX(0px)'
					nextControl.style.transform = 'translateX(0px)'
				} else if (currentIndicatorIndex === slides - 1) {
					prevControl.style.transform = 'translateX(0px)'
					nextControl.style.transform = 'translateX(100%)'
				} else {
					nextControl.style.transform = 'translateX(0px)'
					prevControl.style.transform = 'translateX(-100%)'
				}
			}

			if (indicatorsBox) {
				indicatorsBox.childNodes.forEach((indicator) => {
					indicator.classList.remove(classes.indicatorCurrent)
				})
				indicatorsBox.childNodes[currentIndicatorIndex].classList.add(classes.indicatorCurrent)
			}
			slidebox.style.transform = `translateX(${finalOffset || offset}%)`
		}
	}

	React.useEffect(() => {
		computeTranslation()
	}, [elems.slidebox, values])

	const carousel = useCarousel(name, children, delay, swipeable)

	const swipe = swipeable
		? useSwipe({
				carousel: elems.carousel,
				slidebox: elems.slidebox,
				slidesNumber: values.slides,
				translateFn: computeTranslation
		  })
		: null

	const handlePrevClick = () => {
		setValues(({ slidesData }) => ({
			...values,
			slidesData: {
				offset: slidesData.offset === 0 ? 0 : slidesData.offset + 100,
				counter: slidesData.counter <= 0 ? 0 : slidesData.counter - 1
			}
		}))
		if (swipe) {
			swipe.setEnableSwipe(false)
			swipe.setIsSwipe(false)
		}
	}

	const handleNextClick = () => {
		setValues(({ slidesData }) => ({
			...values,
			slidesData: {
				offset:
					slidesData.offset === (children.length - 1) * -100
						? (children.length - 1) * -100
						: slidesData.offset - 100,
				counter:
					slidesData.counter === children.length - 1 ? children.length - 1 : slidesData.counter + 1
			}
		}))
		if (swipe) {
			swipe.setEnableSwipe(false)
			swipe.setIsSwipe(false)
		}
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
					child.type === Slide ? child : <FallbackSlide key={index + 77} />
				)
			} else if (children.type === Slide) {
				return children
			} else {
				return <FallbackSlide />
			}
		} else {
			return 'No slides'
		}
	}

	const configTouchEventHandlers = () => {
		if (swipeable) {
			return {
				onTouchStart: swipe && swipe.handleTouchStart,
				onTouchMove: swipe && swipe.handleTouchMove,
				onTouchEnd: swipe && swipe.handleTouchEnd
			}
		}
		return null
	}

	return (
		<div id={`${name}-carousel`} className={classes.carousel} {...configTouchEventHandlers()}>
			<div className={classes.carouselInnerBox}>
				<PrevControlButton
					id={`${name}-carousel-prev-control`}
					controlsPrevious={controlsPrevious}
					controlsStyle={controlsStyle}
					handleClick={handlePrevClick}
					hideControl={noControls}
				/>
				<div id={`${name}-slidebox`} className={`${classes.carouselInnerBox} ${classes.slidebox}`}>
					{handleInit()}
				</div>
				<NextControlButton
					id={`${name}-carousel-next-control`}
					controlsNext={controlsNext}
					controlsStyle={controlsStyle}
					handleClick={handleNextClick}
					hideControl={noControls}
				/>
			</div>
			<IndicatorsBox
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
	theme: PropTypes.object,
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

export default withCarouselTheme(Carousel)
