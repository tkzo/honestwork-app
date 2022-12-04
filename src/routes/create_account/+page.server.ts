import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const address = data.get('address');
		const salt = data.get('salt');
		const signature = data.get('signature');
		if (salt && signature && address) {
			cookies.set('address', address.toString());
			cookies.set('salt', salt.toString());
			cookies.set('signature', signature.toString());
		}
	}
};
