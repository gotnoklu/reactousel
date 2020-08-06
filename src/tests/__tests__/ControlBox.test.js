import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from '../setup/enzyme.setup'
import ControlBox from '../../components/ControlBox'

describe('ControlBox component', () => {
    let component, div, wrapper

    test('renders without crashing', () => {
        component = <ControlBox position='right'>Test</ControlBox>
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})