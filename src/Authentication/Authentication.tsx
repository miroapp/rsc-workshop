'use client'

import React, {FunctionComponent} from 'react'

export const Authentication: FunctionComponent<{destination?: string}> = ({destination}) => {
	return destination ? <a href={destination} className='button button-primary' style={{lineHeight: '48px', textDecoration: 'none'}}>Login to Miro</a> : null
}