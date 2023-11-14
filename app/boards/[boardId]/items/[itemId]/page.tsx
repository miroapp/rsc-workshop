import {cookies} from 'next/headers'
import React from 'react'
import {fetchItem} from "../../../../../src/utils/fetch/items";

export default async function ItemPage({params}: { params: { boardId: string, itemId: string } }) {
    const nextCookies = cookies()

    let item = {}
    try {
        const json = await fetchItem(nextCookies, decodeURIComponent(params.boardId), params.itemId)
        if (json && typeof json === 'string') {
            item = JSON.parse(json)
        }
    } catch (e) {
        console.log('Error while retrieving item data', e)
    }

    return (
        <pre>
            {
                JSON.stringify(item, null, 2)
            }
        </pre>
    )
}