'use client'

import React, {useTransition} from "react";
import Link from "next/link";
import {deleteItemFromBoard} from "../../app/actions";

export default function ItemView({ boardId, itemJson }: { boardId: string, itemJson: string }) {
    let [, startTransition] = useTransition()

    const item = JSON.parse(itemJson)
    return (
        <>
            <Link href={`../boards/${boardId}/items/${item.id}`}>{item.id}</Link>
            <p>Type: {item.type}</p>
            <p>{item.data.content || item.data.title}</p>
            <input type="button" value="Delete" onClick={() => startTransition(() => deleteItemFromBoard(boardId, item.id))}/>
        </>
    )
}