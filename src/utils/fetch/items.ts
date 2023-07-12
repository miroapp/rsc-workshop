import {RequestCookies} from 'next/dist/server/web/spec-extension/cookies'
import {ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import initMiroApiClient from '../../initMiroApiClient'

type GetItemsDataInterface = (cookies: RequestCookies | ReadonlyRequestCookies, boardId: string) => Promise<string[] | Error>
type GetItemDataInterface = (cookies: RequestCookies | ReadonlyRequestCookies, boardId: string, itemId: string) => Promise<string | Error>

export const fetchItems: GetItemsDataInterface = async (cookies: RequestCookies | ReadonlyRequestCookies, boardId: string) => {
    const {miro} = initMiroApiClient(cookies)

    // redirect to auth url if user has not authorized the app
    if (!(await miro.isAuthorized(''))) {
        throw new Error('Authentication error', {
                cause: {
                    redirect: {
                        destination: miro.getAuthUrl()
                    }
                }
            }
        )
    }

    const board = await miro.as('').getBoard(boardId)

    const items = []

    const resItems = await board.getAllItems()

    for await (const item of resItems) {
        items.push(JSON.stringify(item))
    }

    return items
}

export const fetchItem: GetItemDataInterface = async (cookies: RequestCookies | ReadonlyRequestCookies, boardId: string, itemId: string) => {
    const {miro} = initMiroApiClient(cookies)

    // redirect to auth url if user has not authorized the app
    if (!(await miro.isAuthorized(''))) {
        throw new Error('Authentication error', {
                cause: {
                    redirect: {
                        destination: miro.getAuthUrl()
                    }
                }
            }
        )
    }

    const board = await miro.as('').getBoard(boardId)

    const item = await board.getItem(itemId)

    return JSON.stringify(item)
}

export const createItem = async (cookies: RequestCookies | ReadonlyRequestCookies, boardId: string, content: string) => {
    const {miro} = initMiroApiClient(cookies)

    // redirect to auth url if user has not authorized the app
    if (!(await miro.isAuthorized(''))) {
        throw new Error('Authentication error', {
                cause: {
                    redirect: {
                        destination: miro.getAuthUrl()
                    }
                }
            }
        )
    }

    const board = await miro.as('').getBoard(boardId)

    const item = await board.createStickyNoteItem({
        data: {
            content: content
        }
    })

    return JSON.stringify(item)
}

export const deleteItem = async (cookies: RequestCookies | ReadonlyRequestCookies, boardId: string, itemId: string) => {
    const {miro} = initMiroApiClient(cookies)

    // redirect to auth url if user has not authorized the app
    if (!(await miro.isAuthorized(''))) {
        throw new Error('Authentication error', {
                cause: {
                    redirect: {
                        destination: miro.getAuthUrl()
                    }
                }
            }
        )
    }

    const board = await miro.as('').getBoard(boardId)

    const item = await board.getItem(itemId)
    await item.delete()
}