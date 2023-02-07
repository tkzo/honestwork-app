import { c as create_ssr_component, f as escape, g as null_to_empty, e as each, d as add_attribute, v as validate_component } from "../../chunks/index.js";
import { a as assets } from "../../chunks/paths.js";
import "../../chunks/Network.js";
import { S as Svrollbar } from "../../chunks/Svrollbar.js";
/* empty css                                                   */import { e as employersFeatureCards, F as FAQCards } from "../../chunks/Constants.js";
const FeaturesCards_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".buttons-container.svelte-janfg9{display:flex;flex-direction:row;align-items:center;justify-content:center;width:80vw;max-width:960px}.line.svelte-janfg9{height:1px;background-color:var(--color-light-10);width:100%;max-width:371px}.container.svelte-janfg9{display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:120px;width:80vw;max-width:960px;padding-bottom:120px;;;border-bottom:1px solid var(--color-light-10)}.features-card.svelte-janfg9{display:flex;align-items:center;gap:57px;background:var(--color-dark);width:100%;justify-content:space-between}.img-right.svelte-janfg9{flex-direction:row}.img-left.svelte-janfg9{flex-direction:row-reverse}.info.svelte-janfg9{display:flex;flex-direction:column;gap:40px;width:50%}.icon.svelte-janfg9{height:32px;width:32px}.title.svelte-janfg9{text-transform:uppercase;color:var(--color-primary);margin:0;font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:28px;line-height:40px}.description-container.svelte-janfg9{display:flex;flex-direction:column;gap:24px;justify-content:flex-start;width:100%}.description.svelte-janfg9{display:flex;flex-direction:row;align-items:center;gap:24px}.feature.svelte-janfg9{font-family:'Ubuntu Mono';font-weight:400;font-size:16px;line-height:24px;color:var(--color-light);text-transform:none;width:100%;max-width:300px}.button.svelte-janfg9{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:12px;border:1px solid #FFD369;color:var(--color-primary);font-weight:600;font-size:12px;line-height:12px}.button.svelte-janfg9:hover,.selected.svelte-janfg9{background-color:var(--color-primary);color:var(--color-dark)}.img-container.svelte-janfg9{width:50%}.featured-image.svelte-janfg9{width:100%;max-width:420px}@media(max-width:870px){.title.svelte-janfg9{font-size:20px;line-height:32px}.feature.svelte-janfg9{font-size:14px;line-height:20px}}@media(max-width:754px){.features-card.svelte-janfg9{flex-direction:column}.feature.svelte-janfg9{max-width:500px}.info.svelte-janfg9{justify-content:center;align-items:center}.info.svelte-janfg9,.img-container.svelte-janfg9{width:100%}.featured-image.svelte-janfg9{display:block;margin:0 auto}}",
  map: null
};
const FeaturesCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<div class="${"buttons-container svelte-janfg9"}"><div class="${"line svelte-janfg9"}"></div>
    <button class="${escape(null_to_empty("selected button"), true) + " svelte-janfg9"}">Employers</button>
    <button class="${escape(null_to_empty("button"), true) + " svelte-janfg9"}">Freelancers</button>
    <div class="${"line svelte-janfg9"}"></div></div>
<div style="${"height: 100px;"}"></div>
<div class="${"container svelte-janfg9"}">${`${each(employersFeatureCards, (card, index) => {
    return `<div class="${"features-card " + escape(index % 2 == 0 ? "img-right" : "img-left", true) + " svelte-janfg9"}"><div class="${"info svelte-janfg9"}"><h3 class="${"title svelte-janfg9"}">${escape(card.title)}</h3>
                    <div class="${"description-container svelte-janfg9"}"><div class="${"description svelte-janfg9"}"><img${add_attribute("src", card.icon1, 0)}${add_attribute("alt", card.icon1alt, 0)} class="${"icon svelte-janfg9"}">
                            <p class="${"feature svelte-janfg9"}">${escape(card.feature1)}</p></div>
                        <div class="${"description svelte-janfg9"}"><img${add_attribute("src", card.icon2, 0)}${add_attribute("alt", card.icon2alt, 0)} class="${"icon svelte-janfg9"}">
                            <p class="${"feature svelte-janfg9"}">${escape(card.feature2)}</p>
                        </div></div>
                    </div>
                <div class="${"img-container svelte-janfg9"}"><img${add_attribute("src", card.imgsrc, 0)}${add_attribute("alt", card.imgalt, 0)} class="${"featured-image svelte-janfg9"}"></div>            
            </div>`;
  })}`}
</div>`;
});
const BenefitsCards_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".container.svelte-10oennt{display:flex;justify-content:space-between;gap:24px;width:80vw;max-width:960px}.benefits-card.svelte-10oennt{display:flex;flex-direction:column;align-items:flex-start;padding:20px;gap:22px;background:var(--color-dark);border:1px solid var(--color-light-10);width:100%;max-width:340px}.icon.svelte-10oennt{height:56px;width:56px}.title.svelte-10oennt{text-transform:uppercase;color:var(--color-dark);background:var(--color-primary);margin:0}.description.svelte-10oennt{font-family:'Ubuntu Mono';font-weight:400;font-size:14px;line-height:24px;color:var(--color-light);text-transform:none}@media(max-width:780px){.container.svelte-10oennt{flex-direction:column;align-items:center}}",
  map: null
};
const BenefitsCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="${"container svelte-10oennt"}"><div class="${"benefits-card svelte-10oennt"}"><img src="${"icons/landing/sale.svg"}" alt="${"Sale icon"}" class="${"icon svelte-10oennt"}">
        <h4 class="${"title svelte-10oennt"}">low fees</h4>
        <p class="${"description svelte-10oennt"}">HonestWork employers’ fees are as low as 5%. There are no fees for freelancers, only a one-time investment in HonestWork NFT. </p></div>
    <div class="${"benefits-card svelte-10oennt"}"><img src="${"icons/landing/mail-multiple.svg"}" alt="${"Messages icon"}" class="${"icon svelte-10oennt"}">
        <h4 class="${"title svelte-10oennt"}">provable messages</h4>
        <p class="${"description svelte-10oennt"}">Provable messages ensure fast and fair dispute resolution without compromising your personal data.</p></div>
    <div class="${"benefits-card svelte-10oennt"}"><img src="${"icons/landing/airdrop-big.svg"}" alt="${"Airdrop icon"}" class="${"icon svelte-10oennt"}">
        <h4 class="${"title svelte-10oennt"}">airdrops</h4>
        <p class="${"description svelte-10oennt"}">Keep an eye out for upcoming airdrops! All active HonestWork NFT holders will receive an airdrop with the launch of $WORK token. </p></div>
</div>`;
});
const Question_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".faq-card.svelte-hogoa3{display:flex;flex-direction:column;box-sizing:border-box;border:1px solid var(--color-light-20);padding:14px 20px;width:100%;max-width:961px}.question-box.svelte-hogoa3{width:100%;justify-content:space-between;display:flex;align-items:center;gap:16px}.question.svelte-hogoa3{font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:16px;line-height:16px}.rotate-up.svelte-hogoa3{transform:rotate(-180deg);transition:all 0.4s ease-out}.rotate-down.svelte-hogoa3{transform:rotate(0);transition:all 0.4s ease-out}.answer.svelte-hogoa3{font-family:'Ubuntu Mono';font-style:normal;font-weight:400;font-size:16px;line-height:24px;color:var(--color-light-60)}@media(max-width:620px){.question.svelte-hogoa3,.answer.svelte-hogoa3{font-size:14px}}",
  map: null
};
const Question = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { card } = $$props;
  if ($$props.card === void 0 && $$bindings.card && card !== void 0)
    $$bindings.card(card);
  $$result.css.add(css$2);
  return `<div style="${"cursor:pointer;"}" class="${"faq-card svelte-hogoa3"}"><div class="${"question-box svelte-hogoa3"}"><div class="${"question svelte-hogoa3"}">${escape(card.question)}</div>
            <img${add_attribute("src", `${assets}/icons/landing/chevron.svg`, 0)} alt="${"Chevron"}" class="${escape(null_to_empty(`chevron-${card.id} ${`rotate-down`}`), true) + " svelte-hogoa3"}"></div>
            ${``}
    </div>`;
});
const Faq_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".container.svelte-19wlz9t{display:flex;flex-direction:column;gap:12px;width:80vw;max-width:960px}h2.svelte-19wlz9t{font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:28px;line-height:28px;color:var(--color-primary);text-align:center;margin:0 0 24px;padding:0 0 12px;border-bottom:1px solid var(--color-light-20);text-shadow:0px 0px 50px rgba(255, 211, 105, 0.5)}",
  map: null
};
const Faq = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"container svelte-19wlz9t"}"><h2 class="${"svelte-19wlz9t"}">FAQ</h2>
    ${each(FAQCards, (card) => {
    return `${validate_component(Question, "Question").$$render($$result, { card }, {}, {})}`;
  })} 
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".wrapper.svelte-lysyxy{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1;width:100%}.viewport.svelte-lysyxy{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none;width:100%;display:flex;flex-direction:column;align-items:center;height:100vh}.viewport.svelte-lysyxy::-webkit-scrollbar{display:none}.contents.svelte-lysyxy{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.hero.svelte-lysyxy{background:linear-gradient(180deg, #16181c 0%, var(--color-dark) 100%);width:100%;display:flex;flex-direction:column;align-items:center}.nav.svelte-lysyxy{display:flex;flex-direction:row;justify-content:space-between;border-bottom:1px solid var(--color-light-10);width:80vw;max-width:960px;padding:12px}.logo.svelte-lysyxy{display:flex;flex-direction:row;gap:8px;align-items:center}.text.svelte-lysyxy{font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:13px;line-height:12px;letter-spacing:0.05em;color:var(--color-light)}.header.svelte-lysyxy{display:flex;flex-direction:column;gap:16px;justify-content:center;align-items:center;width:100%;text-align:center;max-width:720px}h1.svelte-lysyxy{font-family:'Proto Mono';font-style:normal;font-weight:600;font-size:48px;line-height:60px;color:var(--color-primary);text-shadow:0px 0px 50px rgba(255, 211, 105, 0.2);margin:0 0 36px}.about.svelte-lysyxy{font-family:'Ubuntu Mono';font-size:16px;line-height:24px;margin:0 0 20px;max-width:496px}.icon.svelte-lysyxy{cursor:pointer;opacity:0.2;height:20px;width:20px}.icon.svelte-lysyxy:hover{opacity:1}.imgs-container.svelte-lysyxy{position:relative;top:0;left:0;width:80vw;max-width:960px;filter:drop-shadow(0px 0px 150px rgba(255, 211, 105, 0.15))}.app-img.svelte-lysyxy{position:relative;top:0;left:0;width:100%}.deer.svelte-lysyxy{position:absolute;bottom:0px;right:-50px;height:420px;width:auto}@media(max-width: 900px){.deer.svelte-lysyxy{right:-40px;height:350px}}@media(max-width: 800px){.deer.svelte-lysyxy{right:-30px;height:300px}}@media(max-width: 720px){.header.svelte-lysyxy{max-width:80vw}h1.svelte-lysyxy{font-size:32px;line-height:40px}.deer.svelte-lysyxy{right:-20px;height:250px}}@media(max-width: 550px){.deer.svelte-lysyxy{height:200px}h1.svelte-lysyxy{font-size:24px}.about.svelte-lysyxy{font-size:14px}}@media(max-width: 450px){.deer.svelte-lysyxy{height:150px}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let viewport;
  let contents;
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-h90vph_START -->${$$result.title = `<title>HonestWorkDAO</title>`, ""}<meta name="${"description"}" content="${"HonestWork"}"><!-- HEAD_svelte-h90vph_END -->`, ""}

<div class="${"wrapper svelte-lysyxy"}"><div class="${"viewport svelte-lysyxy"}"${add_attribute("this", viewport, 0)}><div class="${"contents svelte-lysyxy"}"${add_attribute("this", contents, 0)}><div class="${"hero svelte-lysyxy"}"><div class="${"nav svelte-lysyxy"}"><div class="${"logo svelte-lysyxy"}"><img${add_attribute("src", `${assets}/icons/landing/logo.svg`, 0)} alt="${"HonestWork Logo"}">
						<div class="${"text svelte-lysyxy"}">H0NESTW0RK</div></div>
					<div class="${"socials"}"><a href="${"https://twitter.com/HonestWorkDAO"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/twitter.svg`, 0)} alt="${"Twitter"}" class="${"icon svelte-lysyxy"}"></a>
						<a href="${"https://discord.gg/jbU72fTfTd"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/discord.svg`, 0)} alt="${"Discord"}" class="${"icon svelte-lysyxy"}"></a>
						<a href="${"https://github.com/honestworkdao"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/github.svg`, 0)} alt="${"Github"}" class="${"icon svelte-lysyxy"}"></a>
						<a href="${"https://www.linkedin.com/company/honestworkdao/"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img${add_attribute("src", `${assets}/icons/landing/linkedin.svg`, 0)} alt="${"LinkedIn"}" class="${"icon svelte-lysyxy"}"></a></div>
					</div>
				<div style="${"height: 100px;"}"></div>
				<div class="${"header svelte-lysyxy"}"><h1 class="${"svelte-lysyxy"}">A platform for all your web3 freelancing needs</h1>
					<p class="${"about svelte-lysyxy"}">HonestWork connects clients with top-rated blockchain experts, including copywriters,
						developers, and designers.
					</p>
					
					<div style="${"height: 64px;"}"></div>
					<div class="${"imgs-container svelte-lysyxy"}"><img src="${escape(`${assets}/assets/landing/hw.webp`, true) + " "}" alt="${"HonestWork"}" class="${"app-img svelte-lysyxy"}">
						<img src="${escape(`${assets}/assets/landing/deer.png`, true) + " "}" alt="${"HonestWork"}" class="${"deer svelte-lysyxy"}"></div></div></div>
			<div style="${"height: 120px;"}"></div>
			${validate_component(FeaturesCards, "FeaturesCards").$$render($$result, {}, {}, {})}
			<div style="${"height: 120px;"}"></div>
			${validate_component(BenefitsCards, "BenefitsCards").$$render($$result, {}, {}, {})}
			<div style="${"height: 120px;"}"></div>
			${validate_component(Faq, "Faq").$$render($$result, {}, {}, {})}
			<div style="${"height: 120px;"}"></div></div></div>
	${validate_component(Svrollbar, "Svrollbar").$$render($$result, { alwaysVisible: true, viewport, contents }, {}, {})}
</div>`;
});
export {
  Page as default
};
