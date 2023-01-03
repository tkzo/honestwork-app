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
		const address = data.get('address');
		const salt = data.get('salt');
		const signature = data.get('signature');
		console.log('Eh?');
		if (salt && signature && address) {
			console.log('Eh?');

			const url = `${env.PRIVATE_HONESTWORK_API}users/${address}/${salt}/${signature}`;
			let response = await fetch(url, {
				method: 'POST'
			});
			let text = await response.text();
			if (text != `"User doesn't have NFT."`) {
				console.log('Eh?');

				cookies.set('honestwork_address', address.toString(), {
					// domain: 'honestwork.app',
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
					secure: true,
					httpOnly: true,
					sameSite: true,
					path: '/'
				});
				const userAddress = cookies.get('honestwork_address', {});
				console.log('User address: ' + userAddress);
				cookies.set('honestwork_salt', salt.toString(), {
					// domain: 'honestwork.app',
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
					secure: true,
					httpOnly: true,
					sameSite: true,
					path: '/'
				});
				cookies.set('honestwork_signature', signature.toString(), {
					// domain: 'honestwork.app',
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