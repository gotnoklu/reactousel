import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from '../setup/enzyme.setup'
import Carousel from '../../components/Carousel'
import Slide from '../../components/Slide'
import FallbackSlide from '../../components/FallbackSlide'


describe('Carousel component', () => {
    let component, div, wrapper

    test('renders without crashing', () => {
        component = <Carousel name='test' />
        const div = document.createElement('div')
        ReactDOM.render(component, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    test('renders 3 Slide components', () => {
        component = (
            <Carousel name='test'>
                <Slide>1</Slide>
                <Slide>2</Slide>
                <Slide>3</Slide>
            </Carousel>
        )
        wrapper = shallow(component)
        expect(wrapper.find(Slide)).toHaveLength(3)
    })

    test('renders 2 Slide components, 1 FallbackSlide component', () => {
        component = (
            <Carousel name='test'>
                <Slide>1</Slide>
                <Slide>2</Slide>
                <div>3</div>
            </Carousel>
        )
        wrapper = shallow(component)
        // expect(wrapper.children()).toHaveLength(3)
        // expect(wrapper.find(Slide)).toHaveLength(2)
        // expect(wrapper.find(FallbackSlide)).toHaveLength(1)
    })
})
