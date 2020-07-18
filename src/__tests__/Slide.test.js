import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from './setup/enzyme.setup'
import Slide from '../reactousel/Slide'

describe('Slide component', () => {
	let component, wrapper
	test('renders without crashing', () => {
		component = <Slide />
		const div = document.createElement('div')
		ReactDOM.render(component, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	test('renders default text when no children is supplied', () => {
		component = <Slide></Slide>
		wrapper = shallow(component)
		expect(wrapper.find('.carousel-item').get(0).props.children).toBe('Nothing to display')
	})

	test('renders 2 divs', () => {
		component = (
			<Slide>
				<div>Hello</div>
				<div>Hi</div>
			</Slide>
		)
		wrapper = shallow(component)
		expect(wrapper.find('.carousel-item').get(0).props.children).toBeDefined()
		expect(wrapper.find('.carousel-item').get(0).props.children).toHaveLength(2)
	})
})
