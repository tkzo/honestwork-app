import { c as create_ssr_component, f as escape, g as null_to_empty, d as add_attribute, e as each, v as validate_component } from "../../../chunks/index.js";
import { p as placeholder_image } from "../../../chunks/Constants.js";
import { p as parseContent } from "../../../chunks/Parser.js";
import { J as JobPage } from "../../../chunks/JobPage.js";
import { S as Svrollbar } from "../../../chunks/Svrollbar.js";
/* empty css                                                      */import "fuzzy";
import "../../../chunks/Network.js";
const Job_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-b8mx1.svelte-b8mx1{width:520px;flex-direction:column;cursor:pointer;border-width:1px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}section.svelte-b8mx1.svelte-b8mx1:hover{background-color:var(--color-light-2)}.contents.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10);padding:12px}.content.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:column;justify-content:space-between;width:362px}.preview-image.svelte-b8mx1.svelte-b8mx1{height:120px;width:120px}.tag-bar.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row;justify-content:space-between}.tags.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row}.tag.svelte-b8mx1.svelte-b8mx1{padding:8px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10)}.title-bar.svelte-b8mx1.svelte-b8mx1{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}.chosen.svelte-b8mx1.svelte-b8mx1{background-color:var(--color-light-2)}.hashtags.svelte-b8mx1.svelte-b8mx1{display:flex;flex-direction:row;flex-wrap:wrap}.hashtag.svelte-b8mx1.svelte-b8mx1{padding:4px 8px;border-width:1px;border-style:solid;border-color:var(--color-light-10)}.hashtag.svelte-b8mx1.svelte-b8mx1:hover{background-color:var(--color-primary)}.hashtag.svelte-b8mx1:hover p.svelte-b8mx1{color:var(--color-dark)}",
  map: null
};
const Job = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let infos;
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
  return `



<section class="${escape(null_to_empty(chosen ? "chosen" : ""), true) + " svelte-b8mx1"}"><div class="${"title-bar svelte-b8mx1"}"><div class="${"tags svelte-b8mx1"}"><div class="${"tag svelte-b8mx1"}"><p class="${"yellow"}">${escape(job.username ?? user.username)}</p></div>
			<div class="${"tag svelte-b8mx1"}"><p>${escape(job.title)}</p></div></div></div>
	<div class="${"contents svelte-b8mx1"}"><img${add_attribute("src", job.image_url ?? placeholder_image, 0)} alt="${"gallery"}" class="${"preview-image svelte-b8mx1"}">
		<div style="${"width:12px;"}"></div>
		<div class="${"content svelte-b8mx1"}"><div class="${"body-text light-60"}">${escape(parseContent(job.description).chars.slice(0, 160) + "...")}</div>
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
  code: "main.svelte-8dh3q4{display:flex;flex-direction:row;justify-content:space-between;overflow-y:hidden}.feed.svelte-8dh3q4{width:520px;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-10);overflow-y:hidden;height:auto}.job.svelte-8dh3q4{width:520px}.search-bar.svelte-8dh3q4{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10);display:flex;flex-direction:row;align-items:center;background:var(--color-light-2)}.input-container.svelte-8dh3q4{width:320px;padding:0px 8px;display:flex;flex-direction:row;align-items:center;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10);position:relative}input.svelte-8dh3q4{border:none;width:240px;background:var(--color-light-2)}.svelte-8dh3q4::placeholder{color:var(--color-light-80)}input.svelte-8dh3q4:focus{outline:none}.search-input.svelte-8dh3q4{padding:8px}.top.svelte-8dh3q4{display:flex;flex-direction:row;align-items:center;position:absolute;right:8px;cursor:pointer}.sorting-container.svelte-8dh3q4{width:200px;padding:8px;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.sorting-wrapper.svelte-8dh3q4{display:flex;flex-direction:row;align-items:center}.wrapper.svelte-8dh3q4{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-8dh3q4{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-8dh3q4::-webkit-scrollbar{display:none}.sorting-dropdown.svelte-8dh3q4{position:relative;cursor:pointer}.sorting-options.svelte-8dh3q4{position:absolute;z-index:66;margin-top:1px;margin-left:-1px;width:100%}.sorting-option.svelte-8dh3q4{display:flex;flex-direction:row;align-items:center;background-color:var(--color-light-2);padding:8px;border-width:0px 0px 1px 1px;border-style:solid;border-color:var(--color-light-10);flex:1}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredJobs;
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
    {
      k: "min. budget",
      v: "budget",
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
  filteredJobs = data.json;
  {
    if (filteredJobs) {
      active_job = filteredJobs[0];
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-2gatsb_START -->${$$result.title = `<title>HW | Jobs</title>`, ""}<meta name="${"description"}" content="${"HonestWork Jobs Page"}" class="${"svelte-8dh3q4"}"><!-- HEAD_svelte-2gatsb_END -->`, ""}

<main class="${"svelte-8dh3q4"}"><div class="${"feed svelte-8dh3q4"}"${add_attribute("style", `height:${feedHeight + 32}px`, 0)}><div class="${"search-bar svelte-8dh3q4"}"><div class="${"input-container svelte-8dh3q4"}"><img${add_attribute(
    "src",
    "icons/search_passive.svg",
    0
  )} alt="${"search icon"}" class="${"svelte-8dh3q4"}">
				<input class="${"search-input svelte-8dh3q4"}" type="${"text"}" placeholder="${"Search for awesome jobs 👀"}"${add_attribute("value", search_input, 0)}>
				${``}</div>
			<div class="${"sorting-dropdown svelte-8dh3q4"}"><div class="${"sorting-container svelte-8dh3q4"}"><div class="${"sorting-wrapper svelte-8dh3q4"}"><p class="${"light-40 svelte-8dh3q4"}">sort by</p>
						<div style="${"width:8px"}" class="${"svelte-8dh3q4"}"></div>
						<p class="${"svelte-8dh3q4"}">${escape(sorting_options[chosen_sorting_option].k)}</p></div>
					<img${add_attribute(
    "src",
    "icons/chevron_passive.svg",
    0
  )} alt="${"chevron"}" class="${"svelte-8dh3q4"}"></div>
				${``}</div></div>
		<div class="${"wrapper svelte-8dh3q4"}"><div class="${"viewport svelte-8dh3q4"}"${add_attribute("style", `width:520px; height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents svelte-8dh3q4"}"${add_attribute("this", contents, 0)}><div style="${"height:8px"}" class="${"svelte-8dh3q4"}"></div>
					${filteredJobs && filteredJobs.length > 0 ? `${each(filteredJobs, (job, index) => {
    return `${index == 0 ? `<div style="${"height:0px"}" class="${"svelte-8dh3q4"}"${add_attribute("this", ghost_component, 0)}></div>` : ``}
							<div class="${"svelte-8dh3q4"}">${validate_component(Job, "Job").$$render($$result, { chosen: job == active_job, job }, {}, {})}
							</div>`;
  })}` : ``}</div></div>
			${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}</div></div>
	<div style="${"width:12px"}" class="${"svelte-8dh3q4"}"></div>
	<div class="${"job svelte-8dh3q4"}">${active_job != null ? `${validate_component(JobPage, "JobPage").$$render($$result, { job: active_job }, {}, {})}` : ``}</div>
</main>`;
});
export {
  Page as default
};
