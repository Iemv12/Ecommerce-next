import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import { Loader } from 'semantic-ui-react'
import { searchGameApi } from '../api/games'
import { useRouter } from 'next/router'
import BasicLayout from '../layouts/BasicLayout'
import ListGames from '../components/ListGames'

export default function search() {

    const [games, setGames] = useState(null)
    const { query } = useRouter()

    useEffect(() => {
        document.getElementById("search-game").focus()
    }, [])

    useEffect(() => {
        (async () => {
            if (size(query.query) > 0) {
                const response = await searchGameApi(query.query)
                if (size(response) > 0) {
                    setGames(response)
                } else {
                    setGames([])
                }
            } else {
                setGames([])
            }
        })()
    }, [query])

    return (
        <BasicLayout className="search">
            {!games && <Loader active>Cargando juegos...</Loader>}
            {games && size(games) == 0 && (
                <div className="data__not-found">
                    <h3>No hay juego en tu lista</h3>
                </div>
            )}
            {games && size(games) > 0 && (
                <ListGames games={games} />
            )}
        </BasicLayout>
    )
}
