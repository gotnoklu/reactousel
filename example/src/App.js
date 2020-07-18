import React from 'react'
import { Carousel, Slide } from 'reactousel'
import 'reactousel/dist/index.css'

const App = () => {
    return (
        <Carousel name='example' controlsStyle='circle'>
            <Slide>1</Slide>
            <Slide>2</Slide>
            <Slide>3</Slide>
        </Carousel>
    )
}

export default App
