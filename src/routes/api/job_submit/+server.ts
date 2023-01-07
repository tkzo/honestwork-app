import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const userAddress = cookies.get('honestwork_address')!;
	const userSignature = cookies.get('honestwork_signature');
	const userSalt = cookies.get('honestwork_salt');

	let data = await request.json();

	const body = {
		user_address: data.user_address,
		title: data.title,
		description: data.description,
		token_paid: data.token_paid,
		budget: parseInt(data.budget),
		installments: parseInt(data.installments),
		sticky_duration: parseInt(data.sticky_duration),
		highlight: parseInt(data.highlight),
		tokens_accepted: data.tokens_accepted
	};

	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const url = `${apiUrl}/jobs/${userAddress}/${userSalt}/${userSignature}`;
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
