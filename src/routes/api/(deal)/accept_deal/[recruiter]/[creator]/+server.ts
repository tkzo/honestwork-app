import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const PATCH: RequestHandler = async ({ cookies, request, params }) => {
	const userSignature = cookies.get('honestwork_signature');

	let data = await request.json();
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const body = {
		slot: data.slot,
		signature: data.signature
	};
	console.log('body: ', body);
	const url = `${apiUrl}/deals/${params.recruiter}/${params.creator}/${userSignature}`;
	const options = {
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: new Headers({
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		})
	};
	let response = await fetch(url, options);
	return response;
};
