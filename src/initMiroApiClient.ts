import {Miro} from '@mirohq/miro-api';
import {RequestCookies} from 'next/dist/server/web/spec-extension/cookies'
import {ReadonlyRequestCookies} from 'next/dist/server/app-render'


export const tokensCookie = 'miro_tokens';
const userIdCookie = 'miro_user_id';

const initMiroApiClient: (cookies: RequestCookies | ReadonlyRequestCookies) => { miro:Miro } = (
    cookies: RequestCookies | ReadonlyRequestCookies
) => {

  // set up a Miro instance that loads tokens from cookies
  return {
    miro: new Miro({
      storage: {
        get: async () => {
          // Load state (tokens) from a cookie if it's set
          try {
            return {
              userId: '',
              accessToken: cookies.get(tokensCookie)?.value || '',
            }
          } catch (err) {
            return undefined
          }
        },
        set: (_) => {},
      },
    }),
    userId: cookies.get(userIdCookie) || '',
  };
}

export default initMiroApiClient
