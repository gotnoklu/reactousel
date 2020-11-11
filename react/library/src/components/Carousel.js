/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import PrevControlButton from './PrevControlButton'
import NextControlButton from './NextControlButton'
import IndicatorsBox from './IndicatorsBox'
import Slide from './Slide'
import FallbackSlide from './FallbackSlide'
import { makeStyles, withCarouselTheme } from '../styles'
import useCarousel from '../utils/useCarousel'
import useResponsiveness from '../utils/useResponsiveness'

const useStyles = makeStyles({
	carousel: {
		overflow: 'hidden',
		outline: 'none',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		position: 'relative',
		padding: ({ spacing }) => `${spacing}px` || 'inherit',
		height: ({ height }) => height || '500px'
	},
	carouselInnerBox: {
		width: '100%',
		height: '100%',
		display: 'flex'
	},
	slidebox: ({ delay }) => ({
		transition: `all ${delay || 0.3}s ease`
	})
})

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
	responsive,
	swipeable,
	children
}) {
	const classes = useStyles({ spacing, height, delay })
	const responsiveSlides = responsive ? useResponsiveness(children) : children
	const carousel = useCarousel(name, responsiveSlides, swipeable)
	const {
		handlePrevClick,
		handleNextClick,
		handleIndicatorClick,
		configTouchEventHandlers
	} = carousel

	const handleRender = () => {
		if (children) {
			if (children.length) {
				return children.map((child, index) =>
					child.type === Slide ? child : <FallbackSlide key={index} />
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
					{responsive ? responsiveSlides : handleRender()}
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
				indicators={responsive ? responsiveSlides : children || 1}
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
	responsive: PropTypes.bool,
	swipeable: PropTypes.bool,
	children: PropTypes.node
}

export default withCarouselTheme(Carousel)
