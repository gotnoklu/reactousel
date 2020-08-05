import React from 'react'
import {shallow} from '../setup/enzyme.setup'
import NextControlButton from '../../components/NextControlButton'

describe('NextControlButton component', () => {
    let component, div, wrapper

    test('renders without crashing', () => {
        component = <NextControlButton />
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})