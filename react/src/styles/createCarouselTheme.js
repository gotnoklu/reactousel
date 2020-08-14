function createCarouselTheme(options) {
    const controls = options && options.controls
    const indicators = options && options.indicators

    const theme = {
        controls: {
            colorPrimary: (controls && controls.colorPrimary) || 'black',
            colorSecondary: (controls && controls.colorSecondary) || 'white'
        },
        indicators: {
            colorPrimary: (indicators && indicators.colorPrimary) || 'grey',
            colorSecondary: (indicators && indicators.colorSecondary) || 'white'
        }
    }

    return theme
}

export default createCarouselTheme