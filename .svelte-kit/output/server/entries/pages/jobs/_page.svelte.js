import { c as create_ssr_component, b as subscribe, d as add_attribute, f as escape, e as each, g as null_to_empty, v as validate_component } from "../../../chunks/index.js";
import { p as placeholder_image, c as chains } from "../../../chunks/Constants.js";
import { S as Svrollbar } from "../../../chunks/Svrollbar.js";
/* empty css                                                      */import { b as browser } from "../../../chunks/environment.js";
import { d as userAddress, u as userConnected } from "../../../chunks/Network.js";
/* empty css                                                         *//* empty css                                                     */import "fuzzy";
const css$2 = {
  code: "main.svelte-on6qwv.svelte-on6qwv{width:520px;display:flex;flex-direction:column}.profile-bar.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;justify-content:space-between;align-items:flex-start;border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-10);cursor:pointer;padding:12px}.left-section.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:flex-start}.pfp.svelte-on6qwv.svelte-on6qwv{width:94px;height:94px}.info.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:column;justify-content:center}.info-username.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center}.description.svelte-on6qwv.svelte-on6qwv{border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-10);padding:12px}.link-container.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center;border-width:1px;border-style:solid;border-color:var(--color-light-10)}.placeholder.svelte-on6qwv.svelte-on6qwv{padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10)}.wrapper.svelte-on6qwv.svelte-on6qwv{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-on6qwv.svelte-on6qwv{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-on6qwv.svelte-on6qwv::-webkit-scrollbar{display:none}.button.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center;justify-content:center;border-width:1px;border-style:solid;border-color:var(--color-light-10);padding:4px 8px;cursor:pointer}.button.svelte-on6qwv.svelte-on6qwv:hover{background-color:var(--color-primary)}.button.svelte-on6qwv:hover p.svelte-on6qwv{color:var(--color-dark)}.network-tabs.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-10);cursor:pointer}.network-tab.svelte-on6qwv.svelte-on6qwv:hover{background-color:var(--color-primary)}.network-tab.svelte-on6qwv:hover p.svelte-on6qwv{color:var(--color-dark)}.network-tab.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10)}.token-container.svelte-on6qwv.svelte-on6qwv{border-width:1px;border-style:solid;border-color:var(--color-light-10);padding:12px}.token-tabs.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center}.token-wrapper.svelte-on6qwv.svelte-on6qwv{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}.token.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center;justify-content:space-between;cursor:pointer}.token.svelte-on6qwv.svelte-on6qwv:hover{background-color:var(--color-light-2)}.address.svelte-on6qwv.svelte-on6qwv{display:flex;flex-direction:row;align-items:center}",
  map: null
};
const JobPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userAddress;
  let $$unsubscribe_userConnected;
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => value);
  let { job } = $$props;
  let viewport;
  let contents;
  let chosen_network;
  let feedHeight = 0;
  const getChainName = (chain_id) => {
    const name = chains.find((chain) => chain.id == chain_id)?.name;
    return name;
  };
  const getTokenSymbol = (chain_id, address) => {
    const tokens = chains.find((chain) => chain.id == chain_id)?.tokens;
    const symbol = tokens?.find((token) => token.address == address)?.symbol;
    return symbol;
  };
  if ($$props.job === void 0 && $$bindings.job && job !== void 0)
    $$bindings.job(job);
  $$result.css.add(css$2);
  {
    if (job && browser) {
      if (job.tokens_accepted) {
        chosen_network = job.tokens_accepted[0].id;
      }
    }
  }
  $$unsubscribe_userAddress();
  $$unsubscribe_userConnected();
  return `<main class="${"svelte-on6qwv"}"><div class="${"profile-bar svelte-on6qwv"}"><div class="${"left-section svelte-on6qwv"}"><img class="${"pfp svelte-on6qwv"}"${add_attribute("src", job.image_url ?? placeholder_image, 0)} alt="${""}">
			<div style="${"width:8px;"}"></div>
			<div class="${"info svelte-on6qwv"}"><div class="${"info-username svelte-on6qwv"}"><p>${escape(job.username)}</p></div>
				<div style="${"height:4px;"}"></div>
				<p class="${"light-60"}">${escape(job.title)}</p>
				<div style="${"height:4px;"}"></div>
				<p>4.8<span class="${"light-60"}">(377)</span></p></div></div>
		<div class="${"right-section"}"><div class="${"button svelte-on6qwv"}"><p class="${"yellow svelte-on6qwv"}">apply to this job</p></div>
			<div style="${"height:8px"}"></div>
			<div class="${"button svelte-on6qwv"}"><p class="${"light-60 svelte-on6qwv"}">add to watchlist</p></div>
			<div style="${"height:8px"}"></div>
			<div class="${"button svelte-on6qwv"}"><p class="${"light-60 svelte-on6qwv"}">share job</p>
				<div style="${"width:4px;"}"></div>
				<img src="${"icons/external.svg"}" alt="${"share"}" style="${"margin-top:-2px;"}"></div></div></div>
	<div class="${"wrapper svelte-on6qwv"}"><div class="${"viewport svelte-on6qwv"}"${add_attribute("style", `height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}><div style="${"height:12px;"}"></div>
				<div class="${"description svelte-on6qwv"}"><div class="${"body-text light-80"}">${escape(job.description)}</div></div>
				<div style="${"height:12px;"}"></div>
				<div class="${"payment-container"}">${job.tokens_accepted && job.tokens_accepted.length > 0 ? `<div class="${"network-tabs svelte-on6qwv"}">${each(job.tokens_accepted, (network) => {
    return `<div class="${"network-tab svelte-on6qwv"}"><p class="${escape(null_to_empty(chosen_network == network.id ? "yellow" : "light-60"), true) + " svelte-on6qwv"}">${escape(getChainName(network.id))}</p>
								</div>`;
  })}</div>` : ``}
					<div class="${"token-container svelte-on6qwv"}"><div class="${"token-wrapper svelte-on6qwv"}"><div class="${"token-tabs svelte-on6qwv"}"><p class="${"light-40"}">payment tokens</p>
								<div style="${"width:46px;"}"></div>
								<p class="${"light-40"}">contract address</p></div>
							<div style="${"height:4px;"}"></div></div>
						<div class="${"tokens"}"><div style="${"height:8px;"}"></div>
							${job.tokens_accepted ? `${each(job.tokens_accepted, (network) => {
    return `${network.tokens && network.tokens.length > 0 ? `${each(network.tokens, (token, i) => {
      return `${network.id == chosen_network ? `<div class="${"token svelte-on6qwv"}"><p${add_attribute("class", i % 2 == 0 ? "" : "light-60", 0)}>${escape(getTokenSymbol(network.id, token.address))}</p>
													<div class="${"address svelte-on6qwv"}"><p${add_attribute("class", i % 2 == 0 ? "" : "light-60", 0)}>${escape(token.address)}</p>
														<div style="${"width:4px;"}"></div>
														<img src="${"icons/external.svg"}" alt="${"External Link"}" style="${"margin-top:-2px;"}">
													</div></div>
												${i != network.tokens.length - 1 ? `<div style="${"height:8px;"}"></div>` : ``}` : ``}`;
    })}` : ``}`;
  })}` : `<p class="${"light-60"}">NO TOKEN INFO FOUND</p>`}</div></div></div>
				<div style="${"height:12px;"}"></div>
				<div class="${"links"}">${job.links && job.links.length > 0 ? `${each(job.links, (link) => {
    return `<div class="${"link-container svelte-on6qwv"}"><p class="${"placeholder light-40 svelte-on6qwv"}">link</p>
								<div style="${"width:8px;"}"></div>
								<a${add_attribute("href", link, 0)}><p class="${"light-80"}">${escape(link)}</p>
								</a></div>
							<div style="${"height:8px;"}"></div>`;
  })}` : ``}</div>
				<div style="${"height:32px;"}"></div></div></div>
		${validate_component(Svrollbar, "Svrollbar").$$render($$result, { alwaysVisible: true, viewport, contents }, {}, {})}</div>
</main>`;
});
const Job_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-b8mx1.svelte-b8mx1{width:520px;flex-direction:column;cursor:pointer;border-width:1px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}section.svelte-b8mx1.svelte-b8mx1:hover{background-color:var(--color-light-2)}.contents.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10);padding:12px}.content.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:column;justify-content:space-between;width:362px}.preview-image.svelte-b8mx1.svelte-b8mx1{height:120px;width:120px}.tag-bar.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row;justify-content:space-between}.tags.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row}.tag.svelte-b8mx1.svelte-b8mx1{padding:8px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10)}.title-bar.svelte-b8mx1.svelte-b8mx1{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}.chosen.svelte-b8mx1.svelte-b8mx1{background-color:var(--color-light-2)}.hashtags.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row;flex-wrap:wrap}.hashtag.svelte-b8mx1.svelte-b8mx1{padding:4px 8px;border-width:1px;border-style:solid;border-color:var(--color-light-10)}.hashtag.svelte-b8mx1.svelte-b8mx1:hover{background-color:var(--color-primary)}.hashtag.svelte-b8mx1:hover p.svelte-b8mx1{color:var(--color-dark)}",
  map: null
};
const Job = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let infos;
  let trimmed_description;
  let { chosen } = $$props;
  let { job } = $$props;
  let user;
  let hashtags = job.tags;
  if ($$props.chosen === void 0 && $$bindings.chosen && chosen !== void 0)
    $$bindings.chosen(chosen);
  if ($$props.job === void 0 && $$bindings.job && job !== void 0)
    $$bindings.job(job);
  $$result.css.add(css$1);
  infos = [
    {
      key: "installments",
      value: job.installments
    },
    {
      key: "budget",
      value: "$" + job.budget.toString().slice(0, 6)
    }
  ];
  trimmed_description = job.description.length > 300 ? job.description.slice(0, 300) + "..." : job.description;
  return `



<section class="${escape(null_to_empty(chosen ? "chosen" : ""), true) + " svelte-b8mx1"}"><div class="${"title-bar svelte-b8mx1"}"><div class="${"tags svelte-b8mx1"}"><div class="${"tag svelte-b8mx1"}"><p class="${"yellow"}">${escape(job.username ?? user.username)}</p></div>
			<div class="${"tag svelte-b8mx1"}"><p>${escape(job.title)}</p></div></div></div>
	<div class="${"contents svelte-b8mx1"}"><img${add_attribute("src", job.image_url ?? placeholder_image, 0)} alt="${"gallery"}" class="${"preview-image svelte-b8mx1"}">
		<div style="${"width:12px;"}"></div>
		<div class="${"content svelte-b8mx1"}"><div class="${"body-text light-60"}">${escape(trimmed_description)}</div>
			<div style="${"height: 16px"}"></div>
			<div class="${"hashtags svelte-b8mx1"}">${hashtags && hashtags.length > 0 ? `${each(hashtags, (hashtag) => {
    return `<div class="${"hashtag svelte-b8mx1"}"><p class="${"light-60 svelte-b8mx1"}">${escape(hashtag)}</p></div>
						${hashtag != hashtags[hashtags.length - 1] ? `<div style="${"width: 4px"}"></div>` : ``}`;
  })}` : ``}</div></div></div>
	<div class="${"tag-bar svelte-b8mx1"}"><div class="${"tags svelte-b8mx1"}">${infos && infos.length > 0 ? `${each(infos, (info) => {
    return `<div class="${"tag svelte-b8mx1"}"><p>${escape(info.value)} <span class="${"light-40"}">${escape(info.key)}</span></p>
					</div>`;
  })}` : ``}</div></div></section>
<div style="${"height: 12px"}"></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-bc03ba{display:flex;flex-direction:row;justify-content:space-between;overflow-y:hidden}.feed.svelte-bc03ba{width:520px;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-10);overflow-y:hidden;height:auto}.job.svelte-bc03ba{width:520px}.search-bar.svelte-bc03ba{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10);display:flex;flex-direction:row;align-items:center;background:var(--color-light-2)}.input-container.svelte-bc03ba{width:320px;padding:0px 8px;display:flex;flex-direction:row;align-items:center;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10);position:relative}input.svelte-bc03ba{border:none;width:240px;background:var(--color-light-2)}input.svelte-bc03ba:focus{outline:none}.search-input.svelte-bc03ba{padding:8px}.top.svelte-bc03ba{display:flex;flex-direction:row;align-items:center;position:absolute;right:8px;cursor:pointer}.sorting-container.svelte-bc03ba{width:200px;padding:8px;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.sorting-wrapper.svelte-bc03ba{display:flex;flex-direction:row;align-items:center}.wrapper.svelte-bc03ba{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-bc03ba{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-bc03ba::-webkit-scrollbar{display:none}.sorting-dropdown.svelte-bc03ba{position:relative;cursor:pointer}.sorting-options.svelte-bc03ba{position:absolute;z-index:66;margin-top:1px;margin-left:-1px;width:100%}.sorting-option.svelte-bc03ba{display:flex;flex-direction:row;align-items:center;background-color:var(--color-light-2);padding:8px;border-width:0px 0px 1px 1px;border-style:solid;border-color:var(--color-light-10);flex:1}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredSkills;
  let { data } = $$props;
  let { viewport } = $$props;
  let { contents } = $$props;
  let ghost_component;
  let search_input = "";
  let active_job = null;
  let sorting_options = [
    {
      k: "publish date",
      v: "created_at",
      a: "false"
    },
    { k: "rating", v: "rating", a: "false" },
    {
      k: "min. budget",
      v: "minimum_price",
      a: "false"
    }
  ];
  let chosen_sorting_option = 0;
  let feedHeight = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0)
    $$bindings.viewport(viewport);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css);
  filteredSkills = data.json;
  {
    if (filteredSkills) {
      active_job = filteredSkills[0];
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-a2n829_START -->${$$result.title = `<title>HW | Skills</title>`, ""}<meta name="${"description"}" content="${"HonestWork Jobs Page"}"><!-- HEAD_svelte-a2n829_END -->`, ""}

<main class="${"svelte-bc03ba"}"><div class="${"feed svelte-bc03ba"}"${add_attribute("style", `height:${feedHeight + 32}px`, 0)}><div class="${"search-bar svelte-bc03ba"}"><div class="${"input-container svelte-bc03ba"}"><img${add_attribute(
    "src",
    "icons/search_passive.svg",
    0
  )} alt="${"search icon"}">
				<input class="${"search-input svelte-bc03ba"}" type="${"text"}" placeholder="${"Search for awesome jobs"}"${add_attribute("value", search_input, 0)}>
				${``}</div>
			<div class="${"sorting-dropdown svelte-bc03ba"}"><div class="${"sorting-container svelte-bc03ba"}"><div class="${"sorting-wrapper svelte-bc03ba"}"><p class="${"light-40"}">sort by</p>
						<div style="${"width:8px"}"></div>
						<p>${escape(sorting_options[chosen_sorting_option].k)}</p></div>
					<img${add_attribute(
    "src",
    "icons/chevron_passive.svg",
    0
  )} alt="${"chevron"}"></div>
				${``}</div></div>
		<div class="${"wrapper svelte-bc03ba"}"><div class="${"viewport svelte-bc03ba"}"${add_attribute("style", `width:520px; height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}><div style="${"height:8px"}"></div>
					${filteredSkills && filteredSkills.length > 0 ? `${each(filteredSkills, (job, index) => {
    return `${index == 0 ? `<div style="${"height:0px"}"${add_attribute("this", ghost_component, 0)}></div>` : ``}
							<div>${validate_component(Job, "Job").$$render($$result, { chosen: job == active_job, job }, {}, {})}
							</div>`;
  })}` : ``}</div></div>
			${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}</div></div>
	<div style="${"width:12px"}"></div>
	<div class="${"job svelte-bc03ba"}">${active_job != null ? `${validate_component(JobPage, "JobPage").$$render($$result, { job: active_job }, {}, {})}` : ``}</div>
</main>`;
});
export {
  Page as default
};
