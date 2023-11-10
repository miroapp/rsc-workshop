'use client'

import {useEffect} from 'react'

export default function() {
	useEffect(() => {
		window?.miro?.board.ui.on('icon:click', async () => {
			window.miro.board.ui.openPanel({
				url: `/`,
			});
		});
	}, []);
	return null
}