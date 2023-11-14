import {cookies} from 'next/headers'
import {fetchItems} from '../../../src/utils/fetch/items'
import React from 'react'
import {WidgetItem} from "@mirohq/miro-api/dist/highlevel/Item";
import Link from 'next/link';

export default async function BoardPage( {params}: { params: { boardId: string } } ) {

    const nextCookies = cookies()

    let boardId = decodeURIComponent(params.boardId);
    let items: WidgetItem[] = []
    try {
        const response = await fetchItems(nextCookies, boardId)
        if (Array.isArray(response)) {
            items = response.map( (json: string) => JSON.parse(json) )
        }
    } catch (e) {        
        console.log('Error while retrieving items', e)
    }

    return (
        <div className="grid wrapper">
            <ul>
                {
                    !!items.length && items.map(item =>
                        <li key={item.id}>
                            <Link href={`../boards/${boardId}/items/${item.id}`}>{item.id}</Link>
                            <p>Type: {item.type}</p>
                            <p>
                                {
                                    // @ts-ignore Different types of items will have diffrerent properties,
                                    // this is just a quick example
                                    item.data.content || item.data.title
                                }
                            </p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
