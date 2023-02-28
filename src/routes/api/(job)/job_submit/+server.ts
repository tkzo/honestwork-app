import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	let data = await request.json();

	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const hwapiUrl = `${apiUrl}/jobs/${data.user_address}`;
	const jobs_response = await fetch(hwapiUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const jobs = await jobs_response.json();
	const index = jobs != null ? jobs.length : 0;

	let cloud_url;
	if (data.image_url != '') {
		cloud_url =
			env.PRIVATE_SPACES_URL + '/' + data.user_address + '/job/' + index + '/' + data.image_url;
	}

	const body = {
		user_address: data.user_address,
		username: data.username,
		title: data.title,
		description: data.description,
		image_url: cloud_url,
		token_paid: data.token_paid,
		budget: parseInt(data.budget),
		sticky_duration: parseInt(data.sticky_duration),
		links: data.links,
		highlight: parseInt(data.highlight),
		tokens_accepted: data.tokens_accepted,
		tx_hash: data.tx_hash,
		tags: data.tags,
		timezone: data.timezone,
		created_at: new Date().getTime(),
		email: data.email
	};

	const url = `${apiUrl}/jobs/${data.user_address}/${data.signature}`;
	const options = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		}
	};

	let response = await fetch(url, options);
	return response;
};
