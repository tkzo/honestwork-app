import { c as create_ssr_component, b as subscribe } from "../../../chunks/index.js";
import { u as userConnected } from "../../../chunks/Network.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-10mldoo{width:258px;display:flex;flex-direction:column;background-color:var(--color-dark);border-width:1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.gm.svelte-10mldoo{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:12px;display:flex;flex-direction:column;align-items:center;text-align:center}.gm-inner.svelte-10mldoo{display:flex;flex-direction:row;align-items:center}input.svelte-10mldoo{width:234px}button.svelte-10mldoo{width:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userConnected, $$unsubscribe_userConnected;
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$result.css.add(css);
  $$unsubscribe_userConnected();
  return `${$$result.head += `<!-- HEAD_svelte-1nn52a7_START -->${$$result.title = `<title>HonestWork</title>`, ""}<meta name="${"description"}" content="${"HonestWork"}"><!-- HEAD_svelte-1nn52a7_END -->`, ""}

${$userConnected ? `<section class="${"svelte-10mldoo"}"><div class="${"gm svelte-10mldoo"}"><div class="${"gm-inner svelte-10mldoo"}"><img src="${"icons/heart.svg"}" alt="${"Heart"}">
				<div style="${"width:8px"}"></div>
				<p>gm fren (<span class="${"yellow"}">2/2</span>)</p></div></div>
		<form method="${"POST"}"><div class="${"gm svelte-10mldoo"}"><p class="${"light-40"}">just so we can call you by your preferred name;</p>
				<div style="${"height:8px"}"></div>
				<input type="${"text"}" placeholder="${"<enter name>(must)"}" class="${"svelte-10mldoo"}">
				<div style="${"height:16px"}"></div>

				<p class="${"light-40"}">or if you want to receive email notifications;</p>
				<div style="${"height:8px"}"></div>
				<input class="${"passive-input svelte-10mldoo"}" type="${"text"}" placeholder="${"<enter email>(optional)"}"></div>
			<button class="${"svelte-10mldoo"}"><div class="${"gm svelte-10mldoo"}"><p class="${"yellow"}">create account</p></div></button></form>
		<div class="${"gm svelte-10mldoo"}"><p>skip for now</p></div></section>` : ``}`;
});
export {
  Page as default
};
