import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ params }) => {
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	let url = `${apiUrl}/users/${params.address}`;
	let response = await fetch(url);

	if (response.status == 200) {
		let user = await response.json();
		url = `${apiUrl}/skills/${params.address}`;
		response = await fetch(url);

		if (response.status == 200) {
			let skills = await response.json();
			return {
				user: user,
				skills: skills
			};
		}
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
