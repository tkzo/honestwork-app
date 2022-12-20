import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = ({ url, cookies }) => {
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');
	const address = url.searchParams.get('address');

	if (userSignature && userSalt && address) {
		validateSignature(address, userSignature, userSalt);
		throw redirect(301, `/profile`);
	}
	throw redirect(301, '/create_account');
};

const validateSignature = async (address: string, userSignature: string, userSalt: string) => {
	const url = `${env.PRIVATE_HONESTWORK_API}users/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
	} else {
		console.log('HTTP-Error: ' + response.status);
		throw '';
	}
};
