import { useState } from 'react'

/**
 * A hook that returns true/false when a screen size breakpoint is reached
 * @param {String} query CSS Media Query string
 * @returns {Boolean} isMatch
 */
const useMediaQuery = (query) => {
	const [isMatch, setIsMatch] = useState(matchMedia(query).matches)
	matchMedia(query).onchange = () => {
		setIsMatch(matchMedia(query).matches)
	}
	return isMatch
}

// Screen sizes
export const breakpoints = {
	xs: '(min-width: 0px) and (max-width: 600px)',
	sm: '(min-width: 601px) and (max-width: 900px)',
	md: '(min-width: 901px) and (max-width: 1024px)',
	lg: '(min-width: 1025px)'
}

export default useMediaQuery
