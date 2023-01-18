import { w as writable, e as env } from "./env-public.js";
import { ethers } from "ethers";
import "@xmtp/xmtp-js";
import "./index.js";
const ToastItem_svelte_svelte_type_style_lang = "";
const SvelteToast_svelte_svelte_type_style_lang = "";
let metadata = { title: "" };
let chosen_skill_slot = writable(-1);
let chosen_job_slot = writable(-1);
let skill_upload_urls = writable([Array]);
let skill_add = writable(false);
let changes_made = writable(false);
let submitting = writable(false);
let new_conversation_address = writable("");
let new_conversation_metadata = writable(metadata);
writable(Array());
writable(Array());
let userConnected = writable(false);
let userAddress = writable("");
let networkProvider = writable();
let networkSigner = writable();
let userState = writable(-1);
let connecting = writable(false);
let chainName = writable("");
env.PUBLIC_MEMBERSHIP_TOKEN_ADDRESS;
let nodeProvider = writable();
let xmtpClient = writable();
let xmtpConnected = writable(false);
let xmtpConnecting = writable(false);
const connectNode = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(env.PUBLIC_ETHEREUM_RPC);
    nodeProvider.set(provider);
  } catch (err) {
    console.log("error:", err);
  }
};
connectNode();
export {
  chainName as a,
  xmtpConnecting as b,
  connecting as c,
  userAddress as d,
  userState as e,
  nodeProvider as f,
  xmtpClient as g,
  new_conversation_metadata as h,
  new_conversation_address as i,
  networkProvider as j,
  chosen_job_slot as k,
  changes_made as l,
  chosen_skill_slot as m,
  networkSigner as n,
  skill_add as o,
  submitting as p,
  connectNode as q,
  skill_upload_urls as s,
  userConnected as u,
  xmtpConnected as x
};
