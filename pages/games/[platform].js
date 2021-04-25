import React, { useState, useEffect } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'
import { startCase, camelCase } from "lodash"
import { getGamesPlatformApi } from '../../api/games'

const limitPerPage = 10

export default function Platform() {

    const router = useRouter()
    const { query: { platform } } = router

    const [games, setGames] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getGamesPlatformApi(platform, limitPerPage, 0)
            setGames(response)
        })()
    }, [platform])

    return (
        <BasicLayout className="platform">
            <h1>Estamos en la plataforma: {startCase(camelCase(platform))}</h1>
        </BasicLayout>
    )
}
