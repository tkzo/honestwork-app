import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		console.log('hi');
		const data = await request.formData();
		console.log('Address', data.get('address'));
		console.log('Signature', data.get('signature'));
		console.log('Salt', data.get('salt'));

		const apiUrl =
			parseInt(env.PRODUCTION_ENV) == 1
				? env.PRIVATE_HONESTWORK_API
				: env.PRIVATE_LOCAL_HONESTWORK_API;
		const callUrl = `${apiUrl}/users/${data.get('address')}/${data.get('signature')}`;
		let callResponse = await fetch(callUrl, {
			method: 'POST'
		});
		let calldata = await callResponse.json();
		if (calldata == 'success') {
			cookies.set('honestwork_address', data.get('address')!.toString(), {
				domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : 'localhost',
				expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
				secure: true,
				httpOnly: true,
				sameSite: true,
				path: '/'
			});
			cookies.set('honestwork_salt', data.get('salt')!.toString(), {
				domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : 'localhost',
				expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
				secure: true,
				httpOnly: true,
				sameSite: true,
				path: '/'
			});
			cookies.set('honestwork_signature', data.get('signature')!.toString(), {
				domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : 'localhost',
				expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
				secure: true,
				httpOnly: true,
				sameSite: true,
				path: '/'
			});
			return calldata;
		}
		throw redirect(300, '/mint');
	}
};
