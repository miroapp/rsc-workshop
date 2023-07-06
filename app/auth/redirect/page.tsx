'use server'

import {redirect} from 'next/navigation'
import Link from 'next/link'
import {cookies} from 'next/headers'

import initMiroApiClient from '../../../src/initMiroApiClient';
import CookieMachine from '../../../src/CookieMachine/CookieMachine'


// handle redirect with code and exchange it for the access token
export default async function AuthorizationPage ({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
  const nextCookies = cookies()
  const {miro} = initMiroApiClient(nextCookies);

  // Make sure the code is in query parameters
  const code = searchParams?.code
  if (!code) {
    redirect('./')
  }

  let token
  try {
    token = await miro.exchangeCodeForAccessToken('', code);
  } catch (e) {
    console.error('error fetching access token from Miro', e)
  }

  return (
      <div>
        <p>Successfully authorized.</p>
        <CookieMachine token={token}/>
        <Link href={'/'}>Back home</Link>
      </div>
  )
}