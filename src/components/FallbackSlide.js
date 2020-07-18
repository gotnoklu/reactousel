import React from 'react'
import Slide from './Slide'

function FallbackSlide() {
    return (
        <Slide>
            <div className={'fallback_slide'}>
                Use a {'<Slide>'} component instead.
            </div>
        </Slide>
    )
}

export default FallbackSlide
