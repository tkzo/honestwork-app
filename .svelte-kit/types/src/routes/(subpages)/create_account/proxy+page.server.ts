// @ts-nocheck
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = ({ cookies }: Parameters<PageServerLoad>[0]) => {
	const userAddress = cookies.get('honestwork_address', {});
	const userSignature = cookies.get('honestwork_signature');
	const userSalt = cookies.get('honestwork_salt');
	if (userSignature && userSalt && userAddress) {
		throw redirect(301, `/profile`);
	}
	return {};
};

export const actions = {
	default: async ({ cookies, request, fetch }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const address = data.get('honestwork_address');
		const salt = data.get('honestwork_salt');
		const signature = data.get('honestwork_signature');
		if (salt && signature && address) {
			const apiUrl =
				parseInt(env.PRODUCTION_ENV) == 1
					? env.PRIVATE_HONESTWORK_API
					: env.PRIVATE_LOCAL_HONESTWORK_API;
			const url = `${apiUrl}/users/${address}/${salt}/${signature}`;
			let response = await fetch(url, {
				method: 'POST'
			});
			let text = await response.text();
			if (text != `"User doesn't have NFT."`) {
				cookies.set('honestwork_address', address.toString(), {
					domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : 'localhost',
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
					secure: true,
					httpOnly: true,
					sameSite: true,
					path: '/'
				});
				cookies.set('honestwork_salt', salt.toString(), {
					domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : 'localhost',
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
					secure: true,
					httpOnly: true,
					sameSite: true,
					path: '/'
				});
				cookies.set('honestwork_signature', signature.toString(), {
					domain: parseInt(env.PRODUCTION_ENV) == 1 ? 'honestwork.app' : 'localhost',
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
					secure: true,
					httpOnly: true,
					sameSite: true,
					path: '/'
				});
			}
		}
	}
};
;null as any as Actions;