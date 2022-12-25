import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape, f as each, v as validate_component } from "../../chunks/index.js";
import { u as userConnected, c as connecting, a as userAddress, b as chainName, d as userState } from "../../chunks/Network.js";
import { p as page } from "../../chunks/stores.js";
import { t as theme, a as themeLoaded } from "../../chunks/Theme.js";
const Navigation_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "img.svelte-r0g669{width:16px;height:16px}main.svelte-r0g669{background:var(--color-light-2);border-width:1px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:fixed;width:100%;z-index:99;height:32px}.logo-section.svelte-r0g669{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.menu-section.svelte-r0g669{position:absolute;display:flex;flex-direction:row;transform:translate(-50%, 0);left:50%;align-items:center;justify-content:center}.right-section.svelte-r0g669{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;box-sizing:border-box}.wallet-section.svelte-r0g669{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.messages.svelte-r0g669{height:100%;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:row;align-items:center;padding:0px 8px}",
  map: null
};
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $userConnected, $$unsubscribe_userConnected;
  let $connecting, $$unsubscribe_connecting;
  let $userAddress, $$unsubscribe_userAddress;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_connecting = subscribe(connecting, (value) => $connecting = value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  $$result.css.add(css$3);
  $$unsubscribe_page();
  $$unsubscribe_userConnected();
  $$unsubscribe_connecting();
  $$unsubscribe_userAddress();
  return `<main class="${"svelte-r0g669"}"><div class="${"logo-section svelte-r0g669"}"><a href="${"/"}"><p class="${"yellow semibold link"}">HONESTWORK</p></a>
		<div style="${"width:8px"}"></div>
		<p class="${"light-40"}">v0.10</p></div>
	<div class="${"menu-section svelte-r0g669"}"><a href="${"/jobs"}"><p${add_attribute(
    "class",
    $page.route.id == "/jobs" ? "yellow semibold link" : "light-60 semibold link",
    0
  )}>jobs
			</p></a>
		<div style="${"width:12px"}"></div>
		<a href="${"/skills"}"><p${add_attribute(
    "class",
    $page.route.id == "/skills" ? "yellow semibold link" : "light-60 semibold link",
    0
  )}>skills
			</p></a></div>
	<div class="${"right-section svelte-r0g669"}"><a class="${"messages svelte-r0g669"}" href="${"/messages"}"><p class="${"light-40"}">messages(<span class="${"yellow"}">4</span>)</p></a>
		<div class="${"wallet-section svelte-r0g669"}">${!$userConnected ? `${$connecting ? `<img src="${"icons/loader.svg"}" alt="${"loading"}" class="${"rotating svelte-r0g669"}">` : ``}
				<div style="${"width:4px"}"></div>
				<p class="${"yellow semibold link"}">connect</p>` : `<p class="${"light-40"}">${escape($userAddress.substring(0, 6))}...${escape($userAddress.substring($userAddress.length - 4))}</p>
				<div style="${"width:8px"}"></div>
				<a${add_attribute("href", `/api/auth?address=${$userAddress}`, 0)}><p class="${"yellow semibold link"}">profile</p></a>`}</div></div>
</main>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "img.svelte-c2ekxd{height:16px;width:16px}main.svelte-c2ekxd{background:var(--color-light-2);border-width:1px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:fixed;bottom:0px;width:100%;z-index:99;height:32px}.brand-section.svelte-c2ekxd{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.social-section.svelte-c2ekxd{display:flex;flex-direction:row;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.sitemap-section.svelte-c2ekxd{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.network-section.svelte-c2ekxd{height:32px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.left-container.svelte-c2ekxd{display:flex;flex-direction:row;align-items:center}.right-container.svelte-c2ekxd{display:flex;flex-direction:row-reverse;align-items:center}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $chainName, $$unsubscribe_chainName;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_chainName = subscribe(chainName, (value) => $chainName = value);
  let pages = [
    { name: "faq", path: "/" },
    { name: "terms", path: "/" },
    { name: "privacy", path: "/" }
  ];
  $$result.css.add(css$2);
  $$unsubscribe_theme();
  $$unsubscribe_chainName();
  return `<main class="${"svelte-c2ekxd"}"><div class="${"left-container svelte-c2ekxd"}"><div class="${"brand-section svelte-c2ekxd"}"><a href="${"https://decoded-labs.com"}" target="${"_blank"}" rel="${"noreferrer"}"><p class="${"light-40 semibold"}">ⓒ <span class="${"link"}">decoded</span></p></a></div>

		<div class="${"sitemap-section svelte-c2ekxd"}">${each(pages, (page2) => {
    return `<a${add_attribute("href", page2.path, 0)}><p class="${"light-40 link"}">${escape(page2.name)}</p></a>
				<div style="${"width:8px"}"></div>`;
  })}</div>
		<div class="${"social-section svelte-c2ekxd"}"><img${add_attribute("src", `icons/${$theme == "light" ? "light/" : ""}github.svg`, 0)} alt="${"Github"}" class="${"svelte-c2ekxd"}">
			<div style="${"width:8px"}"></div>
			<img${add_attribute("src", `icons/${$theme == "light" ? "light/" : ""}twitter.svg`, 0)} alt="${"Twitter"}" class="${"svelte-c2ekxd"}">
			<div style="${"width:8px"}"></div>
			<img${add_attribute("src", `icons/${$theme == "light" ? "light/" : ""}discord.svg`, 0)} alt="${"Discord"}" class="${"svelte-c2ekxd"}"></div></div>
	<div class="${"right-container svelte-c2ekxd"}"><div class="${"network-section svelte-c2ekxd"}"><p class="${"light-40 semibold"}">NETWORK <span class="${"yellow"}">${escape($chainName)}</span></p></div>
		<div class="${"network-section svelte-c2ekxd"}"><p class="${"light-40 semibold link"}">${escape($theme == "light" ? "dark mode" : "light mode")}</p></div></div>
</main>`;
});
const Notification_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "main.svelte-vhayxs{width:100vw;display:flex;flex-direction:column;align-items:center}.bar.svelte-vhayxs{width:520px;border-width:0px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);padding:8px;display:flex;flex-direction:row;justify-content:center;align-items:center;box-sizing:border-box}",
  map: null
};
const Notification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userState, $$unsubscribe_userState;
  let $userConnected, $$unsubscribe_userConnected;
  let $page, $$unsubscribe_page;
  $$unsubscribe_userState = subscribe(userState, (value) => $userState = value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_userState();
  $$unsubscribe_userConnected();
  $$unsubscribe_page();
  return `<main class="${"svelte-vhayxs"}">${$userState != -1 ? `${(!$userConnected || $userState == 0) && $page.route.id != "/mint" ? `<div class="${"bar svelte-vhayxs"}"><p class="${"light-80"}">you&#39;re in guest mode</p>
				<div style="${"width:8px"}"></div>
				<p>😱</p>
				<div style="${"width:8px"}"></div>
				<p class="${"light-80"}">-&gt;</p>
				<div style="${"width:8px"}"></div>
				<a href="${"/mint"}"><p class="${"yellow semibold link"}">mint your pass now</p></a></div>` : `${$userState == 1 ? `<div class="${"bar svelte-vhayxs"}"><p class="${"light-80"}">your nft is not soulbound.</p>
				<div style="${"width:8px"}"></div>
				<p>😱</p>
				<div style="${"width:8px"}"></div>
				<p class="${"light-80"}">-&gt;</p>
				<div style="${"width:8px"}"></div>
				<a href="${"/bind"}"><p class="${"yellow semibold link"}">bind your nft now</p></a></div>` : ``}`}` : ``}
</main>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-d4mzl4{width:100%;position:relative;display:flex;flex-direction:column;align-items:center;background-color:var(--color-dark)}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $themeLoaded, $$unsubscribe_themeLoaded;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_themeLoaded = subscribe(themeLoaded, (value) => $themeLoaded = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$result.css.add(css);
  $$unsubscribe_themeLoaded();
  $$unsubscribe_theme();
  return `${$$result.head += `<!-- HEAD_svelte-yg828c_START --><script async src="${"https://www.googletagmanager.com/gtag/js?id=G-3X3Y5X23HN"}"></script><script>if (typeof window !== 'undefined' && window) {
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-3X3Y5X23HN');
		}
	</script><link rel="${"stylesheet"}" href="${"/styles.css"}">${$themeLoaded ? `<link rel="${"stylesheet"}"${add_attribute("href", `/${$theme}.css`, 0)}>` : ``}<!-- HEAD_svelte-yg828c_END -->`, ""}

<main class="${"svelte-d4mzl4"}">${$themeLoaded ? `${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})}
		<div style="${"height:64px;"}"></div>
		${validate_component(Notification, "Notification").$$render($$result, {}, {}, {})}
		${slots.default ? slots.default({}) : ``}
		
		${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}` : ``}
</main>`;
});
export {
  Layout as default
};
