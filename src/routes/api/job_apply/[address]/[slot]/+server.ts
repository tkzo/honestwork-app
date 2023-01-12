import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request, cookies, params }) => {
	const userAddress = cookies.get('honestwork_address')!;
	const userSignature = cookies.get('honestwork_signature');
	const userSalt = cookies.get('honestwork_salt');

	let data = await request.json();

	const body = {
		user_address: data.user_address,
		job_id: data.job_id,
		cover_letter: data.cover_letter
	};
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const hwapiUrl = `${apiUrl}/jobs/apply/${userAddress}/${userSalt}/${userSignature}/${params.address}/${params.slot}`;
	const apply_response = await fetch(hwapiUrl, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return apply_response;
};
