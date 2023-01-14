import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { ethers } from 'ethers';

const apiUrl =
	parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

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
		let jobs = await getJobs(userAddress);
		return { jobs: jobs };
	} else {
		throw redirect(301, '/create_account');
	}
};
const verifySignature = (salt: string, signature: string) => {
	return ethers.utils.verifyMessage(salt, signature);
};
const getJobs = async (address: string) => {
	const url = `${apiUrl}/jobs/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		return { json };
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};
