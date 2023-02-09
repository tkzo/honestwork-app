import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';

const apiUrl =
	parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const load = (async ({ cookies }) => {
	const userAddress = cookies.get('honestwork_address');
	const userSignature = cookies.get('honestwork_signature');

	if (userAddress && userSignature) {
		const callUrl = `${apiUrl}/verify/${userAddress}/${userSignature}`;
		let callResponse = await fetch(callUrl);
		let calldata = await callResponse.json();
		console.log('Calldata:', calldata);
		if (calldata == 'success') {
			console.log('OK');
			return {
				signed: true
			};
		} else {
			console.log('NOT OK');

			throw redirect(301, '/auth');
		}
	}
}) satisfies LayoutServerLoad;
