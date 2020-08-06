# Reactousel

> Reactousel is a simple carousel for React and the web.

[![NPM](https://img.shields.io/npm/v/reactousel.svg)](https://www.npmjs.com/package/reactousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## What's new in version 1.1.x

-   Importing the css styles **is expected to result in an error** since all styles have now been converted to [**JSS**](https://cssinjs.org/react-jss).

```jsx
import {Carousel, Slide} from 'reactousel'

// reactousel/dist/index.css no longer exists
```

-   The carousel theme can now be customized by importing **createCarouselTheme** instead of the old way of passing **primaryColor** and **secondaryColor** props to Carousel. Using the old way is expected to fail.

```jsx
// Import React as usual
import React from 'react'

// Import createCarouselTheme in addition to Carousel and Slide
import {Carousel, Slide, createCarouselTheme} from 'reactousel'

// You can use HEX or RGB or normal color values
const customTheme = createCarouselTheme({
	// theme for control buttons
	controls: {
		colorPrimary: '#0000ff', // blue
		colorSecondary: '#ffffff' // white
	},
	// theme for indicators
	indicators: {
		colorPrimary: '#000000', //black
		colorSecondary: '#ffa000' // amber
	}
})

// App component
function App() {
	return (
		// Pass customTheme value to theme prop of Carousel component
		<Carousel name='test-carousel' theme={customTheme}>
			<Slide>My first slide</Slide>
		</Carousel>
	)
}
```

## Install

-   Install with [npm](https://npmjs.com)<br />

```bash
$ npm install reactousel
```

-   Install with [yarn](https://yarnpkg.com)<br />

```bash
$ yarn add reactousel
```

-   [Download](https://reactousel.web.app/download) JS & CSS files (use in the head tag)

```html
<html>
    <head>
        <link rel='stylesheet' href='./reactousel.css'>
        <script src='./reactousel.js'>
    </head>
    <body>
        <!-- body content -->
    </body>
</html>
```

## Usage

-   Import the carousel and slide components like below:<br/>

```jsx
// Import React
import React from 'react'

// Import Carousel and Slide like this
import {Carousel, Slide} from 'reactousel'

// Only import index.css in versions below 1.1.0.
// In versions above 1.1.0, it is expected to cause an error.
import 'reactousel/dist/index.css'
```

-   Example with a functional component:

```jsx
//Import React
import React from 'react'

// Import Carousel and Slide components
import {Carousel, Slide} from 'reactousel'

// Only import index.css in versions below 1.1.0.
// In versions above 1.1.0, it is expected to cause an error.
import 'reactousel/dist/index.css'

// App component
function App() {
	return (
		<Carousel name='test-carousel'>
			<Slide>My first slide</Slide>
		</Carousel>
	)
}
```

-   Example with a class component:

```jsx
//Import React
import React from 'react'

// Import Carousel and Slide components
import {Carousel, Slide} from 'reactousel'

// Import styles
import 'reactousel/dist/index.css'

// App component
class App extends React.Component {
	render() {
		return (
			<Carousel name='test-carousel'>
				<Slide>My first slide</Slide>
			</Carousel>
		)
	}
}
```

## Components

### `<Carousel>` props

`name, controlsStyle, controlsPrevious, controlsNext, noIndicators, noControls, indicatorsStyle, delay, spacing, height, children`

`primaryColor, secondaryColor` have however, been removed **starting from version 1.1.0**

-   `name`<br />
    desired unique name of the carousel (required).

-   `controlsStyle`<br />
    styles of the previous and next buttons.

-   `controlsPrevious`<br />
    replace default previous control with your own.

-   `controlsNext`<br />
    replace default next control with your own.

-   `noIndicators`<br />
    removes slide indicators.

-   `noControls`<br />
    removes carousel controls.

-   `indicatorStyle`<br />
    styles of the indicators.

-   `delay`<br />
    delays transition time of each slide.

-   `spacing`<br />
    spacing within carousel.

-   `height`<br />
    height of carousel.

-   `primaryColor` **(removed in version 1.1.0, see [Theming](#theming) below)**<br />
    color of controls.<br />

    ```javascript
    // Example
    primaryColor={{ main: '#000', contrast: '#fff' }}
    ```

-   `secondaryColor` **(removed in version 1.1.0, see [Theming](#theming) below)**<br />
    color of indicators.<br />

    ```javascript
    // Example
    secondaryColor={{ main: '#ffa000' }}
    ```

-   `children`<br />
    **`<Slide>`** elements only. Any other element will display a fallback slide whilst anything else will show "No slides".

### `<Slide>` props

`children`

-   `children`<br/>
    any element or text.

## Theming

As of versions 1.1.0 and above, customizing the theme for the controls and indicators could be done via **createCarouselTheme**.

-   Example with a class component

```jsx
// Import React as usual
import React from 'react'

// Import createCarouselTheme in addition to Carousel and Slide
import {Carousel, Slide, createCarouselTheme} from 'reactousel'

// You can use HEX or RGB or normal color values
const customTheme = createCarouselTheme({
	// theme for control buttons
	controls: {
		colorPrimary: '#0000ff', // blue
		colorSecondary: '#ffffff' // white
	},
	// theme for indicators
	indicators: {
		colorPrimary: '#000000', //black
		colorSecondary: '#ffa000' // amber
	}
})

// App component
class App extends React.Component {
	render() {
		return (
			// Pass customTheme value to theme prop of Carousel component
			<Carousel name='test-carousel' theme={customTheme}>
				<Slide>My first slide</Slide>
			</Carousel>
		)
	}
}
```

## Development

-   **Clone the project**<br />

    ```bash
    $ git clone https://github.com/Elkanah-me/reactousel.git
    ```

-   **Install dependencies**<br />
    `npm install` or `yarn install`

-   **Start**<br />
    `npm run start` or `yarn run start`

-   **Build**<br />
    `npm run build` or `yarn run build`

-   **Install dependencies for example**<br />
    `cd example && npm install` or `cd example && yarn install`

-   **Run in browser**<br />
    `cd example && npm run start` or `cd example && yarn run start`

-   **Build example**<br />
    `cd example && npm run build` or `cd example && yarn run build`

## In your HTML, CSS and JS projects

-   An example in HTML

```html
<html>
	<head>
		<!-- Other Styles -->
		<link rel="stylesheet" href="./reactousel.css" />
		<script src="./reactousel.js"></script>
	</head>
	<body>
		<div class="carousel-wrapper" style="width: 800px;">
			<div class="carousel">
				<div class="carousel-control-box prev">
					<button id="prev-btn" class="carousel-control prev">
						Left Button
					</button>
				</div>
				<div id="test" class="carousel">
					<div class="carousel-item">
						1
					</div>
					<div class=" carousel-item">
						2
					</div>
					<div class="carousel-item">
						3
					</div>
				</div>
				<div class="carousel-control-box next">
					<button id="next-btn" class="carousel-control next">
						Right Button
					</button>
				</div>
			</div>
			<div class="slide-indicators"></div>
		</div>
		<script>
			// Slides container
			const box1 = document.getElementById('test')
			// Control for previous slide
			const controlsPrev1 = document.getElementById('prev-btn')
			// Control for next slide
			const controlsNext1 = document.getElementById('next-btn')
			// Slides
			const slides1 = box1.querySelectorAll('.carousel-item')
			const carouselWrapper = box1.parentElement.parentElement
			// Indicators box
			const indicatorsBox1 = carouselWrapper.querySelector('.slide-indicators')
			createCarousel(box1, controlsPrev1, controlsNext1, slides1, indicatorsBox1)
		</script>
	</body>
</html>
```

<hr />

Checkout [the demos on Reactousel's website](https://reactousel.web.app/demos). You may [download the JS & CSS files](https://reactousel.web.app/download) to use in your raw HTML, CSS, JS projects.

<hr />

## License

MIT © [Elkanah-me](https://github.com/Elkanah-me)
