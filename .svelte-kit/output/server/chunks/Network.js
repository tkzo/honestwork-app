import { w as writable } from "./index3.js";
let userConnected = writable(false);
let userAddress = writable("");
let networkSigner = writable("");
let userState = writable(0);
export {
  userAddress as a,
  userState as b,
  networkSigner as n,
  userConnected as u
};
