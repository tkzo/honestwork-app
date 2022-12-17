import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = ({ cookies }) => {
	const userAddress = cookies.get('address');
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');
	if (userSignature && userSalt && userAddress) {
		throw redirect(301, `/profile`);
	}
	return {};
};

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const address = data.get('address');
		const salt = data.get('salt');
		const signature = data.get('signature');
		if (salt && signature && address) {
			const url = `${env.PRIVATE_HONESTWORK_API}users/${address}/${salt}/${signature}`;
			let response = await fetch(url, {
				method: 'POST'
			});
			let text = await response.text();
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
