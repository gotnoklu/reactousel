import React from 'react'

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export default function LeftIcon({ color }) {
    return (
        <svg
            width='100%'
            height='100%'
            viewBox='0 0 40.0 40.0'
            id='SVGRoot'
            style={style}
        >
            <path
                d='m 25.65625,5.7578125 -11.3125,11.3124995 -2.828125,2.830079 2.828125,2.828125 11.3125,11.3125 2.828125,-2.828125 -11.3125,-11.314453 11.3125,-11.3125005 z'
                fill={color}
            />
        </svg>
    )
}
