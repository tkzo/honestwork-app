import { e as env, w as writable } from "./env-public.js";
import { ethers } from "ethers";
let userConnected = writable(false);
let userAddress = writable("");
let networkSigner = writable();
let userState = writable(-1);
let connecting = writable(false);
let chainName = writable("");
env.PUBLIC_MEMBERSHIP_TOKEN_ADDRESS;
let nodeProvider = writable();
const connectNode = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(env.PUBLIC_ETHEREUM_RPC);
    nodeProvider.set(provider);
  } catch (err) {
    console.log("error:", err);
  }
};
export {
  userAddress as a,
  chainName as b,
  connecting as c,
  userState as d,
  nodeProvider as e,
  connectNode as f,
  networkSigner as n,
  userConnected as u
};
