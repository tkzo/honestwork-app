// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = ({ cookies, params }: Parameters<PageServerLoad>[0]) => {
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');

	if (userSignature && userSalt) {
		validateSignature(params.slug, userSignature, userSalt);
		return redirect(301, `/profile/${params.slug}`);
	}
	return redirect(301, '/');
};

const validateSignature = async (address: string, userSignature: string, userSalt: string) => {
	const url = `http://localhost:3000/users/${address}/${userSalt}/${userSignature}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		console.log(json);
	} else {
		alert('HTTP-Error: ' + response.status);
	}
};
