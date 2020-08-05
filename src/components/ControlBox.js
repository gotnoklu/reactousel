import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '../styles'

const useStyles = makeStyles({
    controlBox: ({direction, hideControl}) => ({
        width: 'max-content',
        height: '100%',
        position: 'absolute',
        top: direction === 'top' || direction !== 'bottom' && 0,
        left: direction === 'left' && 0,
        right: direction === 'right' && 0,
        zIndex: 20,
        display: hideControl ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    })
})

export default function ControlBox({position, hideControl, children}) {
    const classes = useStyles({position, hideControl})
    return (
        <div className={classes.controlBox}>
            {children}
        </div>
    )
}

ControlBox.propTypes = {
    position: PropTypes.oneOf(['left', 'right']),
    hideControl: PropTypes.bool,
    children: PropTypes.node.isRequired
}
