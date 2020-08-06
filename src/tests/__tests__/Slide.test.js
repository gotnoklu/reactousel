import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from '../setup/enzyme.setup'
import Slide from '../../components/Slide'

describe('Slide component', () => {
    let component, wrapper

    test('renders without crashing', () => {
        component = <Slide>Hello</Slide>
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    test('renders 2 divs', () => {
        component = (
            <Slide>
                <div>Hello</div>
                <div>Hi</div>
            </Slide>
        )
        wrapper = shallow(component)
        expect(wrapper.prop('children')).toHaveLength(2)
        expect(wrapper.children().find('div')).toHaveLength(2)
    })
})
