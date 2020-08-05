import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from '../setup/enzyme.setup'
import IndicatorsBox from '../../components/IndicatorsBox'
import {withCarouselTheme} from '../../styles'

const IndicatorsWithTheme = withCarouselTheme(IndicatorsBox)

describe('Indicators component', () => {
    let component, div, wrapper

    test('renders without crashing', () => {
        component = <IndicatorsWithTheme id='test' indicators={1} handleIndicatorClick={() => console.log('click')} />
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})