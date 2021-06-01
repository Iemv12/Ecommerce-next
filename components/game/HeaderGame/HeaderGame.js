import React, { useEffect, useState } from 'react'
import { Grid, Image, Icon, Button } from 'semantic-ui-react'
import { isFavoriteApi, addFavoriteApi, removeFavoriteApi } from '../../../api/favorite'
import { size } from 'lodash'
import useAuth from '../../../hooks/useAuth'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import useCart from "../../../hooks/useCart"

export default function HeaderGame({ game }) {

    const { poster, title } = game
    return (
        <Grid className="header-game">
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={poster.url} alt={title} fluid />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info game={game} />
            </Grid.Column>
        </Grid>
    )
}

function Info({ game }) {

    const { title, summary, price, discount, url } = game
    const [isFavorite, setIsFavorite] = useState(false)
    const [realoadFavorite, setRealoadFavorite] = useState(false)
    const { auth, logout } = useAuth()
    const { addProductCart } = useCart()

    useEffect(() => {
        if (auth) {
            (async () => {
                const response = await isFavoriteApi(auth.idUser, game.id, logout)
                size(response) > 0 ? setIsFavorite(true) : setIsFavorite(false)
            })()
            setRealoadFavorite(false)
        }
    }, [game, realoadFavorite])

    const addFavorites = async () => {
        if (auth) {
            setRealoadFavorite(true)
            await addFavoriteApi(auth.idUser, game.id, logout)
            toast.success("Ha sido agregado a favorito")
        } else {
            toast.error("Debe de iniciar sesion")
        }
    }

    const removeFavorites = async () => {
        if (auth) {
            setRealoadFavorite(true)
            await removeFavoriteApi(auth.idUser, game.id, logout)
        }
    }

    return (
        <>
            <div className="header-game__title">
                {title}
                <Icon
                    name={isFavorite ? "heart" : "heart outline"}
                    className={classNames({
                        like: isFavorite
                    })}
                    link
                    onClick={isFavorite ? removeFavorites : addFavorites} />
            </div>
            <div className="header-game__delivery">Entrega en 24/48h.</div>
            <div className="header-game__summary" dangerouslySetInnerHTML={{ __html: summary }} />
            <div className="header-game__buy">
                <div className="header-game__buy-price">
                    <p>Precio de venta al publico: {price}$</p>
                    <div className="header-game__buy-price-actions">
                        <p>-{discount}%</p>
                        <p>{parseFloat(price - Math.floor(price * discount) / 100).toFixed(2)}$</p>
                    </div>
                </div>
                <Button
                    className="header-game__buy-btn"
                    onClick={()=> addProductCart(url)}
                    >
                    Comprar
                </Button>
            </div>
        </>
    )
}