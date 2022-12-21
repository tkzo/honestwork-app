// @ts-nocheck
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = async ({}: Parameters<PageServerLoad>[0]) => {
	const url = `${env.PRIVATE_HONESTWORK_API}skills`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		return { json: json };
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};
