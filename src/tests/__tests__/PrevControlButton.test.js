import React from 'react'
import ReactDOM from 'react-dom'
import {shallow, mount} from '../setup/enzyme.setup'
import PrevControlButton from '../../components/PrevControlButton'
import {withCarouselTheme} from '../../styles'

const ButtonWithTheme = withCarouselTheme(PrevControlButton)

describe('PrevControlButton component', () => {
    const div = document.createElement('div')
    let component, wrapper

    component = (
        <ButtonWithTheme id='test' handleClick={() => true}>
            Test
        </ButtonWithTheme>
    )

    test('shows children as "Test"', () => {
        wrapper = shallow(component)
        expect(wrapper.prop('children')).toBe('Test')
        wrapper.unmount(component)
    })

    test('returns true when clicked', () => {
        wrapper = mount(component)
        expect(wrapper.invoke('handleClick')()).toBe(true)
        wrapper.unmount(component)
    })

    test('returns hideControl prop as true', () => {
        component = (
            <ButtonWithTheme id='test' hideControl handleClick={() => true}>
                Test
            </ButtonWithTheme>
        )
        wrapper = mount(component)
        expect(wrapper.prop('hideControl')).toBeDefined()
        expect(wrapper.prop('hideControl')).toBe(true)
        wrapper.unmount(component)
    })
})
