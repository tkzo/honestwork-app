import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const userAddress = cookies.get('honestwork_address')!;
	const userSignature = cookies.get('honestwork_signature');
	const userSalt = cookies.get('honestwork_salt');

	let data = await request.json();

	const body = {
		address: data.address,
		slot: data.slot
	};
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const hwapiUrl = `${apiUrl}/watchlist/${userAddress}/${userSalt}/${userSignature}`;
	const response = await fetch(hwapiUrl, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};
