import React, { useState, useEffect } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import ListGames from '../../components/ListGames'
import { useRouter } from 'next/router'
import { getGamesPlatformApi, getTotalGamesPlatformApi } from '../../api/games'
import { size } from 'lodash'
import { Loader } from 'semantic-ui-react'
import Pagination from '../../components/pagination'

const limitPerPage = 20

export default function Platform() {

    const router = useRouter()
    const { query } = router
    const { platform, page } = query

    const [games, setGames] = useState(null)
    const [totalGames, setTotalGames] = useState(null)

    const getStartItem = () => {
        const currentPages = parseInt(page)
        if (!page || currentPages === 1) return 0
        else return currentPages * limitPerPage - limitPerPage
    }

    useEffect(() => {
        (async () => {
            if (platform) {
                const response = await getGamesPlatformApi(platform, limitPerPage, getStartItem())
                setGames(response)
            }
        })()
    }, [query])


    useEffect(() => {
        (async () => {
            const response = await getTotalGamesPlatformApi(platform)
            setTotalGames(response)
        })()
    }, [query])

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
            {totalGames
                ? (
                    <Pagination
                        totalGames={totalGames}
                        page={page ? parseInt(page) : 1}
                        limitPerPage={limitPerPage} />
                )
                : null}
        </BasicLayout>
    )
}
