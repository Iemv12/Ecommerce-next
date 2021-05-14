import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import BasicLayout from '../layouts/BasicLayout'
import { listAllFavoritesByUserIdApi } from '../api/favorite'
import { size, forEach } from 'lodash'
import ListGames from "../components/ListGames"
import { Loader } from 'semantic-ui-react'

export default function wishlist() {

    const { auth, logout } = useAuth()
    const [games, setGames] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await listAllFavoritesByUserIdApi(auth.idUser, logout)
            if (size(response) > 0) {
                const gameList = []
                forEach(response, (data) => {
                    gameList.push(data.game)
                })
                setGames(gameList)
            } else {
                setGames([])
            }
        })()
    }, [])

    return (
        <BasicLayout className="wishlist">
            <div className="wishlist__block">
                <div className="title">Lista de Deseos</div>
                <div className="data">
                    {!games && <Loader active>Cargando juegos...</Loader>}
                    {games && size(games) == 0 && (
                        <div className="data__not-found">
                            <h3>No hay juego en tu lista</h3>
                        </div>
                    )}
                    {games && size(games) > 0 && (
                        <ListGames games={games} />
                    )}
                </div>
            </div>
        </BasicLayout>
    )
}
