import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { base } from '$app/paths';
import type { APIConfig } from '$lib/stores/Types';

const apiUrl =
	parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const load = (async ({ cookies, fetch }) => {
	const config_url = `${base}/api/config`;
	let config_response = await fetch(config_url);
	let config_data: APIConfig = await config_response.json();
	// console.log('Config data with type:', config_data);

	// todo: update all states with api config data

	const userAddress = cookies.get('honestwork_address');
	const userSignature = cookies.get('honestwork_signature');

	if (userAddress && userSignature) {
		const callUrl = `${apiUrl}/verify/${userAddress}/${userSignature}`;
		let callResponse = await fetch(callUrl, {
			headers: new Headers({
				Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
				'Content-Type': 'application/json'
			})
		});
		let calldata = await callResponse.json();
		if (calldata == 'success') {
			return {
				signed: true
			};
		} else {
			throw redirect(301, '/auth');
		}
	}
}) satisfies LayoutServerLoad;
