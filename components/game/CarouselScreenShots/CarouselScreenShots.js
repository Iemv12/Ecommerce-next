import React, { useState } from 'react'
import { Image, Modal } from 'semantic-ui-react'
import Slider from 'react-slick'
import { map, size } from 'lodash'

const setting = {
    className: "carousel-screenshots",
    dots: false,
    infinite: true,
    spedd: 500,
    slidesToShow: 3,
    swipeToSlider: true
}

export default function CarouselScreenShots({ title, screenshots }) {

    const [showModal, setShowModal] = useState(false)
    const [urlImage, setUrlImage] = useState(null)

    const openImage = (url) => {
        setUrlImage(url)
        setShowModal(true)
    }

    return (
        <>
            <Slider {...setting}>
                {map(screenshots, (screenshot) => (
                    <Image
                        key={screenshot.id}
                        src={screenshot.url}
                        alt={screenshot.name}
                        onClick={() => openImage(screenshot.url)}
                    />
                ))}
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="small">
                <Image src={urlImage} alt={title} className="modal-image" />
            </Modal>
        </>
    )
}
