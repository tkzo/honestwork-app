import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { BigNumber, ethers } from 'ethers';
import { nft_abi } from '$lib/stores/ABI';

export const GET: RequestHandler = async ({ params }) => {
	let state: BigNumber = BigNumber.from(0);
	try {
		const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
		const contract = new ethers.Contract(
			env_pub.PUBLIC_MEMBERSHIP_TOKEN_ADDRESS,
			nft_abi,
			provider
		);
		state = await contract.getUserTier(params.address);
	} catch (err) {
		console.log('error:', err);
	}
	return json(state.toNumber());
};
