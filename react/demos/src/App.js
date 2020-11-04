/* eslint-disable react/jsx-key */
import React from 'react'
import { Carousel, Slide, createCarouselTheme } from 'reactousel'

const styles = {
	backgroundColor: '#00a0f9',
	color: '#fff',
	fontWeight: 'bold',
	fontSize: '3rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%'
}

const slides = [
	<div style={styles}>1</div>,
	<div style={styles}>2</div>,
	<div style={styles}>3</div>
]

const theme = createCarouselTheme({
	controls: {
		colorPrimary: 'rgba(0, 0, 0, 0)'
	},
	indicators: {
		colorPrimary: '#000',
		colorSecondary: '#ffa000'
	}
})

const App = () => {
	return (
		<React.Fragment>
			<Carousel name='example-1' controlsStyle='circle'>
				{slides.map((content, index) => (
					<Slide key={index}>{content}</Slide>
				))}
			</Carousel>
			<Carousel name='example-2' controlsStyle='circle' theme={theme} swipeable>
				{slides.map((content, index) => (
					<Slide key={index}>{content}</Slide>
				))}
			</Carousel>
			<Carousel name='example-3' controlsStyle='circle' theme={theme} swipeable>
				{slides.map((content, index) => (
					<Slide key={index}>{content}</Slide>
				))}
			</Carousel>
		</React.Fragment>
	)
}

export default App
