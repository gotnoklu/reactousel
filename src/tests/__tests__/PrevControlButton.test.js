import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from '../setup/enzyme.setup'
import PrevControlButton from '../../components/PrevControlButton'
import {withCarouselTheme} from '../../styles'

const ButtonWithTheme = withCarouselTheme(PrevControlButton)

describe('PrevControlButton component', () => {
    let component, div, wrapper

    test('renders without crashing', () => {
        component = (
            <ButtonWithTheme id='test' handleClick={() => console.log('click')}>
                Test
            </ButtonWithTheme>
        )
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
