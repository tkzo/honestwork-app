import { c as create_ssr_component, b as subscribe, e as escape } from "../../../chunks/index.js";
import { n as networkSigner } from "../../../chunks/Network.js";
import "@xmtp/xmtp-js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_networkSigner;
  $$unsubscribe_networkSigner = subscribe(networkSigner, (value) => value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_networkSigner();
  return `${escape(data.conversations)}

<p>CREATE CONVERSATION</p>`;
});
export {
  Page as default
};
