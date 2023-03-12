import { c as create_ssr_component, i as identity, b as subscribe, o as onDestroy, v as validate_component, m as missing_component, d as add_attribute, e as each, f as escape, g as null_to_empty, h as createEventDispatcher } from "../../chunks/index3.js";
import { u as userConnected, x as xmtpConnected, c as connecting, a as chainName, b as xmtpConnecting, d as userState, e as userAddress } from "../../chunks/Network.js";
import { p as page } from "../../chunks/stores.js";
import { a as assets, b as base } from "../../chunks/paths.js";
import { u as user_signed_in } from "../../chunks/State.js";
import { n as notifications } from "../../chunks/Constants.js";
import { Buffer } from "buffer";
import LogRocket from "logrocket";
import { t as toast } from "../../chunks/stores2.js";
import { t as tweened } from "../../chunks/index4.js";
const css$5 = {
  code: "._toastItem.svelte-95rq8t{width:var(--toastWidth, 16rem);height:var(--toastHeight, auto);min-height:var(--toastMinHeight, 3.5rem);margin:var(--toastMargin, 0 0 0.5rem 0);padding:var(--toastPadding, 0);background:var(--toastBackground, rgba(66, 66, 66, 0.9));color:var(--toastColor, #fff);box-shadow:var(\n    --toastBoxShadow,\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\n  );border:var(--toastBorder, none);border-radius:var(--toastBorderRadius, 0.125rem);position:relative;display:flex;flex-direction:row;align-items:center;overflow:hidden;will-change:transform, opacity;-webkit-tap-highlight-color:transparent}._toastMsg.svelte-95rq8t{padding:var(--toastMsgPadding, 0.75rem 0.5rem);flex:1 1 0%}.pe.svelte-95rq8t,._toastMsg.svelte-95rq8t a{pointer-events:auto}._toastBtn.svelte-95rq8t{width:var(--toastBtnWidth, 2rem);height:var(--toastBtnHeight, 100%);cursor:pointer;outline:none}._toastBtn.svelte-95rq8t::after{content:var(--toastBtnContent, '✕');font:var(--toastBtnFont, 1rem sans-serif);display:flex;align-items:center;justify-content:center}._toastBar.svelte-95rq8t{top:var(--toastBarTop, auto);right:var(--toastBarRight, auto);bottom:var(--toastBarBottom, 0);left:var(--toastBarLeft, 0);height:var(--toastBarHeight, 6px);width:var(--toastBarWidth, 100%);position:absolute;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;pointer-events:none}._toastBar.svelte-95rq8t::-webkit-progress-bar{background:transparent}._toastBar.svelte-95rq8t::-webkit-progress-value{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}._toastBar.svelte-95rq8t::-moz-progress-bar{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}",
  map: null
};
const ToastItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progress, $$unsubscribe_progress;
  let { item } = $$props;
  const progress = tweened(item.initial, { duration: item.duration, easing: identity });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  const close = () => toast.pop(item.id);
  const autoclose = () => {
    if ($progress === 1 || $progress === 0) {
      close();
    }
  };
  let next = item.initial;
  let componentProps = {};
  const check = (prop, kind = "undefined") => typeof prop === kind;
  onDestroy(() => {
    if (check(item.onpop, "function")) {
      item.onpop(item.id);
    }
  });
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$5);
  {
    if (!check(item.progress)) {
      item.next = item.progress;
    }
  }
  {
    if (next !== item.next) {
      next = item.next;
      progress.set(next).then(autoclose);
    }
  }
  {
    if (item.component) {
      const { props = {}, sendIdTo } = item.component;
      componentProps = {
        ...props,
        ...sendIdTo && { [sendIdTo]: item.id }
      };
    }
  }
  $$unsubscribe_progress();
  return `<div class="${["_toastItem svelte-95rq8t", item.pausable ? "pe" : ""].join(" ").trim()}"><div role="${"status"}" class="${["_toastMsg svelte-95rq8t", item.component ? "pe" : ""].join(" ").trim()}">${item.component ? `${validate_component(item.component.src || missing_component, "svelte:component").$$render($$result, Object.assign(componentProps), {}, {})}` : `<!-- HTML_TAG_START -->${item.msg}<!-- HTML_TAG_END -->`}</div>
  ${item.dismissable ? `<div class="${"_toastBtn pe svelte-95rq8t"}" role="${"button"}" tabindex="${"0"}"></div>` : ``}
  <progress class="${"_toastBar svelte-95rq8t"}"${add_attribute("value", $progress, 0)}></progress>
</div>`;
});
const css$4 = {
  code: "._toastContainer.svelte-1u812xz{top:var(--toastContainerTop, 1.5rem);right:var(--toastContainerRight, 2rem);bottom:var(--toastContainerBottom, auto);left:var(--toastContainerLeft, auto);position:fixed;margin:0;padding:0;list-style-type:none;pointer-events:none;z-index:var(--toastContainerZIndex, 9999)}",
  map: null
};
const SvelteToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  let { options = {} } = $$props;
  let { target = "default" } = $$props;
  let items;
  const getCss = (theme) => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "");
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  $$result.css.add(css$4);
  {
    toast._init(target, options);
  }
  items = $toast.filter((i) => i.target === target);
  $$unsubscribe_toast();
  return `<ul class="${"_toastContainer svelte-1u812xz"}">${each(items, (item) => {
    return `<li class="${escape(null_to_empty(item.classes.join(" ")), true) + " svelte-1u812xz"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})}
    </li>`;
  })}
</ul>`;
});
const Navigation_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "img.svelte-1qbw74r{width:16px;height:16px}main.svelte-1qbw74r{background:var(--color-dark);border-width:1px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:fixed;width:100%;z-index:99;height:32px}.logo-section.svelte-1qbw74r{height:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.menu-section.svelte-1qbw74r{position:absolute;display:flex;flex-direction:row;transform:translate(-50%, 0);left:50%;align-items:center;justify-content:center}.right-section.svelte-1qbw74r{height:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;box-sizing:border-box}.wallet-section.svelte-1qbw74r{height:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.messages.svelte-1qbw74r{height:100%;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:row;align-items:center;padding:0px 8px}",
  map: null
};
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $userConnected, $$unsubscribe_userConnected;
  let $xmtpConnected, $$unsubscribe_xmtpConnected;
  let $user_signed_in, $$unsubscribe_user_signed_in;
  let $connecting, $$unsubscribe_connecting;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_xmtpConnected = subscribe(xmtpConnected, (value) => $xmtpConnected = value);
  $$unsubscribe_user_signed_in = subscribe(user_signed_in, (value) => $user_signed_in = value);
  $$unsubscribe_connecting = subscribe(connecting, (value) => $connecting = value);
  $$result.css.add(css$3);
  $$unsubscribe_page();
  $$unsubscribe_userConnected();
  $$unsubscribe_xmtpConnected();
  $$unsubscribe_user_signed_in();
  $$unsubscribe_connecting();
  return `<main class="${"svelte-1qbw74r"}"><div class="${"logo-section svelte-1qbw74r"}"><a href="${"/"}"><p class="${"yellow semibold link"}">h0nestw0rk</p></a>
		<div style="${"width:8px"}"></div>
		<p class="${"light-40"}">alpha</p></div>
	<div class="${"menu-section svelte-1qbw74r"}"><a href="${"/jobs"}"><p${add_attribute(
    "class",
    $page.route.id == "/jobs" ? "yellow semibold" : "light-60  link",
    0
  )}>jobs</p></a>
		<div style="${"width:12px"}"></div>
		<a href="${"/skills"}"><p${add_attribute(
    "class",
    $page.route.id == "/skills" ? "yellow semibold" : "light-60  link",
    0
  )}>skills</p></a></div>
	<div class="${"right-section svelte-1qbw74r"}">${$userConnected && $xmtpConnected && $user_signed_in ? `<a class="${"messages svelte-1qbw74r"}" href="${"/messages"}"><p${add_attribute(
    "class",
    $page.route.id == "/messages" ? "yellow semibold" : "light-60 link",
    0
  )}>messages</p></a>` : `${$userConnected && !$xmtpConnected && $user_signed_in ? `<div class="${"messages svelte-1qbw74r"}"><p class="${"yellow link"}">connect xmtp</p></div>` : ``}`}
		${$userConnected && $user_signed_in ? `<a class="${"messages svelte-1qbw74r"}" href="${"/listings"}"><p${add_attribute(
    "class",
    $page.route.id == "/listings" ? "yellow semibold" : "light-60 link",
    0
  )}>listings</p></a>` : ``}
		<div class="${"wallet-section svelte-1qbw74r"}">${!$userConnected ? `${$connecting ? `<img${add_attribute("src", `${assets}/icons/loader.svg`, 0)} alt="${"loading"}" class="${"rotating svelte-1qbw74r"}">` : ``}
				<div style="${"width:4px"}"></div>
				<p class="${"yellow semibold link"}">connect</p>` : `${$user_signed_in ? `<a${add_attribute("href", `/profile`, 0)}><p${add_attribute(
    "class",
    $page.route.id == "/profile" ? "yellow semibold" : "light-60 link",
    0
  )}>profile</p></a>` : `<a${add_attribute("href", `/auth`, 0)}><p class="${"yellow"}">login</p></a>`}`}</div></div>
</main>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "img.svelte-1l0fqb3{height:16px;width:16px}main.svelte-1l0fqb3{background:var(--color-dark);border-width:1px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center;position:fixed;bottom:0px;width:100%;z-index:99;height:32px}.brand-section.svelte-1l0fqb3{height:30px;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.social-section.svelte-1l0fqb3{height:30px;display:flex;flex-direction:row;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.sitemap-section.svelte-1l0fqb3{height:30px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.network-section.svelte-1l0fqb3{height:30px;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;padding:8px 12px;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.left-container.svelte-1l0fqb3{display:flex;flex-direction:row;align-items:center}.right-container.svelte-1l0fqb3{display:flex;flex-direction:row-reverse;align-items:center}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $chainName, $$unsubscribe_chainName;
  let $xmtpConnecting, $$unsubscribe_xmtpConnecting;
  let $xmtpConnected, $$unsubscribe_xmtpConnected;
  let $userState, $$unsubscribe_userState;
  let $userAddress, $$unsubscribe_userAddress;
  $$unsubscribe_chainName = subscribe(chainName, (value) => $chainName = value);
  $$unsubscribe_xmtpConnecting = subscribe(xmtpConnecting, (value) => $xmtpConnecting = value);
  $$unsubscribe_xmtpConnected = subscribe(xmtpConnected, (value) => $xmtpConnected = value);
  $$unsubscribe_userState = subscribe(userState, (value) => $userState = value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  let pages = [
    { name: "faq", path: "/" },
    { name: "terms", path: "/" },
    { name: "privacy", path: "/" }
  ];
  $$result.css.add(css$2);
  $$unsubscribe_chainName();
  $$unsubscribe_xmtpConnecting();
  $$unsubscribe_xmtpConnected();
  $$unsubscribe_userState();
  $$unsubscribe_userAddress();
  return `<main class="${"svelte-1l0fqb3"}"><div class="${"left-container svelte-1l0fqb3"}"><div class="${"brand-section svelte-1l0fqb3"}"><a href="${"https://decoded-labs.com"}" target="${"_blank"}" rel="${"noreferrer"}"><p class="${"light-40 semibold"}">ⓒ <span class="${"link"}">decoded</span></p></a></div>

		<div class="${"sitemap-section svelte-1l0fqb3"}">${each(pages, (page2) => {
    return `<a${add_attribute("href", page2.path, 0)}><p class="${"light-40 link"}">${escape(page2.name)}</p></a>
				<div style="${"width:8px"}"></div>`;
  })}</div>
		<div class="${"social-section svelte-1l0fqb3"}"><a href="${"https://github.com/honestworkdao"}" target="${"_blank"}" rel="${"noreferrer"}"><img${add_attribute("src", `${assets}/icons/github.svg`, 0)} alt="${"Github"}" class="${"svelte-1l0fqb3"}"></a>
			<div style="${"width:8px"}"></div>
			<a href="${"https://twitter.com/honestworkdao"}" target="${"_blank"}" rel="${"noreferrer"}"><img${add_attribute("src", `${assets}/icons/twitter.svg`, 0)} alt="${"Twitter"}" class="${"svelte-1l0fqb3"}"></a>
			<div style="${"width:8px"}"></div>
			<a href="${"https://discord.gg/vP6R5unDBF"}" target="${"_blank"}" rel="${"noreferrer"}"><img${add_attribute("src", `${assets}/icons/discord.svg`, 0)} alt="${"Discord"}" class="${"svelte-1l0fqb3"}"></a></div></div>
	<div class="${"right-container svelte-1l0fqb3"}"><div class="${"network-section svelte-1l0fqb3"}"><p class="${"light-40 semibold"}">NETWORK <span${add_attribute(
    "style",
    $chainName != "" ? "color:var(--color-primary);" : "color:var(--color-error);animation: blinking 2s linear infinite;",
    0
  )}>${escape($chainName != "" ? $chainName : "n/a")}</span></p></div>
		<div class="${"network-section svelte-1l0fqb3"}">${!$xmtpConnecting ? `<div style="${"width:4px"}"></div>
				<p class="${"light-40 "}">xmtp <span${add_attribute(
    "style",
    $xmtpConnected ? "color:var(--color-success)" : "color:var(--color-error); animation: blinking 2s linear infinite;",
    0
  )}>${escape($xmtpConnected ? "active" : "n/a")}</span></p>` : `<p class="${"light-40"}">xmtp</p>
				<div style="${"width:4px"}"></div>
				<img${add_attribute("src", `${assets}/icons/loader.svg`, 0)} alt="${"loading"}" class="${"rotating svelte-1l0fqb3"}">`}</div>

		<div class="${"network-section svelte-1l0fqb3"}"><p class="${"light-40"}">membership</p>
			<div style="${"width:4px"}"></div>
			<p${add_attribute(
    "style",
    $userState > 0 ? "color:var(--color-primary);" : "color:var(--color-error);animation: blinking 2s linear infinite;",
    0
  )}>${escape($userState > 0 ? "tier " + $userState : "n/a")}</p></div>
		<div class="${"network-section svelte-1l0fqb3"}"><p class="${"light-40"}">account</p>
			<div style="${"width:4px"}"></div>
			<p${add_attribute(
    "style",
    $userAddress != "" ? "color:var(--color-primary);" : "color:var(--color-error);animation: blinking 2s linear infinite;",
    0
  )}>${escape($userAddress != "" ? $userAddress.substring(0, 6) + "..." + $userAddress.substring($userAddress.length - 4) : "n/a")}</p></div></div>
</main>`;
});
const Notification_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "main.svelte-r2qbn7{width:100vw;display:flex;flex-direction:column;align-items:center}.underlined.svelte-r2qbn7{text-decoration:underline}.bar.svelte-r2qbn7{width:100%;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:8px;display:flex;flex-direction:row;justify-content:center;align-items:center;box-sizing:border-box}.post-link.svelte-r2qbn7{display:flex;flex-direction:row;align-items:center}",
  map: null
};
const Notification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { notification } = $$props;
  let { cta_class = "yellow" } = $$props;
  createEventDispatcher();
  if ($$props.notification === void 0 && $$bindings.notification && notification !== void 0)
    $$bindings.notification(notification);
  if ($$props.cta_class === void 0 && $$bindings.cta_class && cta_class !== void 0)
    $$bindings.cta_class(cta_class);
  $$result.css.add(css$1);
  return `<main class="${"svelte-r2qbn7"}"><div class="${"bar svelte-r2qbn7"}"><p class="${"light-80"}">${escape(notification.bodytext)}</p>
		<div style="${"width:8px"}"></div>
		<div class="${"post-link svelte-r2qbn7"}"><p class="${escape(null_to_empty(`${cta_class} link underlined`), true) + " svelte-r2qbn7"}">${escape(notification.cta)}</p>
			<div style="${"width:8px"}"></div>
			<img${add_attribute("src", notification.icon, 0)}${add_attribute("alt", notification.cta, 0)}></div></div>
</main>`;
});
const NotificationHandler = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trimmedRoute;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  trimmedRoute = $page.route.id?.split("/")[1];
  $$unsubscribe_page();
  return `${$page.route.id == "/" ? `<a href="${"https://twitter.com/HonestWorkDAO"}" target="${"_blank"}" rel="${"noreferrer"}">${validate_component(Notification, "Notification").$$render($$result, { notification: notifications.launch }, {}, {})}</a>` : `${$page.route.id == "/skills" || $page.route.id == "/listings" ? `${validate_component(Notification, "Notification").$$render($$result, { notification: notifications.mint }, {}, {})}` : `${$page.route.id == "/jobs" ? `<a${add_attribute("href", `${base}/new_job`, 0)}>${validate_component(Notification, "Notification").$$render($$result, { notification: notifications.postjob }, {}, {})}</a>` : `${$page.route.id == "/new_job" || $page.route.id == "/messages" || $page.route.id == "/auth" || trimmedRoute == "job" || trimmedRoute == "creator" ? `<a${add_attribute("href", `${base}/mint`, 0)}>${validate_component(Notification, "Notification").$$render($$result, { notification: notifications.mint }, {}, {})}</a>` : `${$page.route.id == "/profile" ? `<a${add_attribute("href", `${base}/mint`, 0)}>${validate_component(Notification, "Notification").$$render($$result, { notification: notifications.upgrade }, {}, {})}</a>` : `${$page.route.id == "/mint" ? `<a href="${"https://forms.gle/T1ngCzLwtYHx1ZGt9"}" target="${"_blank"}" rel="${"noreferrer"}">${validate_component(Notification, "Notification").$$render($$result, { notification: notifications.invitation }, {}, {})}</a>` : ``}`}`}`}`}`}`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1s30vux{width:100%;position:relative;display:flex;flex-direction:column;align-items:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userAddress, $$unsubscribe_userAddress;
  let $page, $$unsubscribe_page;
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  user_signed_in.set(data.signed);
  LogRocket.init("2wdgml/honestwork");
  const logrocketIdentify = async () => {
    const res = await fetch(`/api/user/${$userAddress}`);
    const user = await res.json();
    if (user.username != "") {
      LogRocket.identify($userAddress, {
        name: user.username,
        email: user.email,
        tier: 3
      });
    }
  };
  globalThis.Buffer = Buffer;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  {
    if ($userAddress && $userAddress != "") {
      logrocketIdentify();
    }
  }
  $$unsubscribe_userAddress();
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-ifrfxs_START --><script async src="${"https://www.googletagmanager.com/gtag/js?id=G-3X3Y5X23HN"}"></script><script>if (typeof window !== 'undefined' && window) {
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-3X3Y5X23HN');
		}
	</script><!-- HEAD_svelte-ifrfxs_END -->`, ""}

<main class="${"svelte-1s30vux"}"><div class="${"toast-container"}">${validate_component(SvelteToast, "SvelteToast").$$render(
    $$result,
    {
      options: { duration: 5e3, intro: { y: -20 } }
    },
    {},
    {}
  )}</div>
	${$page.route.id !== "/" && $page.route.id !== "/mint" ? `${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})}
		<div style="${"height:32px;"}"></div>
		` : ``}
	${validate_component(NotificationHandler, "NotificationHandler").$$render($$result, {}, {}, {})}
	${slots.default ? slots.default({}) : ``}
	${$page.route.id !== "/" ? `${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}` : ``}
</main>`;
});
export {
  Layout as default
};
