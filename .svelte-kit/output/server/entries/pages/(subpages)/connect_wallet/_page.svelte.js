import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../../../chunks/index.js";
import { n as networkSigner, a as userAddress, u as userConnected, d as userState } from "../../../../chunks/Network.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-10mldoo{width:258px;display:flex;flex-direction:column;background-color:var(--color-dark);border-width:1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.gm.svelte-10mldoo{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:12px;display:flex;flex-direction:column;align-items:center;text-align:center}.gm-inner.svelte-10mldoo{display:flex;flex-direction:row;align-items:center}input.svelte-10mldoo{width:234px}button.svelte-10mldoo{width:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_networkSigner;
  let $$unsubscribe_userAddress;
  let $userConnected, $$unsubscribe_userConnected;
  $$unsubscribe_networkSigner = subscribe(networkSigner, (value) => value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  let name, email;
  $$result.css.add(css);
  $$unsubscribe_networkSigner();
  $$unsubscribe_userAddress();
  $$unsubscribe_userConnected();
  return `${$$result.head += `<!-- HEAD_svelte-1nn52a7_START -->${$$result.title = `<title>HonestWork</title>`, ""}<meta name="${"description"}" content="${"HonestWork"}"><!-- HEAD_svelte-1nn52a7_END -->`, ""}

${!$userConnected ? `<section class="${"svelte-10mldoo"}"><div class="${"gm svelte-10mldoo"}"><div class="${"gm-inner svelte-10mldoo"}"><img src="${"icons/heart.svg"}" alt="${"Heart"}">
				<div style="${"width:8px"}"></div>
				<p>gm fren (<span class="${"yellow"}">1/2</span>)</p></div></div>
		<div class="${"gm svelte-10mldoo"}"><p class="${"light-60"}">to be able to create a profile or create job listings; you need to connect your wallet.
			</p></div>
		<div class="${"gm link svelte-10mldoo"}"><p class="${"yellow"}">connect wallet</p></div>
		<div class="${"gm svelte-10mldoo"}"><p>skip for now</p></div></section>` : `${userState == 1 ? `<section class="${"svelte-10mldoo"}"><div class="${"gm svelte-10mldoo"}"><div class="${"gm-inner svelte-10mldoo"}"><img src="${"icons/heart.svg"}" alt="${"Heart"}">
				<div style="${"width:8px"}"></div>
				<p>gm fren (<span class="${"yellow"}">2/2</span>)</p></div></div>
		<div class="${"gm svelte-10mldoo"}"><p class="${"light-40"}">just so we can call you by your preferred name;</p>
			<div style="${"height:8px"}"></div>
			<input type="${"text"}" placeholder="${"<enter name>(must)"}" class="${"svelte-10mldoo"}"${add_attribute("value", name, 0)}>
			<div style="${"height:16px"}"></div>
			<p class="${"light-40"}">or if you want to receive email notifications;</p>
			<div style="${"height:8px"}"></div>
			<input class="${"passive-input svelte-10mldoo"}" type="${"text"}" placeholder="${"<enter email>(optional)"}"${add_attribute("value", email, 0)}></div>
		<button action="${"submit"}" class="${"svelte-10mldoo"}"><div class="${"gm svelte-10mldoo"}"><p class="${"yellow"}">create account</p></div></button>
		<div class="${"gm svelte-10mldoo"}"><p>skip for now</p></div></section>` : ``}`}`;
});
export {
  Page as default
};
