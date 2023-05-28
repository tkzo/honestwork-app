import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { ethers } from 'ethers';
import { nft_abi } from '$lib/stores/ABI';

export const GET: RequestHandler = async ({ }) => {
  let image_url: string = '';
  let next_id: number = 0;
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
    const contract = new ethers.Contract(env_pub.PUBLIC_NFT_ADDRESS, nft_abi, provider);
    next_id = parseInt(await contract._tokenIds()) + 1;
    image_url = `https://honestwork-userfiles.fra1.cdn.digitaloceanspaces.com/genesis-nft/${next_id}.png`;
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json({
    image_url: image_url,
    next_id: next_id
  });
};
