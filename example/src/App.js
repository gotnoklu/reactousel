import React from 'react'
import { Carousel, Slide } from 'reactousel'
import 'reactousel/dist/index.css'

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

const App = () => {
	return (
		<Carousel name='example' controlsStyle='circle'>
			{slides.map((content, index) => (
				<Slide key={index}>{content}</Slide>
			))}
		</Carousel>
	)
}

export default App
