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
    let calldata = await callResponse.json();
    if (calldata == 'success') {
      let options = {
        domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : '127.0.0.1',
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: '/'
      };
      cookies.set('honestwork_address', data.get('address')!.toString(), options);
      cookies.set('honestwork_signature', data.get('signature')!.toString(), options);

      throw redirect(301, '/profile');
    }
    throw redirect(301, '/mint');
  }
};
