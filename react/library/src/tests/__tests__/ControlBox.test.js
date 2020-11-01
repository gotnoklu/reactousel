import React from 'react'
import { shallow, mount } from '../setup/enzyme.setup'
import ControlBox from '../../components/ControlBox'

describe('ControlBox component', () => {
	let component, wrapper

	test('returns children as "Test"', () => {
		component = <ControlBox position='right'>Test</ControlBox>
		wrapper = shallow(component)
		expect(wrapper.prop('children')).toBe('Test')
		wrapper.unmount(component)
	})

	test('returns true when button child is clicked', () => {
		component = (
			<ControlBox position='left'>
				<button onClick={() => true}>Click</button>
			</ControlBox>
		)
		wrapper = shallow(component)
		expect(wrapper.find('button').invoke('onClick')()).toBe(true)
		wrapper.unmount(component)
	})

	test('returns hideControl prop as true', () => {
		component = (
			<ControlBox position='left' hideControl>
				Prop Test
			</ControlBox>
		)
		wrapper = mount(component)
		expect(wrapper.prop('hideControl')).toBe(true)
		wrapper.unmount(component)
	})
})
