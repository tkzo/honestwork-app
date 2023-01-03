import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ethers } from 'ethers';

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('honestwork_address')!;
	const userSignature = cookies.get('honestwork_signature');
	const userSalt = cookies.get('honestwork_salt');

	if (
		userSignature &&
		userSalt &&
		userAddress &&
		userAddress == verifySignature(userSalt, userSignature)
	) {
		return {};
	} else {
		throw redirect(301, '/skills');
	}
};

const verifySignature = (salt: string, signature: string) => {
	return ethers.utils.verifyMessage(salt, signature);
};
