import React, { useState, useEffect } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import ListGames from '../../components/ListGames'
import { useRouter } from 'next/router'
import { startCase, camelCase } from "lodash"
import { getGamesPlatformApi } from '../../api/games'
import { size } from 'lodash'
import { Loader } from 'semantic-ui-react'

const limitPerPage = 10

export default function Platform() {

    const router = useRouter()
    const { query: { platform } } = router

    const [games, setGames] = useState(null)

    useEffect(() => {
        (async () => {
            if (platform) {
                const response = await getGamesPlatformApi(platform, limitPerPage, 0)
                setGames(response)
            }
        })()
    }, [platform])

    return (
        <BasicLayout className="platform">
            {!games && <Loader active>Cargando juegos...</Loader>}
            {games && size(games) == 0 && (
                <div>
                    <h3>No hay juegos</h3>
                </div>
            )}
            {games && size(games) > 0 && (
                <ListGames games={games} />
            )}
        </BasicLayout>
    )
}
