import { w as writable } from "./index2.js";
import "@xmtp/xmtp-js";
import "./index3.js";
import "./State.js";
let userConnected = writable(false);
let userAddress = writable("");
let networkProvider = writable();
let networkSigner = writable();
let chainID = writable(0);
let userState = writable(-1);
let connecting = writable(false);
let chainName = writable("");
let nodeProvider = writable();
let xmtpClient = writable();
let xmtpConnected = writable(false);
let xmtpConnecting = writable(false);
export {
  chainName as a,
  xmtpConnecting as b,
  connecting as c,
  userState as d,
  userAddress as e,
  xmtpClient as f,
  chainID as g,
  networkProvider as h,
  nodeProvider as i,
  networkSigner as n,
  userConnected as u,
  xmtpConnected as x
};
