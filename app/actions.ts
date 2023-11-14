'use server'

import {deleteItem} from "../src/utils/fetch/items";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function deleteItemFromBoard(boardId: string, itemId: string) {
    const nextCookies = cookies()
    await deleteItem(nextCookies, boardId, itemId)
    revalidatePath(`/boards/${boardId}`)
}