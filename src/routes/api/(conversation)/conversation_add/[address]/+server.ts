import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ params, cookies }) => {
	const userAddress = cookies.get('honestwork_address')!;
	const userSignature = cookies.get('honestwork_signature');
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const body = {
		matched_user: params.address
	};
	const url = `${apiUrl}/conversations/${userAddress}/${userSignature}`;
	const options = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: new Headers({
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		})
	};
	let response = await fetch(url, options);
	return response;
};
