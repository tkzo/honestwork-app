import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	let data = await request.json();

	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const body = {
		matched_user: data.matched_user,
		muted: false
	};
	const url = `${apiUrl}/conversations/${data.user_address}/${data.signature}`;
	const options = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	};

	let response = await fetch(url, options);
	return response;
};
