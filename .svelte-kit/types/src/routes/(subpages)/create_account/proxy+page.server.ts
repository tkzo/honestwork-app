// @ts-nocheck
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = ({ cookies }: Parameters<PageServerLoad>[0]) => {
	const userAddress = cookies.get('address');
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');
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
		if (salt && signature && address) {
			const url = `${env.PRIVATE_HONESTWORK_API}users/${address}/${salt}/${signature}`;
			let response = await fetch(url, {
				method: 'POST'
			});
			//todo: fix api returns
			let text = await response.text();
			console.log(text);

			if (text != `"User doesn't have NFT."`) {
				cookies.set('address', address.toString(), {
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
				});
				cookies.set('salt', salt.toString(), {
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
				});
				cookies.set('signature', signature.toString(), {
					expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
				});
			}
		}
	}
};
;null as any as Actions;