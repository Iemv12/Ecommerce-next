import React from 'react'
import ReactPlayer from 'react-player/lazy'
import CarouselScreenShots from '../CarouselScreenShots'

export default function InfoGame({ game }) {
    return (
        <div className="info-game">
            <ReactPlayer className="info-game__video" controls url={game.video} />
            <CarouselScreenShots title={game.title} screenshots={game.screenshots} />
        </div>
    )
}
