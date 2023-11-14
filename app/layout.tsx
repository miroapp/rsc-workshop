import {cookies} from 'next/headers'
import React from 'react'
import {Authentication} from '../src/Authentication/Authentication'
import LoadMiroWebSDK from './LoadMiroWebSDK'
import initMiroApiClient from '../src/initMiroApiClient'

type RootLayoutProps = {
	children: React.ReactNode
}
export default async function RootLayout({
	 children
 }: RootLayoutProps) {
	const nextCookies = cookies()
	const {miro} = initMiroApiClient(nextCookies)

	let destination = ''
	// redirect to auth url if user has not authorized the app
	if (!(await miro.isAuthorized(''))) {
		destination = miro.getAuthUrl()
	}

	return (
		<html>
		<head>
		</head>
		<body>
		<div style={{maxWidth: '500px', margin: 'var(--space-large) auto', display: 'block'}}>
			<h1>Miro board info viewer</h1>
			<LoadMiroWebSDK/>
			<Authentication destination={destination}/>
			<hr/>
			{children}
		</div>
		</body>
		</html>
	)
}
