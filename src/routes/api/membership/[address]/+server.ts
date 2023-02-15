import type { RequestHandler } from '../../$types';
import { json } from '@sveltejs/kit';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { ethers } from 'ethers';
import { nft_abi } from '$lib/stores/Constants';
import { get } from 'svelte/store';
import { userAddress } from '$lib/stores/Network';

export const GET: RequestHandler = async () => {
	let state;
	try {
		const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
		const contract = new ethers.Contract(
			env_pub.PUBLIC_MEMBERSHIP_TOKEN_ADDRESS,
			nft_abi,
			provider
		);
		state = await contract.getUserState(get(userAddress));
	} catch (err) {
		console.log('error:', err);
	}
	return json({ state: state });
};
