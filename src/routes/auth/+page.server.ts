import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const userAddress = cookies.get('honestwork_address');
  const userSignature = cookies.get('honestwork_signature');
  if (userAddress && userSignature) {
    return { address: userAddress, signature: userSignature };
  }
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const apiUrl =
      parseInt(env.PRODUCTION_ENV) == 1
        ? env.PRIVATE_HONESTWORK_API
        : env.PRIVATE_LOCAL_HONESTWORK_API;
    const callUrl = `${apiUrl}/users/${data.get('address')}/${data.get('signature')}`;
    let callResponse = await fetch(callUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
        'Content-Type': 'application/json'
      }
    });
    if (callResponse.ok) {
      let calldata = await callResponse.json();
      if (calldata == 'success') {
        let options = {
          domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : 'localhost',
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: true,
          sameSite: true,
          path: '/'
        };
        const address = data.get('address') as string;
        const signature = data.get('signature') as string;
        cookies.set('honestwork_address', address, options);
        cookies.set('honestwork_signature', signature, options);
        throw redirect(302, '/profile');
      }
    };
    throw redirect(301, '/mint');
  }
};
