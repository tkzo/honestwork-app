import { c as create_ssr_component, f as escape, g as null_to_empty, d as add_attribute, e as each, v as validate_component } from "../../chunks/index3.js";
import { a as assets } from "../../chunks/paths.js";
import "@xmtp/xmtp-js";
import "../../chunks/State.js";
import { S as Svrollbar } from "../../chunks/Svroller.svelte_svelte_type_style_lang.js";
import { f as featureCards, F as FAQCards } from "../../chunks/Constants.js";
Promise.resolve();
const FeatureCard_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "main.svelte-1m82vn4{display:flex;align-items:center;gap:57px;background:var(--color-dark);width:100%;justify-content:space-between}.img-right.svelte-1m82vn4{flex-direction:row}.img-left.svelte-1m82vn4{flex-direction:row-reverse}.info.svelte-1m82vn4{display:flex;flex-direction:column;gap:24px;width:45%}.icon.svelte-1m82vn4{height:32px;width:32px}.title.svelte-1m82vn4{max-width:320px;max-height:64px;text-transform:uppercase;color:var(--color-primary);margin:0;font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:24px;line-height:32px;inline-size:320px;overflow-wrap:break-word;overflow-x:hidden}.img-container.svelte-1m82vn4{width:50%}.button.svelte-1m82vn4:hover,.selected.svelte-1m82vn4{background-color:var(--color-primary);color:var(--color-dark)}.cta.svelte-1m82vn4:hover{border:1px solid var(--color-primary)}.featured-image.svelte-1m82vn4{width:100%;max-width:420px}.buttons-container.svelte-1m82vn4{display:flex;flex-direction:row;align-items:center;justify-content:center;width:80vw;max-width:960px}.line.svelte-1m82vn4{height:1px;background-color:var(--color-light-20);width:100%;max-width:371px}.container.svelte-1m82vn4{display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:120px;width:80vw;max-width:960px;padding-bottom:120px;border-bottom:1px solid var(--color-light-20)}.img-right.svelte-1m82vn4{flex-direction:row}.img-left.svelte-1m82vn4{flex-direction:row-reverse}.info.svelte-1m82vn4{display:flex;flex-direction:column;gap:24px;width:45%}.icon.svelte-1m82vn4{height:32px;width:32px;margin-top:8px}.title.svelte-1m82vn4{max-width:400px;text-transform:uppercase;color:var(--color-primary);margin:0;font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:24px;line-height:32px;inline-size:320px;overflow-wrap:break-word}.description-container.svelte-1m82vn4{display:flex;flex-direction:column;gap:24px;justify-content:flex-start;width:100%}.description.svelte-1m82vn4{display:flex;flex-direction:row;align-items:flex-start;gap:24px}.feature.svelte-1m82vn4{font-family:'DM Mono';font-weight:400;font-size:14px;line-height:20px;color:var(--color-light-80);text-transform:none;width:100%;max-width:300px}.cta.svelte-1m82vn4{box-sizing:border-box;display:flex;flex-direction:row;justify-content:center;align-items:center;padding:8px;gap:10px;border:1px solid var(--color-light-20);box-shadow:0px 0px 50px rgba(255, 211, 105, 0.1);cursor:pointer;color:var(--color-primary);width:247px;transition:border 0.2s ease-in 0s}.button.svelte-1m82vn4{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:12px;border:1px solid #ffd369;color:var(--color-primary);font-weight:600;font-size:12px;line-height:12px}@media(max-width: 870px){.title.svelte-1m82vn4{font-size:20px;line-height:32px}.feature.svelte-1m82vn4{font-size:14px;line-height:20px}}@media(max-width: 754px){main.svelte-1m82vn4{flex-direction:column}.feature.svelte-1m82vn4{max-width:500px}.info.svelte-1m82vn4{justify-content:center;align-items:center}.info.svelte-1m82vn4,.img-container.svelte-1m82vn4{width:100%}.featured-image.svelte-1m82vn4{display:block;margin:0 auto}}",
  map: null
};
const FeatureCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { card } = $$props;
  let { index } = $$props;
  if ($$props.card === void 0 && $$bindings.card && card !== void 0)
    $$bindings.card(card);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$result.css.add(css$5);
  card.type === "employer" ? index : index - 3;
  return `<main class="${escape(null_to_empty(`${index % 2 == 0 ? "img-right" : "img-left"}`), true) + " svelte-1m82vn4"}"><div class="${"info svelte-1m82vn4"}"><h3 class="${"title svelte-1m82vn4"}"${add_attribute("data-text", card.title, 0)}>${escape(card.title)}</h3>
		<div class="${"description-container svelte-1m82vn4"}"><div class="${"description svelte-1m82vn4"}"><img${add_attribute("src", card.icon1, 0)}${add_attribute("alt", card.icon1alt, 0)} class="${"icon svelte-1m82vn4"}">
				<p class="${"feature svelte-1m82vn4"}">${escape(card.feature1)}</p></div>
			<div class="${"description svelte-1m82vn4"}"><img${add_attribute("src", card.icon2, 0)}${add_attribute("alt", card.icon2alt, 0)} class="${"icon svelte-1m82vn4"}">
				<p class="${"feature svelte-1m82vn4"}">${escape(card.feature2)}</p></div></div>
		</div>
	<div class="${"img-container svelte-1m82vn4"}"><img${add_attribute("src", card.imgsrc, 0)}${add_attribute("alt", card.imgalt, 0)} class="${"featured-image svelte-1m82vn4"}"></div>
</main>`;
});
const FeaturesCards_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".buttons-container.svelte-1xk9a59{display:flex;flex-direction:row;align-items:center;justify-content:center;width:80vw;max-width:960px}.line.svelte-1xk9a59{height:1px;background-color:var(--color-light-20);width:100%;max-width:371px}.container.svelte-1xk9a59{display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:120px;width:80vw;max-width:960px;padding-bottom:120px;border-bottom:1px solid var(--color-light-20)}.button.svelte-1xk9a59{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:12px;border:1px solid #ffd369;color:var(--color-primary);font-weight:600;font-size:12px;line-height:12px}.button.svelte-1xk9a59:hover,.selected.svelte-1xk9a59{background-color:var(--color-primary);color:var(--color-dark)}",
  map: null
};
const FeaturesCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chosen_tab = "employer";
  $$result.css.add(css$4);
  return `<div class="${"buttons-container svelte-1xk9a59"}"><div class="${"line svelte-1xk9a59"}"></div>
	<button class="${escape(null_to_empty("selected button"), true) + " svelte-1xk9a59"}">Employers</button>
	<button class="${escape(null_to_empty("button"), true) + " svelte-1xk9a59"}">Freelancers</button>
	<div class="${"line svelte-1xk9a59"}"></div></div>
<div style="${"height: 100px;"}"></div>
<div class="${"container svelte-1xk9a59"}">${each(featureCards, (card, index) => {
    return `${chosen_tab == card.type ? `${validate_component(FeatureCard, "FeatureCard").$$render($$result, { card, index }, {}, {})}` : ``}`;
  })}
</div>`;
});
const BenefitsCards_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".container.svelte-1xdswov{display:flex;justify-content:space-between;gap:24px;width:80vw;max-width:960px}.benefits-card.svelte-1xdswov{display:flex;flex-direction:column;align-items:flex-start;padding:20px;gap:22px;background:var(--color-dark);border:1px solid var(--color-light-10);width:100%;max-width:340px}.icon.svelte-1xdswov{height:56px;width:56px}.title.svelte-1xdswov{text-transform:uppercase;color:var(--color-dark);background:var(--color-primary);margin:0}.description.svelte-1xdswov{font-family:'DM Mono';font-weight:400;font-size:14px;line-height:24px;color:var(--color-light);text-transform:none}@media(max-width: 780px){.container.svelte-1xdswov{flex-direction:column;align-items:center}}",
  map: null
};
const BenefitsCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="${"container svelte-1xdswov"}"><div class="${"benefits-card svelte-1xdswov"}"><img src="${"icons/landing/sale.svg"}" alt="${"Sale icon"}" class="${"icon svelte-1xdswov"}">
		<h4 class="${"title svelte-1xdswov"}">low fees</h4>
		<p class="${"description svelte-1xdswov"}">HonestWork employers’ fees are as low as 5%. There are no fees for freelancers, only a
			one-time investment in HonestWork NFT.
		</p></div>
	<div class="${"benefits-card svelte-1xdswov"}"><img src="${"icons/landing/mail-multiple.svg"}" alt="${"Messages icon"}" class="${"icon svelte-1xdswov"}">
		<h4 class="${"title svelte-1xdswov"}">provable messages</h4>
		<p class="${"description svelte-1xdswov"}">Provable messages ensure fast and fair dispute resolution without compromising your personal
			data.
		</p></div>
	<div class="${"benefits-card svelte-1xdswov"}"><img src="${"icons/landing/airdrop.svg"}" alt="${"Airdrop icon"}" class="${"icon svelte-1xdswov"}">
		<h4 class="${"title svelte-1xdswov"}">airdrops</h4>
		<p class="${"description svelte-1xdswov"}">Keep an eye out for upcoming airdrops! All active HonestWork NFT holders will receive an
			airdrop with the launch of $WORK token.
		</p></div>
</div>`;
});
const Question_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".faq-card.svelte-1e2rm3m{display:flex;flex-direction:column;box-sizing:border-box;border:1px solid var(--color-light-20);padding:14px 20px;width:100%;max-width:961px}.question-box.svelte-1e2rm3m{width:100%;justify-content:space-between;display:flex;align-items:center;gap:16px}.question.svelte-1e2rm3m{font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:16px;line-height:16px}.rotate-up.svelte-1e2rm3m{transform:rotate(-180deg);transition:all 0.4s ease-out}.rotate-down.svelte-1e2rm3m{transform:rotate(0);transition:all 0.4s ease-out}.answer.svelte-1e2rm3m{font-family:'DM Mono';font-style:normal;font-weight:400;font-size:16px;line-height:24px;color:var(--color-light-60)}@media(max-width: 620px){.question.svelte-1e2rm3m,.answer.svelte-1e2rm3m{font-size:14px}}",
  map: null
};
const Question = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { card } = $$props;
  if ($$props.card === void 0 && $$bindings.card && card !== void 0)
    $$bindings.card(card);
  $$result.css.add(css$2);
  return `<div style="${"cursor:pointer;"}" class="${"faq-card svelte-1e2rm3m"}"><div class="${"question-box svelte-1e2rm3m"}"><div class="${"question svelte-1e2rm3m"}">${escape(card.question)}</div>
		<img${add_attribute("src", `${assets}/icons/landing/chevron.svg`, 0)} alt="${"Chevron"}" class="${escape(null_to_empty(`chevron-${card.id} ${`rotate-down`}`), true) + " svelte-1e2rm3m"}"></div>
	${``}
</div>`;
});
const Faq_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".container.svelte-x242o4{display:flex;flex-direction:column;gap:12px;width:80vw;max-width:960px;background-color:var(--color-dark)}h2.svelte-x242o4{font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:28px;line-height:28px;color:var(--color-primary);text-align:center;margin:0 0 24px;padding:0 0 12px;border-bottom:1px solid var(--color-light-20);text-shadow:0px 0px 50px rgba(255, 211, 105, 0.5)}",
  map: null
};
const Faq = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"container svelte-x242o4"}"><h2 class="${"svelte-x242o4"}">FAQ</h2>
	${each(FAQCards, (card) => {
    return `${validate_component(Question, "Question").$$render($$result, { card }, {}, {})}`;
  })}
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".iframe-wrapper.svelte-15zuj08{max-width:960px;width:90%}.faq.svelte-15zuj08{z-index:10}.bg.svelte-15zuj08{position:absolute;bottom:0;left:0;width:100vw;height:100vh}.wrapper.svelte-15zuj08{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1;width:100%;background-color:var(--color-dark)}.viewport.svelte-15zuj08{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none;width:100%;display:flex;flex-direction:column;align-items:center;height:100vh}.viewport.svelte-15zuj08::-webkit-scrollbar{display:none}.contents.svelte-15zuj08{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative}.hero.svelte-15zuj08{background:linear-gradient(180deg, #16181c 0%, var(--color-dark) 100%);width:100%;display:flex;flex-direction:column;align-items:center}.socials.svelte-15zuj08{display:flex;flex-direction:row;align-items:center;gap:8px}.header.svelte-15zuj08{display:flex;flex-direction:column;gap:16px;justify-content:center;align-items:center;width:100%;text-align:center;max-width:720px}h1.svelte-15zuj08{font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:48px;line-height:60px;color:var(--color-primary);text-shadow:0px 0px 50px rgba(255, 211, 105, 0.2);margin:0 0 36px}.about.svelte-15zuj08{font-family:'DM Mono';font-size:16px;line-height:24px;margin:0 0 20px;max-width:560px}.explore.svelte-15zuj08{padding:8px 12px;background:#101112;border:1px solid rgba(255, 255, 255, 0.2);box-shadow:0px 0px 50px rgba(255, 211, 105, 0.2);cursor:pointer;font-weight:600;color:var(--color-primary);transition:border 0.2s ease-in 0s}.explore.svelte-15zuj08:hover{border:1px solid var(--color-primary)}.icon.svelte-15zuj08{cursor:pointer;opacity:0.2;height:20px;width:20px}.icon.svelte-15zuj08:hover{opacity:1}@media(max-width: 720px){.header.svelte-15zuj08{max-width:80vw}h1.svelte-15zuj08{font-size:32px;line-height:40px}}@media(max-width: 550px){h1.svelte-15zuj08{font-size:24px}.about.svelte-15zuj08{font-size:14px}}.desktop-iframe.svelte-15zuj08{position:relative;overflow:hidden;padding-top:56.25%;width:100%;max-width:960px}.myframe.svelte-15zuj08{position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let viewport;
  let contents;
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-h90vph_START -->${$$result.title = `<title>HonestWorkDAO</title>`, ""}<meta name="${"description"}" content="${"HonestWork"}"><!-- HEAD_svelte-h90vph_END -->`, ""}

<div class="${"wrapper svelte-15zuj08"}"><div class="${"viewport svelte-15zuj08"}"${add_attribute("this", viewport, 0)}><div class="${"contents svelte-15zuj08"}"${add_attribute("this", contents, 0)}><div class="${"hero svelte-15zuj08"}">
				<div style="${"height: 100px;"}"></div>
				<div class="${"header svelte-15zuj08"}"><h1 class="${"svelte-15zuj08"}">A platform for all your web3 freelancing needs</h1>
					<p class="${"about svelte-15zuj08"}">HonestWork connects clients with top-rated blockchain experts, including copywriters,
						developers, and designers.
					</p>
					<a class="${"explore svelte-15zuj08"}" href="${"https://docs.google.com/forms/d/e/1FAIpQLSfcaBQtSa8s36fF3q69KoXT-uFYG4ebZNId5HbpJggGByUbmQ/viewform?usp=sf_link"}" target="${"_blank"}" rel="${"noreferrer"}">join the waitlist</a>
					<div class="${"socials svelte-15zuj08"}"><a href="${"https://twitter.com/HonestWorkDAO"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/twitter.svg`, 0)} alt="${"Twitter"}" class="${"icon svelte-15zuj08"}"></a>
						<a href="${"https://discord.gg/jbU72fTfTd"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/discord.svg`, 0)} alt="${"Discord"}" class="${"icon svelte-15zuj08"}"></a>
						<a href="${"https://github.com/honestworkdao"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/github.svg`, 0)} alt="${"Github"}" class="${"icon svelte-15zuj08"}"></a>
						<a href="${"https://www.linkedin.com/company/honestworkdao/"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/linkedin.svg`, 0)} alt="${"LinkedIn"}" class="${"icon svelte-15zuj08"}"></a></div>
					<div style="${"height: 64px;"}"></div></div>
				<div class="${"iframe-wrapper svelte-15zuj08"}"><div class="${"desktop-iframe svelte-15zuj08"}"><iframe class="${"myframe svelte-15zuj08"}" width="${"100%"}" loading="${"lazy"}" src="${"https://www.youtube.com/embed/re8Ac9jpup0?controls=0"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"}"></iframe></div></div></div>
			<div style="${"height: 120px;"}"></div>
			${validate_component(FeaturesCards, "FeaturesCards").$$render($$result, {}, {}, {})}
			<div style="${"height: 120px;"}"></div>
			${validate_component(BenefitsCards, "BenefitsCards").$$render($$result, {}, {}, {})}
			<div style="${"height: 120px;"}"></div>
			<div class="${"faq svelte-15zuj08"}">${validate_component(Faq, "Faq").$$render($$result, {}, {}, {})}</div>
			<div style="${"height: 120px;"}"></div>
			<img src="${escape(`${assets}/assets/laser-grid.png`, true) + " "}" alt="${"HonestWork"}" class="${"bg svelte-15zuj08"}"></div></div>
	${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}
</div>`;
});
export {
  Page as default
};
