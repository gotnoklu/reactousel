import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from '../setup/enzyme.setup'
import PrevControlButton from '../../components/PrevControlButton'
import {withCarouselTheme} from '../../styles'

const ButtonWithTheme = withCarouselTheme(PrevControlButton)

describe('PrevControlButton component', () => {
    let component, div, wrapper

    component = (
        <ButtonWithTheme id='test' handleClick={() => console.log('click')}>
            Test
        </ButtonWithTheme>
    )

    test('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    test('logs to console when clicked', () => {
        wrapper = mount(component)
        expect(wrapper.invoke('handleClick')).toBe(console.log('click'))
    })
})
