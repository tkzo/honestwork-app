import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('address');
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');

	if (userSignature && userSalt && userAddress) {
		// let json = await validateSignature(userAddress, userSignature, userSalt);
		// return {
		// 	username: json.username,
		// 	show_ens: json.show_ens,
		// 	title: json.title,
		// 	image_url: json.image_url,
		// 	show_nft: json.show_nft,
		// 	nft_address: json.nft_address,
		// 	nft_id: json.nft_id,
		// 	email: json.email,
		// 	timezone: json.timezone,
		// 	bio: json.bio,
		// 	links: json.links,
		// 	skills: json.skills
		// };
		return { user: await validateSignature(userAddress, userSignature, userSalt) };
	} else {
		throw redirect(301, '/create_account');
	}
};

const validateSignature = async (address: string, userSignature: string, userSalt: string) => {
	const url = `http://localhost:3000/api/v1/users/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		if (json.salt != userSalt || json.signature != userSignature) {
			throw 404;
		}
		return json;
	} else {
		console.log('HTTP-Error: ' + response.status);
	}
};
