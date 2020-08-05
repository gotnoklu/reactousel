import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '../styles'

const useStyles = makeStyles((theme) => ({
    indicatorsBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: ({hideIndicators}) => hideIndicators ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        webkitUserSelect: 'none',
        mozUserSelect: 'none',
    },
    indicator: {
        width: '10px',
        height: '10px',
        cursor: 'pointer',
        margin: '0 5px',
        transition: 'all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        backgroundColor: theme.indicators.colorPrimary,
    },
    rounded: {
        borderRadius: '50px',
        width: '15px'
    },
    circle: {
        borderRadius: '50%'
    }
}))

export default function IndicatorsBox({
    id,
    hideIndicators,
    indicatorsStyle,
    handleIndicatorClick,
    indicators
}) {
    const classes = useStyles({hideIndicators})
    return (
        <div
            id={id}
            className={classes.indicatorsBox}
        >
            {indicators && indicators.length ? (
                indicators.map((child, index) => (
                    <i
                        className={`${classes.indicator} ${classes[indicatorsStyle]}`}
                        key={index}
                        onClick={() => handleIndicatorClick(index)}
                    />
                ))
            ) : (
                    <i className={`${classes.indicator} ${classes[indicatorsStyle]}`} />
                )}
        </div>
    )
}

IndicatorsBox.propTypes = {
    id: PropTypes.string.isRequired,
    hideIndicators: PropTypes.bool,
    indicatorsStyle: PropTypes.oneOf(['circle', 'rounded']),
    handleIndicatorClick: PropTypes.func.isRequired,
    indicators: PropTypes.node.isRequired
}
