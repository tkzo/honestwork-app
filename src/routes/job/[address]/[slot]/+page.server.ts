import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ params }) => {
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const url = `${apiUrl}/job/${params.address}/${params.slot}`;

	let response = await fetch(url);
	if (response.status == 200) {
		let data = await response.json();
		return {
			job: data
		};
	}
	throw error(404, 'Not found');
}) satisfies PageServerLoad;
