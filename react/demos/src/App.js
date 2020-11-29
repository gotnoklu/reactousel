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
		width: '100%',
		height: '100%'
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
		colorPrimary: 'rgba(255, 255, 255, 0.5)',
		colorSecondary: '#ffa000'
	}
})

const App = () => {
	return (
		<div style={{ display: 'flex' }}>
			<main style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<section>
					<span>Default Carousel</span>
					<Carousel name='example-1'>
						{slides.map((content, index) => (
							<Slide key={index}>{content}</Slide>
						))}
					</Carousel>
				</section>
				<section>
					<span>Carousel + Styles + Theme + Swipeable</span>
					<Carousel
						name='example-2'
						controlsStyle='circle'
						indicatorsStyle='circle'
						theme={theme}
						swipeable
					>
						{slides.map((content, index) => (
							<Slide key={index}>{content}</Slide>
						))}
					</Carousel>
				</section>
				<section>
					<span>Carousel + Styles + Theme + Responsive</span>
					<Carousel
						name='example-3'
						controlsStyle='circle'
						indicatorsStyle='rounded'
						theme={theme}
						responsive
					>
						<Slide>
							<div style={{ ...styles.box, ...styles.box3 }}>1</div>
							<div style={{ ...styles.box, ...styles.box2 }}>2</div>
							<div style={{ ...styles.box, ...styles.box1 }}>3</div>
							<div style={{ ...styles.box, ...styles.box2 }}>4</div>
							<div style={{ ...styles.box, ...styles.box3 }}>5</div>
						</Slide>
						<Slide>
							<div style={{ ...styles.box, ...styles.box3 }}>6</div>
							<div style={{ ...styles.box, ...styles.box2 }}>7</div>
							<div style={{ ...styles.box, ...styles.box1 }}>8</div>
							<div style={{ ...styles.box, ...styles.box2 }}>9</div>
							<div style={{ ...styles.box, ...styles.box3 }}>10</div>
						</Slide>
						<Slide>
							<div style={{ ...styles.box, ...styles.box3 }}>11</div>
							<div style={{ ...styles.box, ...styles.box2 }}>12</div>
							<div style={{ ...styles.box, ...styles.box1 }}>13</div>
							<div style={{ ...styles.box, ...styles.box2 }}>14</div>
							<div style={{ ...styles.box, ...styles.box3 }}>15</div>
						</Slide>
					</Carousel>
				</section>
			</main>
		</div>
	)
}

export default App
