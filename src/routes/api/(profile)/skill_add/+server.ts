import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const apiUrl =
	parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const POST: RequestHandler = async ({ request, cookies, fetch, params }) => {
	const userAddress = cookies.get('honestwork_address');
	const userSignature = cookies.get('honestwork_signature');
	const data = await request.json();
	const url = `${apiUrl}/skills/${userAddress}/${userSignature}`;
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		}
	});
	return response;
};
