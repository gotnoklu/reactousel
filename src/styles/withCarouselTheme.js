import React from 'react'
import {JssProvider, ThemeProvider, createGenerateId} from 'react-jss'
import createCarouselTheme from './createCarouselTheme'

const generateId = createGenerateId({seed: 'Reactousel-'}) //(rule) => `Reactousel-${rule.key}-${}`


const withCarouselTheme = (Component) => (props) => (
    <JssProvider id={{minify: true}} generateId={generateId}>
        <ThemeProvider theme={props.theme || createCarouselTheme()}>
            <Component {...props} />
        </ThemeProvider>
    </JssProvider>
)

export default withCarouselTheme