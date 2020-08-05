import React from 'react'
import {shallow} from '../setup/enzyme.setup'
import Indicators from '../../components/Indicators'

describe('Indicators component', () => {
    let component, div, wrapper

    test('renders without crashing', () => {
        component = <Indicators />
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})