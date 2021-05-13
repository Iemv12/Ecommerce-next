import React from 'react'
import { Image } from 'semantic-ui-react'
import Slider from 'react-slick'
import { map } from 'lodash'

const setting = {
    className: "carousel-screenshots",
    dots: false,
    infinite: true,
    spedd: 500,
    slidesToShow: 3,
    swipeToSlider: true
}

export default function CarouselScreenShots({ title, screenshots }) {
    return (
        <Slider {...setting}>
            {map(screenshots, (screenshot) => (
                <Image
                    key={screenshot.id}
                    src={screenshot.url}
                    alt={screenshot.name}
                    onClick={() => console.log("Abrir")}
                />
            ))}
        </Slider>
    )
}
