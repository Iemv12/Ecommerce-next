import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'
import { startCase, camelCase } from "lodash"

export default function Platform() {

    const router = useRouter()
    const { query: { platform } } = router

    return (
        <BasicLayout className="platform">
            <h1>Estamos en la plataforma: {startCase(camelCase(platform))}</h1>
        </BasicLayout>
    )
}
