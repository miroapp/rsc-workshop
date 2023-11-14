import {cookies} from 'next/headers'
import {createItem, fetchItems} from '../../../src/utils/fetch/items'
import React from 'react'
import {WidgetItem} from "@mirohq/miro-api/dist/highlevel/Item";
import { revalidatePath } from 'next/cache';
import CreateItem from '../../../src/components/CreateItem';
import ItemView from '../../../src/components/ItemView';

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

  async function createItemOnBoard(data: FormData) {
    'use server'
    console.log('From form: ', data)
    let content: string = data.get('content') as string;
    await createItem(cookies(), boardId, content)
    revalidatePath(`/boards/${boardId}`)
  }

    return (
        <div className="grid wrapper">
            <ul>
                {
                    !!items.length && items.map(item =>
                      <li key={item.id}>
                        <ItemView boardId={boardId} itemJson={JSON.stringify(item)}/>
                      </li>
                    )
                }
            </ul>
          <CreateItem createItem={createItemOnBoard}/>
        </div>
    )
}
