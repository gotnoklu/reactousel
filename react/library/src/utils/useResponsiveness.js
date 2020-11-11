import React from 'react'
import Slide from '../components/Slide'
import useMediaQuery, { breakpoints } from './useMediaQuery'

/**
 * A hook that makes the carousel responsive
 * @param {Array|Object} children The carousel children
 * @returns {Array}
 */
function useResponsiveness(children) {
	const [slides, setSlides] = React.useState({
		xs: [],
		sm: [],
		md: [],
		lg: []
	})
	const matchesExtraSmallScreen = useMediaQuery(breakpoints.xs)
	const matchesSmallScreen = useMediaQuery(breakpoints.sm)
	const matchesMediumScreen = useMediaQuery(breakpoints.md)
	const matchesLargeScreen = useMediaQuery(breakpoints.lg)

	const createChildrenArray = (data) => {
		let result = []
		if (data.length) {
			data.forEach(({ props }) => {
				result = result.concat(props.children)
			})
		} else {
			result.push(data)
		}
		return result
	}

	/**
	 * Splits an array into an array of arrays
	 * @param {Array} data
	 * @returns {Array}
	 */
	const handleDataSplit = (data) => {
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

	const createSlideArray = (data) => {
		return data.map((childList, index) => <Slide key={index}>{childList}</Slide>)
	}

	React.useEffect(() => {
		if (Array.isArray(children)) {
			const childArray = createChildrenArray(children)
			const smallScreenArray = createSlideArray(childArray)
			const mediumScreenArray = createSlideArray(handleDataSplit(childArray))
			setSlides({ xs: smallScreenArray, sm: smallScreenArray, md: mediumScreenArray, lg: children })
		} else {
			const result = [].concat(children.props.children)
			setSlides({ xs: result, sm: result, md: result, lg: result })
		}

		return () => {
			setSlides(null)
		}
	}, [children])

	if (matchesExtraSmallScreen) return slides.xs
	if (matchesSmallScreen) return slides.sm
	if (matchesMediumScreen) return slides.md
	if (matchesLargeScreen) return slides.lg
}

export default useResponsiveness
