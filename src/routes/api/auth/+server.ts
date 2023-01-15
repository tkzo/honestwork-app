import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = ({ url, cookies }) => {
	const userSignature = cookies.get('honestwork_signature');
	const userSalt = cookies.get('honestwork_salt');
	const address = url.searchParams.get('honestwork_address');

	if (userSignature && userSalt && address) {
		validateSignature(address, userSignature, userSalt);
		throw redirect(301, `/profile`);
	}
	throw redirect(301, '/create_account');
};

const validateSignature = async (address: string, userSignature: string, userSalt: string) => {
	const apiUrl =
		parseInt(env.PRODUCTION_ENV) == 1
			? env.PRIVATE_HONESTWORK_API
			: env.PRIVATE_LOCAL_HONESTWORK_API;
	const url = `${apiUrl}/users/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
	} else {
		console.log('HTTP-Error: ' + response.status);
		throw '';
	}
};
