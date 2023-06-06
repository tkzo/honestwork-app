import { BigNumber, ethers } from 'ethers';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { listing_abi, nft_abi } from '$lib/stores/ABI';

export const verifyMember = (salt: string, address: string, signature: string) => {
  const msg_raw = "HonestWork: Login\n" +
    salt + "\n" +
    "\n" +
    "For more info: https://docs.honestwork.app";
  const addr = ethers.utils.verifyMessage(msg_raw, signature);
  if (addr == address) {
    return true;
  }
  return false;
}

export const getMemberTokenID = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
  const genesis = new ethers.Contract(env_pub.PUBLIC_NFT_ADDRESS, nft_abi, provider);
  return await genesis.tokenOfOwnerByIndex(address, 0);
}



export const checkMembership = async (address: string) => {
  let state: BigNumber = BigNumber.from(0);
  try {
    // todo: add starter nft
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
    const genesis = new ethers.Contract(env_pub.PUBLIC_NFT_ADDRESS, nft_abi, provider);
    state = await genesis.getUserTier(address);
  } catch (err) {
    return false;
  } finally {
    if (state.toNumber() > 0) {
      return true;
    }
  }
  return false;
}

export const getGenesisTier = async (address: string) => {
  let state: BigNumber = BigNumber.from(0);
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
    const genesis = new ethers.Contract(env_pub.PUBLIC_NFT_ADDRESS, nft_abi, provider);
    state = await genesis.getUserTier(address);
  } catch (err) {
    return 0;
  } finally {
    return state.toNumber();
  }
}

export const getApplicationLimit = async (address: string) => {
  const tier = await getGenesisTier(address);
  if (tier == 1) {
    return 2;
  } else if (tier == 2) {
    return 3;
  } else if (tier == 3) {
    return 5;
  } else {
    return 0;
  }
}

export const checkPayment = async (user_address: string, token_address: string, amount: BigNumber, tx_hash: string) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ARBITRUM_RPC);
    const tx = await provider.getTransaction(tx_hash)
    if (tx.chainId != 42161) {
      return false;
    }
    if (tx.from != user_address) {
      return false;
    }
    if (tx.to != env_pub.PUBLIC_LISTING_ADDRESS) {
      return false;
    }
    const receipt = await provider.getTransactionReceipt(tx_hash);
    receipt.logs.forEach((log) => {
      const iface = new ethers.utils.Interface(listing_abi);
      const parsed = iface.parseLog(log);
      if (parsed.name == "PaymentAdded") {
        if (parsed.args[0] == token_address) {
          if (parsed.args[1] == amount) {
            return true;
          }
        }
      }
    });
  } catch (err) {
    return false;
  }
  return false;
}

// todo: move to constants store
export const calculatePayment = (sticky_duration: number) => {
  const service_fee = 10;
  if (sticky_duration == 0) {
    return BigNumber.from(service_fee);
  }
  if (sticky_duration == 7) {
    return BigNumber.from(49 + service_fee);
  }
  if (sticky_duration == 14) {
    return BigNumber.from(69 + service_fee);
  }
  if (sticky_duration == 30) {
    return BigNumber.from(99 + service_fee);
  }
}
