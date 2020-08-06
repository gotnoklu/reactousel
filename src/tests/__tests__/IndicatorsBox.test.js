import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from '../setup/enzyme.setup'
import IndicatorsBox from '../../components/IndicatorsBox'
import {withCarouselTheme} from '../../styles'

const IndicatorsWithTheme = withCarouselTheme(IndicatorsBox)

describe('IndicatorsBox component', () => {
    let component, wrapper

    component = <IndicatorsWithTheme id='test' indicators={1} handleIndicatorClick={() => true} />

    test('returns true when handleIndicatorClick prop is called', () => {
        wrapper = mount(component)
        expect(wrapper.invoke('handleIndicatorClick')()).toBe(true)
        wrapper.unmount(component)
    })

    test('returns one indicator', () => {
        wrapper = mount(component)
        expect(wrapper.find('i')).toHaveLength(1)
        wrapper.unmount(component)
    })
})