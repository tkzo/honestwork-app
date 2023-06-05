import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { BigNumber, ethers } from 'ethers';
import { nft_abi } from '$lib/stores/ABI';

export const GET: RequestHandler = async ({ params }) => {
  let token_id: BigNumber = BigNumber.from(0);
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
    const NFT = new ethers.Contract(env_pub.PUBLIC_NFT_ADDRESS, nft_abi, provider);
    token_id = await NFT.tokenOfOwnerByIndex(params.address, 0);
  } catch (err: any) {
    throw error(500, err.body.message);
  }
  return json({
    token_id: token_id.toString()
  });
};
