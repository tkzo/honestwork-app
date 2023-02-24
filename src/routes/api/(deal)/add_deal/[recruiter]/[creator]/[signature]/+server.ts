import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, params }) => {
	let data = await request.json();
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const body = {
		network: data.network,
		token_address: data.token_address,
		total_amount: data.total_amount,
		downpayment: data.downpayment
	};
	const url = `${apiUrl}/deals/${params.recruiter}/${params.creator}/${params.signature}`;
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
