import React from 'react'
import { shallow, mount } from '../setup/enzyme.setup'
import Carousel from '../../components/Carousel'
import Slide from '../../components/Slide'
import FallbackSlide from '../../components/FallbackSlide'

describe('Carousel component', () => {
	let component, wrapper

	test('renders text "No slides"', () => {
		component = <Carousel name='test' />
		wrapper = mount(component)
		expect(wrapper.contains('No slides')).toBe(true)
		wrapper.unmount(component)
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
		wrapper.unmount(component)
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
		expect(wrapper.find(Slide)).toHaveLength(2)
		expect(wrapper.containsMatchingElement(FallbackSlide)).toBeDefined()
		wrapper.unmount(component)
	})
})
