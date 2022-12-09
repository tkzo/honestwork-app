import type { RequestHandler } from './$types';
import { invalid, redirect } from '@sveltejs/kit';

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
	const url = `http://localhost:3000/v1/api/users/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		console.log(json);
		console.log(address);
	} else {
		console.log('HTTP-Error: ' + response.status);
		throw invalid(401);
	}
};
