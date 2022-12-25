import { c as create_ssr_component, b as subscribe } from "../../../../chunks/index.js";
import { n as networkSigner, d as userState, u as userConnected } from "../../../../chunks/Network.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-1yqn907{width:258px;display:flex;flex-direction:column;background-color:var(--color-dark);border-width:1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.gm.svelte-1yqn907{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:12px;display:flex;flex-direction:column;align-items:center;text-align:center;cursor:pointer}.gm-inner.svelte-1yqn907{display:flex;flex-direction:row;align-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_networkSigner;
  let $userState, $$unsubscribe_userState;
  let $userConnected, $$unsubscribe_userConnected;
  $$unsubscribe_networkSigner = subscribe(networkSigner, (value) => value);
  $$unsubscribe_userState = subscribe(userState, (value) => $userState = value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$result.css.add(css);
  $$unsubscribe_networkSigner();
  $$unsubscribe_userState();
  $$unsubscribe_userConnected();
  return `${$$result.head += `<!-- HEAD_svelte-9gbldk_START -->${$$result.title = `<title>Mint</title>`, ""}<meta name="${"description"}" content="${"HonestWork Minting Page"}"><!-- HEAD_svelte-9gbldk_END -->`, ""}

${$userConnected ? `${$userState == 0 ? `<section class="${"svelte-1yqn907"}"><div class="${"gm svelte-1yqn907"}"><div class="${"gm-inner svelte-1yqn907"}"><img src="${"icons/heart.svg"}" alt="${"Heart"}">
					<div style="${"width:8px"}"></div>
					<p>gm fren</p></div></div>
			<div class="${"gm svelte-1yqn907"}"><p class="${"yellow link"}">mint your nft</p></div></section>` : `<p>thanks for minting</p>`}` : ``}`;
});
export {
  Page as default
};
