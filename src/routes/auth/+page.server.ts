import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const load: PageServerLoad = async ({ cookies }) => {
  const userAddress = cookies.get('honestwork_address');
  const userSignature = cookies.get('honestwork_signature');
  if (userAddress && userSignature) {
    return { address: userAddress, signature: userSignature };
  }
};

export const actions: Actions = {
  default: async ({ cookies, request, fetch }) => {
    const data = await request.formData();
    const callUrl = `${base}/api/signup/${data.get('address')}/${data.get('signature')}`;
    let callResponse = await fetch(callUrl, {
      method: 'POST',
    });
    if (callResponse.ok) {
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
    };
    throw redirect(301, '/mint');
  }
};
