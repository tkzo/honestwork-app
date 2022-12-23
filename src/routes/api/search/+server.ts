import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const fetch_url = `${env.PRIVATE_HONESTWORK_API}skills`;
	let response = await fetch(fetch_url);
	if (response.ok) {
		let json = await response.json();
		return json;
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response;
	}
};
