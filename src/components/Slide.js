import React from 'react'
import PropTypes from 'prop-types'

function Slide({ children }) {
    return <div className={'carousel_item'}>{children}</div>
}

Slide.propTypes = {
    children: PropTypes.node.isRequired
}

export default Slide
