import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

const apiUrl =
	parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const load: PageServerLoad = (async ({ params }) => {
	const jobsResponse = await getJobs(params.address);
	const url = `${apiUrl}/job/${params.address}/${jobsResponse.length - 1}`;
	let response = await fetch(url);
	if (response.status == 200) {
		let data = await response.json();
		return {
			job: data
		};
	}
	throw error(404, 'Not found');
}) satisfies PageServerLoad;

const getJobs = async (address: string) => {
	const url = `${apiUrl}/jobs/${address}`;
	let response = await fetch(url);
	let json = await response.json();
	return json;
};
