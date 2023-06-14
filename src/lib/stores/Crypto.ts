import { BigNumber, ethers } from 'ethers';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { listing_abi, nft_abi, starter_abi } from '$lib/stores/ABI';
import { base } from '$app/paths';

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
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
    const genesis = new ethers.Contract(env_pub.PUBLIC_NFT_ADDRESS, nft_abi, provider);
    return await genesis.tokenOfOwnerByIndex(address, 0);
  } catch (err) {
    return -1;
  }
}

export const getStarterTokenID = async (address: string) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ETHEREUM_RPC);
    const starter = new ethers.Contract(env_pub.PUBLIC_STARTER_NFT_ADDRESS, starter_abi, provider);
    return await starter.tokenOfOwnerByIndex(address, 0);
  } catch (err) {
    return -1;
  }
}

export const getInitialNFT = async (address: string, fetch: any) => {
  const member_id = await getMemberTokenID(address);
  const starter_id = await getStarterTokenID(address);
  if (member_id != -1) {
    const token_data = await fetch(`${base}/api/alchemy/${env_pub.PUBLIC_NFT_ADDRESS}/${parseInt(member_id)}`);
    const token_json = await token_data.json();
    const token_image = token_json.image;
    return {
      nfturl: token_image,
      nftid: member_id.toString(),
      nftaddress: env_pub.PUBLIC_NFT_ADDRESS,
    }
  } else if (starter_id != -1) {
    const token_data = await fetch(`${base}/api/alchemy/${env_pub.PUBLIC_STARTER_NFT_ADDRESS}/${parseInt(starter_id)}`);
    const token_json = await token_data.json();
    const token_image = token_json.image;
    return {
      nfturl: token_image,
      nftid: starter_id.toString(),
      nftaddress: env_pub.PUBLIC_STARTER_NFT_ADDRESS,
    }
  } else {
    return {
      nfturl: "",
      nftid: -1,
      nftaddress: "",
    }
  }
}

export const checkMembership = async (address: string) => {
  let member_id = await getMemberTokenID(address);
  let starter_id = await getStarterTokenID(address);
  if (member_id != -1) {
    return true;
  } else if (starter_id != -1) {
    return true;
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
    const starter_id = await getStarterTokenID(address);
    if (starter_id != -1) {
      return 1;
    } else {
      return 0;
    }
  }
}

export const getSkillLimit = async (address: string) => {
  const tier = await getGenesisTier(address);
  if (tier == 1) {
    return 3;
  } else if (tier == 2) {
    return 6;
  } else if (tier == 3) {
    return 8;
  } else {
    const starter_id = await getStarterTokenID(address);
    if (starter_id != -1) {
      return 1;
    } else {
      return 0;
    }
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
