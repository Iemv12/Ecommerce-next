import React from "react";
import Link from "next/link"
import { Image, Grid } from "semantic-ui-react";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import { breakPointUpSm, breakPointUpMd, breakPointUpLg } from "../../utils/breakPoints";

export default function ListGames({ games }) {

    const { width } = useWindowSize()

    const getColumnsRender = () => {
        switch (true) {
            case width > breakPointUpLg:
                return 5
            case width > breakPointUpMd:
                return 3
            case width > breakPointUpSm:
                return 2
            default:
                return 2
        }
    }

    return (
        <div className="list-games">
            <Grid>
                <Grid.Row columns={getColumnsRender()}>
                    {map(games, (game) => (
                        <Games key={game.id} game={game} />
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );
}

function Games({ game }) {
    const { url, title, poster, discount, price } = game
    return (
        <Grid.Column className="list-games__game">
            <Link href={`/${url}`}>
                <a>
                    <div className="list-games__game-poster">
                        <Image src={poster.url} alt={title} />
                        <div className="list-games__game-poster-info">
                            {discount ? (
                                <span className="discount">-{discount}%</span>
                            ) : (
                                null
                            )}
                            <span className="price">{price}$</span>
                        </div>
                    </div>
                    <h2>{title}</h2>
                </a>
            </Link>
        </Grid.Column>
    )
}