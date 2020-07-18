import React from 'react'
import PropTypes from 'prop-types'

export default function Indicators({
    id = '',
    hideIndicators = false,
    indicatorsStyle = 'default',
    handleIndicatorClick,
    indicators = []
}) {
    return (
        <div
            id={id}
            className={`${'slide_indicators'} ${
                hideIndicators ? 'no_display' : ''
            }`}
        >
            {indicators && indicators.length ? (
                indicators.map((child, index) => (
                    <i
                        className={`${indicatorsStyle || 'default'}`}
                        key={index}
                        onClick={() => handleIndicatorClick(index)}
                    />
                ))
            ) : (
                <i className={`${indicatorsStyle || 'default'}`} />
            )}
        </div>
    )
}

Indicators.propTypes = {
    id: PropTypes.string.isRequired,
    hideIndicators: PropTypes.bool,
    indicatorsStyle: PropTypes.oneOf(['circle', 'rounded', 'default']),
    handleIndicatorClick: PropTypes.func.isRequired,
    indicators: PropTypes.node.isRequired
}
