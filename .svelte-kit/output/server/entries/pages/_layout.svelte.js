import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, f as each, v as validate_component } from "../../chunks/index.js";
import { u as userConnected, a as userAddress, b as userState } from "../../chunks/Network.js";
import { p as page } from "../../chunks/stores.js";
const Navigation_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "main.svelte-16pvbtl{background:var(--color-dark);border-width:1px 0px;border-style:solid;border-color:rgba(255, 255, 255, 0.2);box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.logo-section.svelte-16pvbtl{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:rgba(255, 255, 255, 0.2);box-sizing:border-box}.menu-section.svelte-16pvbtl{position:absolute;display:flex;flex-direction:row;transform:translate(-50%, 0);left:50%;align-items:center;justify-content:center}.wallet-section.svelte-16pvbtl{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 0px 0px 1px;border-style:solid;border-color:rgba(255, 255, 255, 0.2);box-sizing:border-box}",
  map: null
};
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $userConnected, $$unsubscribe_userConnected;
  let $userAddress, $$unsubscribe_userAddress;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  $$result.css.add(css$3);
  $$unsubscribe_page();
  $$unsubscribe_userConnected();
  $$unsubscribe_userAddress();
  return `<main class="${"svelte-16pvbtl"}"><div class="${"logo-section svelte-16pvbtl"}"><a href="${"/"}"><p class="${"yellow semibold"}">honestwork</p></a>
		<div style="${"width:8px"}"></div>
		<p class="${"light-40 "}">v0.10</p></div>
	<div class="${"menu-section svelte-16pvbtl"}"><a href="${"/jobs"}"><p${add_attribute(
    "class",
    $page.route.id == "/jobs" ? "yellow semibold link" : "light-40 link",
    0
  )}>jobs</p></a>
		<div style="${"width:8px"}"></div>
		<a href="${"/creators"}"><p${add_attribute(
    "class",
    $page.route.id == "/creators" ? "yellow semibold link" : "light-40 link",
    0
  )}>creators
			</p></a></div>
	<div class="${"wallet-section svelte-16pvbtl"}">${!$userConnected ? `<p class="${"yellow semibold link"}">connect</p>` : `<p class="${"light-40"}">${escape($userAddress.substring(0, 6))}...${escape($userAddress.substring($userAddress.length - 4))}</p>
			<div style="${"width:8px"}"></div>
			<a${add_attribute("href", `/api/auth?address=${$userAddress}`, 0)}><p class="${"yellow semibold"}">takez0_o</p></a>`}</div>
</main>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "main.svelte-6fxnr9{background:var(--color-dark);border-width:1px 0px;border-style:solid;border-color:rgba(255, 255, 255, 0.2);box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.brand-section.svelte-6fxnr9{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:rgba(255, 255, 255, 0.2);box-sizing:border-box}.social-section.svelte-6fxnr9{display:flex;flex-direction:row;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:rgba(255, 255, 255, 0.2);box-sizing:border-box}.sitemap-section.svelte-6fxnr9{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 0px 0px 1px;border-style:solid;border-color:rgba(255, 255, 255, 0.2);box-sizing:border-box}.left-container.svelte-6fxnr9{display:flex;flex-direction:row;align-items:center}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pages = [
    { name: "faq", path: "/" },
    { name: "terms", path: "/" },
    { name: "privacy", path: "/" },
    { name: "docs", path: "/" },
    { name: "contact", path: "/" }
  ];
  $$result.css.add(css$2);
  return `<main class="${"svelte-6fxnr9"}"><div class="${"left-container svelte-6fxnr9"}"><div class="${"brand-section svelte-6fxnr9"}"><p class="${"light-40 semibold"}">\u24D2 2022 decoded-labs</p></div>
		<div class="${"social-section svelte-6fxnr9"}"><img src="${"icons/github.svg"}" alt="${"Github"}">
			<div style="${"width:8px"}"></div>
			<img src="${"icons/twitter.svg"}" alt="${"Twitter"}">
			<div style="${"width:8px"}"></div>
			<img src="${"icons/discord.svg"}" alt="${"Discord"}"></div></div>

	<div class="${"sitemap-section svelte-6fxnr9"}">${each(pages, (page2) => {
    return `<a${add_attribute("href", page2.path, 0)}><p class="${"light-40 link"}">${escape(page2.name)}</p></a>
			<div style="${"width:8px"}"></div>`;
  })}</div>
</main>`;
});
const Notification_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "main.svelte-1xsb4bn{width:100vw;display:flex;flex-direction:column;align-items:center}.bar.svelte-1xsb4bn{width:520px;border-width:0px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);padding:8px;display:flex;flex-direction:row;justify-content:center;align-items:center}",
  map: null
};
const Notification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userConnected, $$unsubscribe_userConnected;
  let $userState, $$unsubscribe_userState;
  let $page, $$unsubscribe_page;
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_userState = subscribe(userState, (value) => $userState = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_userConnected();
  $$unsubscribe_userState();
  $$unsubscribe_page();
  return `<main class="${"svelte-1xsb4bn"}">${(!$userConnected || $userState == 0 || $userState == 1) && $page.route.id != "/connect_wallet" ? `<div class="${"bar svelte-1xsb4bn"}"><p class="${"light-40"}">you&#39;re in guest mode</p>
			<div style="${"width:8px"}"></div>
			<p>\u{1F631}</p>
			<div style="${"width:8px"}"></div>

			<p class="${"light-40"}">-&gt;</p>
			<div style="${"width:8px"}"></div>

			<p class="${"yellow semibold link"}">mint your pass now</p></div>` : ``}
</main>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-tyxdkg{height:100vh;width:100vw;display:flex;flex-direction:column}.content.svelte-tyxdkg{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="${"svelte-tyxdkg"}">${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})}
	${validate_component(Notification, "Notification").$$render($$result, {}, {}, {})}
	<div class="${"content svelte-tyxdkg"}">${slots.default ? slots.default({}) : ``}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</main>`;
});
export {
  Layout as default
};
