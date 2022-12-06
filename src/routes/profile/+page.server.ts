import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('address');
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');

	if (userSignature && userSalt && userAddress) {
		let user = await validateSignature(userAddress, userSignature, userSalt);
		return { user: user };
	} else {
		throw redirect(301, '/create_account');
	}
};

const validateSignature = async (address: string, userSignature: string, userSalt: string) => {
	const url = `http://localhost:3000/api/v1/users/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		if (json.salt != userSalt || json.signature != userSignature) {
			throw 404;
		}
		return json;
	} else {
		console.log('HTTP-Error: ' + response.status);
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		//validate from cookies
		//disect request
		//fetch
	}
};
