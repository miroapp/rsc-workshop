import {RequestCookies} from 'next/dist/server/web/spec-extension/cookies'
import {ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import {Board} from '@mirohq/miro-api'
import initMiroApiClient from '../../initMiroApiClient'

type GetDataInterface = (cookies: RequestCookies | ReadonlyRequestCookies) => Promise<Board[] | Error>
type GetBoardDataInterface = (cookies: RequestCookies | ReadonlyRequestCookies, boardId: string) => Promise<Board | Error>

export const fetchBoards: GetDataInterface = async (cookies) => {
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
    const api = miro.as('')

    const boards: Board[] = []

    try {
        for await (const board of api.getAllBoards()) {
            boards.push(board)
        }
    } catch (e) {
        console.log('ERROR', e)
    }

    return boards
}

export const fetchBoard: GetBoardDataInterface = async (cookies, boardId) => {
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
    return await miro.as('').getBoard(boardId)
}