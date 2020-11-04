import { useEffect, useState } from 'react'
import { makeStyles } from '../styles'
import useSwipe from './useSwipe'

const useStyles = makeStyles((theme) => ({
	indicatorCurrent: {
		backgroundColor: theme.indicators.colorSecondary
	}
}))

function useCarousel(name, children, swipeable) {
	const [elems, setElems] = useState({
		carousel: null,
		slidebox: null,
		indicatorsBox: null,
		prevControl: null,
		nextControl: null
	})
	const [values, setValues] = useState({
		slidesData: { offset: 0, counter: 0 },
		slides: 0
	})
	const classes = useStyles()

	useEffect(() => {
		const carousel = document.querySelector(`#${name}-carousel`)
		const slidebox = document.querySelector(`#${name}-slidebox`)
		const indicatorsBox = document.querySelector(`#${name}-indicators`)
		const prevControl = document.querySelector(`#${name}-carousel-prev-control`)
		const nextControl = document.querySelector(`#${name}-carousel-next-control`)
		setElems({ carousel, slidebox, indicatorsBox, prevControl, nextControl })
		setValues({ ...values, slides: (children && children.length) || 1 })

		return () => {
			setElems(null)
			setValues(null)
		}
	}, [])

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

	useEffect(() => {
		computeTranslation()
	}, [elems.slidebox, values])

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

	/* eslint-disable indent */
	const swipe = swipeable
		? useSwipe({
				carousel: elems.carousel,
				slidebox: elems.slidebox,
				slidesNumber: values.slides,
				translateFn: computeTranslation
		  })
		: null

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

	return { handlePrevClick, handleNextClick, handleIndicatorClick, configTouchEventHandlers }
}

export default useCarousel
