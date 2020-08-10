import React from 'react'
import PropTypes from 'prop-types'
import LeftIcon from './LeftIcon'
import ControlButton from './ControlButton'
import {makeStyles} from '../styles'

const useStyles = makeStyles((theme) => ({
    icon: {
        fill: theme.controls.colorSecondary
    }
}))

export default function PrevControlButton({
    id,
    controlsPrevious,
    controlsStyle,
    hideControl,
    handleClick
}) {

    const classes = useStyles({controlsPrevious})

    return (
        <ControlButton
            id={id}
            position='left'
            customControl={controlsPrevious}
            controlsStyle={controlsStyle}
            handleClick={handleClick}
            hideControl={hideControl}
        >
            {controlsPrevious || <LeftIcon className={classes.icon} />}
        </ControlButton>
    )
}

PrevControlButton.propTypes = {
    id: PropTypes.string.isRequired,
    controlsPrevious: PropTypes.node,
    controlsStyle: PropTypes.oneOf(['circle']),
    hideControl: PropTypes.bool,
    handleClick: PropTypes.func.isRequired
}
