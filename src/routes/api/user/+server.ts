import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ cookies, request }) => {
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
		return json({
			response: await response.json()
		});
	} else {
		return json({
			response: 'FAIL'
		});
	}
};
