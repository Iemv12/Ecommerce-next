import React, { useEffect, useState } from 'react'
import BasicLayout from "../layouts/BasicLayout"
import HeaderGame from '../components/game/HeaderGame'
import { useRouter } from "next/router"
import { getGameApi } from '../api/games'
import TabsGame from '../components/game/TabsGame/TabsGame'

export default function Game() {
    const { query } = useRouter()
    const { game: gameOfQuery } = query

    const [game, setGame] = useState(null)

    useEffect(() => {
        (async () => {
            const result = await getGameApi(gameOfQuery)
            setGame(result)
        })()
    }, [query])

    if (!game) return null;

    return (
        <BasicLayout className="game">
            <HeaderGame game={game} />
            <TabsGame game={game} />
        </BasicLayout>
    )
}
