import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const DELETE: RequestHandler = async ({ request, params }) => {
	let data = await request.json();
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const body = {
		slot: data.slot
	};
	const url = `${apiUrl}/deals/${params.recruiter}/${params.creator}/${params.signature}`;
	const options = {
		method: 'DELETE',
		body: JSON.stringify(body),
		headers: new Headers({
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		})
	};
	let response = await fetch(url, options);
	return response;
};
