'use client'

import React from "react";

export default function CreateItem({ createItem }: { createItem: (data: FormData) => Promise<void> }) {

    async function action(data: FormData) {
        return createItem(data)
    }
    return (
        <div className="grid wrapper">
            <form action={action}>
                <label>
                    Content:
                    <input type="text" name="content"/>
                </label>
                <button>Create sticky note</button>
            </form>
        </div>
    )
}