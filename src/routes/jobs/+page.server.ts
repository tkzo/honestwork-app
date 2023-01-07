import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({}) => {
	// default sorting: created_at, descending
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const url = `${apiUrl}/jobs/created_at/false`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		console.log(json);

		return { json: json };
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};
