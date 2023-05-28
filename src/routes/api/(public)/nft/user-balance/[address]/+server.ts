import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { BigNumber, ethers } from 'ethers';
import { erc20_abi } from '$lib/stores/ABI';

export const GET: RequestHandler = async ({ params }) => {
  let balance: BigNumber = BigNumber.from(0);
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
    const contract = new ethers.Contract(env_pub.PUBLIC_MAINNET_DAI_ADDRESS, erc20_abi, provider);
    balance = await contract.balanceOf(params.address);
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json({
    balance: balance
  });
};
