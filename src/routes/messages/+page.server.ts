import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ethers } from 'ethers';
import { env } from '$env/dynamic/private';

const apiUrl =
	parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('honestwork_address')!;
	const userSignature = cookies.get('honestwork_signature');

	const callUrl = `${apiUrl}/verify/${userAddress}/${userSignature}`;
	let callResponse = await fetch(callUrl);
	let calldata = await callResponse.json();
	if (calldata == 'success') {
		return {};
	} else {
		throw redirect(301, '/mint');
	}
};

const verifySignature = (salt: string, signature: string) => {
	return ethers.utils.verifyMessage(salt, signature);
};
