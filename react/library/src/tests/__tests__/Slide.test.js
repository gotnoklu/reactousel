import React from 'react'
import { shallow } from '../setup/enzyme.setup'
import Slide from '../../components/Slide'

describe('Slide component', () => {
	let component, wrapper

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
		wrapper.unmount(component)
	})
})
