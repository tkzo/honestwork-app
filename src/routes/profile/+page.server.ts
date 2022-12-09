import { json, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('address');
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');

	if (userSignature && userSalt && userAddress) {
		let user = await validateSignature(userAddress, userSignature, userSalt);
		user.address = userAddress;
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
		if (json.signature) {
			if (json.salt != userSalt || json.signature != userSignature) {
				throw 404;
			}
			return json;
		}
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		//validate from cookies
		const userAddress = cookies.get('address');
		const userSignature = cookies.get('signature');
		const userSalt = cookies.get('salt');

		//todo: fix all values
		const data = await request.formData();
		const body = {
			username: data.get('username'),
			show_ens: false,
			title: data.get('title'),
			email: data.get('email'),
			bio: data.get('bio'),
			image_url: '',
			nft_address: data.get('nft_address'),
			nft_id: data.get('nft_id'),
			timezone: '',
			links: ''
		};

		const url = `http://localhost:3000/api/v1/users/${userAddress}/${userSalt}/${userSignature}`;
		let response = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const json = await response.json();
			console.log(json);
		}
	}
};
