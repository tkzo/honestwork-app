import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const fetch_url = `${apiUrl}/skills`;
	let response = await fetch(fetch_url);
	if (response.ok) {
		let json = await response.json();
		return json;
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response;
	}
};
