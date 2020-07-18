import React from 'react'
import PropTypes from 'prop-types'
import PrevControlButton from './PrevControlButton'
import NextControlButton from './NextControlButton'
import Indicators from './Indicators'
import Slide from './Slide'
import FallbackSlide from './FallbackSlide'
// import withStyles from './withStyles'

function Carousel({
    name,
    primaryColor = {},
    secondaryColor = {},
    controlsStyle,
    controlsPrevious,
    controlsNext,
    noIndicators = false,
    noControls = false,
    indicatorsStyle,
    delay,
    spacing,

    height,
    children
}) {
    const [values, setValues] = React.useState({
        slidesData: { offset: 0, counter: 0 }
    })

    React.useEffect(() => {
        const carousel = document.querySelector(`#${name}`)
        const slides = (children && children.length) || 1
        const indicatorsBox = document.querySelector(`#${name}-indicators`)
        const prevControl = document.querySelector(
            `#${name}-carousel-prev-control`
        )
        const nextControl = document.querySelector(
            `#${name}-carousel-next-control`
        )
        const { slidesData } = values
        const { counter, offset } = slidesData

        function computeTranslation() {
            if (carousel) {
                if (slides !== 1) {
                    if (counter < slides - 1 && counter !== 0) {
                        prevControl.style.transform = 'translateX(0px)'
                        nextControl.style.transform = 'translateX(0px)'
                    } else if (counter === slides - 1) {
                        prevControl.style.transform = 'translateX(0px)'
                        nextControl.style.transform = 'translateX(100%)'
                    } else {
                        nextControl.style.transform = 'translateX(0px)'
                        prevControl.style.transform = 'translateX(-100%)'
                    }
                }

                if (indicatorsBox) {
                    indicatorsBox.childNodes.forEach((indicator, index) => {
                        indicator.classList.remove('current')
                        indicator.style.backgroundColor = ''
                    })
                    indicatorsBox.childNodes[counter].classList.add('current')
                    indicatorsBox.childNodes[counter].style.backgroundColor =
                        secondaryColor.main
                }
                carousel.style.transform = `translateX(${offset}%)`
            }
        }
        computeTranslation()
    }, [name, children, values, secondaryColor])

    const handlePrevClick = () => {
        setValues(({ slidesData }) => ({
            ...values,
            slidesData: {
                offset: slidesData.offset === 0 ? 0 : slidesData.offset + 100,
                counter: slidesData.counter <= 0 ? 0 : slidesData.counter - 1
            }
        }))
    }

    const handleNextClick = (event) => {
        setValues(({ slidesData }) => ({
            ...values,
            slidesData: {
                offset:
                    slidesData.offset === (children.length - 1) * -100
                        ? (children.length - 1) * -100
                        : slidesData.offset - 100,
                counter:
                    slidesData.counter === children.length - 1
                        ? children.length - 1
                        : slidesData.counter + 1
            }
        }))
    }

    const handleIndicatorClick = (index) => {
        setValues({
            ...values,
            slidesData: { offset: index * -100, counter: index }
        })
    }

    const handleInit = () => {
        if (children) {
            if (children.length) {
                return children.map((child, index) =>
                    child.type === Slide ? (
                        child
                    ) : (
                        <FallbackSlide styles={styles} key={index} />
                    )
                )
            } else if (children.type.name === 'Slide') {
                return children
            } else {
                return <FallbackSlide />
            }
        } else {
            return 'No slides'
        }
    }
    return (
        <div
            className={'carousel_wrapper'}
            style={{
                padding: spacing ? `${spacing}%` : 'inherit',
                height: height || '500px'
            }}
        >
            <div className={'carousel'}>
                <PrevControlButton
                    id={`${name}-carousel-prev-control`}
                    color={primaryColor}
                    controlsPrevious={controlsPrevious}
                    controlsStyle={controlsStyle}
                    handleClick={handlePrevClick}
                    hideControl={noControls}
                />
                <div
                    id={name}
                    className={'carousel'}
                    style={{
                        transitionDuration: delay ? `${delay}s` : '0.3s'
                    }}
                >
                    {handleInit()}
                </div>
                <NextControlButton
                    id={`${name}-carousel-next-control`}
                    color={primaryColor}
                    controlsNext={controlsNext}
                    controlsStyle={controlsStyle}
                    handleClick={handleNextClick}
                    hideControl={noControls}
                />
            </div>
            <Indicators
                id={`${name}-indicators`}
                handleIndicatorClick={handleIndicatorClick}
                hideIndicators={noIndicators}
                indicatorsStyle={indicatorsStyle}
                indicators={children || 1}
            />
        </div>
    )
}

Carousel.propTypes = {
    name: PropTypes.string.isRequired,
    primaryColor: PropTypes.object,
    secondaryColor: PropTypes.object,
    controlsStyle: PropTypes.oneOf(['circle', 'box', 'transparent', 'default']),
    controlsPrevious: PropTypes.node,
    controlsNext: PropTypes.node,
    noIndicators: PropTypes.bool,
    noControls: PropTypes.bool,
    indicatorsStyle: PropTypes.oneOf(['circle', 'rounded', 'default']),
    delay: PropTypes.number,
    spacing: PropTypes.number,
    height: PropTypes.string,
    children: PropTypes.any
}

export default Carousel
