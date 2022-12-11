import { json, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { connectNode, nodeProvider } from '$lib/stores/Network';

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('address')!;
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');

	//todo: move trigger to component mount (takes too long)
	// let provider = await connectNode(env.PRIVATE_ETHEREUM_RPC);
	// let ens_name = await provider?.lookupAddress(userAddress);

	if (userSignature && userSalt && userAddress) {
		let user = await validateSignature(userAddress, userSignature, userSalt);
		user.address = userAddress;
		// user.ens_name = ens_name;
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
		//todo: validate from cookies
		const userAddress = cookies.get('address');
		const userSignature = cookies.get('signature');
		const userSalt = cookies.get('salt');
		const data = await request.formData();
		const body = {
			username: data.get('username'),
			show_ens: false,
			title: data.get('title'),
			email: data.get('email'),
			bio: data.get('bio'),
			image_url: data.get('image_url'),
			nft_address: data.get('nft_address'),
			nft_id: data.get('nft_id'),
			show_nft: data.get('show_nft') == 'on' ? true : false,
			timezone: '',
			links: [data.get('link-0'), data.get('link-1'), data.get('link-2')]
		};

		const url = `${env.PRIVATE_HONESTWORK_API}users/${userAddress}/${userSalt}/${userSignature}`;
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
