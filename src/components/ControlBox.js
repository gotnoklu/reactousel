import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '../styles'

const useStyles = makeStyles({
    controlBox: ({position, hideControl}) => ({
        width: 'max-content',
        height: '100%',
        position: 'absolute',
        top: position === 'top' || position !== 'bottom' && 0,
        left: position === 'left' && 0,
        right: position === 'right' && 0,
        zIndex: 20,
        display: hideControl ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    })
})

export default function ControlBox({position, hideControl, children}) {
    const classes = useStyles({position, hideControl})
    console.log(position === 'right')
    return (
        <div className={classes.controlBox}>
            {children}
        </div>
    )
}

ControlBox.propTypes = {
    position: PropTypes.oneOf(['left', 'right']),
    hideControl: PropTypes.bool,
    position: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}
