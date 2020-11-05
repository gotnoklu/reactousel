/* eslint-disable react/jsx-key */
import React from 'react'
import { Carousel, Slide, createCarouselTheme } from 'reactousel'

const styles = {
	box: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: '3rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	box1: {
		backgroundColor: 'green'
	},
	box2: {
		backgroundColor: 'blue'
	},
	box3: {
		backgroundColor: 'red'
	}
}

const slides = [
	<div style={{ ...styles.box, ...styles.box1 }}>1</div>,
	<div style={{ ...styles.box, ...styles.box2 }}>2</div>,
	<div style={{ ...styles.box, ...styles.box3 }}>3</div>
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
