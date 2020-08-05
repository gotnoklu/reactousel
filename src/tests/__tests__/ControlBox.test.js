import React from 'react'
import {shallow} from '../setup/enzyme.setup'
import ControlBox from '../../components/ControlBox'

describe('ControlBox component', () => {
    let component, div, wrapper

    test('renders without crashing', () => {
        component = <ControlBox />
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})