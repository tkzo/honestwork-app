import { c as create_ssr_component, f as escape, g as null_to_empty, d as add_attribute, e as each, v as validate_component } from "../../../chunks/index3.js";
import { p as placeholder_image } from "../../../chunks/Constants.js";
import { p as parseContent } from "../../../chunks/Parser.js";
import { a as assets } from "../../../chunks/paths.js";
import { J as JobPage } from "../../../chunks/JobPage.js";
import { S as Svrollbar } from "../../../chunks/Svroller.svelte_svelte_type_style_lang.js";
import "fuzzy";
const Job_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-1y7g9ar.svelte-1y7g9ar{width:520px;flex-direction:column;cursor:pointer;border-width:1px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20)}section.svelte-1y7g9ar.svelte-1y7g9ar:hover{background-color:var(--color-light-2)}.contents.svelte-1y7g9ar.svelte-1y7g9ar{display:flex;flex-direction:row;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:12px}.content.svelte-1y7g9ar.svelte-1y7g9ar{display:flex;flex-direction:column;justify-content:space-between;width:362px}.preview-image.svelte-1y7g9ar.svelte-1y7g9ar{height:120px;width:120px}.tag-bar.svelte-1y7g9ar.svelte-1y7g9ar{display:flex;flex-direction:row;justify-content:space-between}.tags.svelte-1y7g9ar.svelte-1y7g9ar{display:flex;flex-direction:row}.tag.svelte-1y7g9ar.svelte-1y7g9ar{padding:8px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20)}.title-bar.svelte-1y7g9ar.svelte-1y7g9ar{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:row;justify-content:space-between;align-items:center}.chosen.svelte-1y7g9ar.svelte-1y7g9ar{background-color:var(--color-light-2)}.hashtags.svelte-1y7g9ar.svelte-1y7g9ar{display:flex;flex-direction:row;flex-wrap:wrap}.hashtag.svelte-1y7g9ar.svelte-1y7g9ar{padding:4px 8px;border-width:1px;border-style:solid;border-color:var(--color-light-20)}.hashtag.svelte-1y7g9ar.svelte-1y7g9ar:hover{background-color:var(--color-primary)}.hashtag.svelte-1y7g9ar:hover p.svelte-1y7g9ar{color:var(--color-dark)}.status-tag.svelte-1y7g9ar.svelte-1y7g9ar{display:flex;flex-direction:row;align-items:center}",
  map: null
};
const Job = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let infos;
  let { chosen } = $$props;
  let { job } = $$props;
  let hashtags = job.tags;
  let tier = 0;
  const parseDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  if ($$props.chosen === void 0 && $$bindings.chosen && chosen !== void 0)
    $$bindings.chosen(chosen);
  if ($$props.job === void 0 && $$bindings.job && job !== void 0)
    $$bindings.job(job);
  $$result.css.add(css$1);
  infos = [
    {
      key: "listed on:",
      value: parseDate(new Date(job.created_at))
    },
    { key: "member tier:", value: tier },
    {
      key: "budget:",
      value: "$" + job.budget.toString().slice(0, 6)
    }
  ];
  return `



<section class="${escape(null_to_empty(chosen ? "chosen" : ""), true) + " svelte-1y7g9ar"}"><div class="${"title-bar svelte-1y7g9ar"}"><div class="${"tags svelte-1y7g9ar"}"><div class="${"tag svelte-1y7g9ar"}"><p class="${"yellow"}">${escape(job.username)}</p></div>
			<div class="${"tag svelte-1y7g9ar"}"><p>${escape(job.title)}</p></div></div>
		<div class="${"status-tag svelte-1y7g9ar"}">${job.deal_id == -1 ? `<p style="${"color:var(--color-success)"}">active</p>
				<div style="${"width: 4px"}"></div>
				<img${add_attribute("src", `${assets}/icons/check.svg`, 0)} alt="${"arrow"}">
				<div style="${"width: 8px"}"></div>` : `<p style="${"color:var(--color-error)"}">taken</p>
				<div style="${"width: 4px"}"></div>
				<img${add_attribute("src", `${assets}/icons/calendar-remove.svg`, 0)} alt="${"arrow"}">
				<div style="${"width: 8px"}"></div>`}</div></div>
	<div class="${"contents svelte-1y7g9ar"}"><img${add_attribute(
    "src",
    job.image_url ? job.image_url + "?tr=h-240,w-240" : placeholder_image,
    0
  )} alt="${"gallery"}" class="${"preview-image svelte-1y7g9ar"}">
		<div style="${"width:12px;"}"></div>
		<div class="${"content svelte-1y7g9ar"}"><div class="${"body-text light-60"}">${escape(parseContent(job.description))}</div>
			<div style="${"height: 16px"}"></div>
			<div class="${"hashtags svelte-1y7g9ar"}">${hashtags && hashtags.length > 0 ? `${each(hashtags, (hashtag) => {
    return `<div class="${"hashtag svelte-1y7g9ar"}"><p class="${"light-60 svelte-1y7g9ar"}">${escape(hashtag)}</p></div>
						${hashtag != hashtags[hashtags.length - 1] ? `<div style="${"width: 4px"}"></div>` : ``}`;
  })}` : ``}</div></div></div>
	<div class="${"tag-bar svelte-1y7g9ar"}"><div class="${"tags svelte-1y7g9ar"}">${infos && infos.length > 0 ? `${each(infos, (info) => {
    return `<div class="${"tag svelte-1y7g9ar"}"><p><span class="${"light-40"}">${escape(info.key)}</span> ${escape(info.value)}</p>
					</div>`;
  })}` : ``}</div></div></section>
<div style="${"height: 12px"}"></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-d18fh4{display:flex;flex-direction:row;justify-content:space-between;overflow-y:hidden}.feed.svelte-d18fh4{width:520px;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-20);overflow-y:hidden;height:auto;box-sizing:border-box}.job.svelte-d18fh4{width:520px}.search-bar.svelte-d18fh4{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.input-container.svelte-d18fh4{width:320px;padding:0px 8px;display:flex;flex-direction:row;align-items:center;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);position:relative;box-sizing:border-box}input.svelte-d18fh4{border:none;width:240px}.svelte-d18fh4::placeholder{color:var(--color-light-80)}input.svelte-d18fh4:focus{outline:none}.search-input.svelte-d18fh4{padding:8px;box-sizing:border-box}.top.svelte-d18fh4{display:flex;flex-direction:row;align-items:center;position:absolute;right:8px;cursor:pointer}.sorting-container.svelte-d18fh4{width:200px;padding:8px;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.sorting-wrapper.svelte-d18fh4{display:flex;flex-direction:row;align-items:center}.wrapper.svelte-d18fh4{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-d18fh4{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-d18fh4::-webkit-scrollbar{display:none}.sorting-dropdown.svelte-d18fh4{position:relative;cursor:pointer}.sorting-options.svelte-d18fh4{position:absolute;z-index:66;margin-top:1px;margin-left:-1px;width:100%}.sorting-option.svelte-d18fh4{display:flex;flex-direction:row;align-items:center;background-color:var(--color-light-2);padding:8px;border-width:0px 0px 1px 1px;border-style:solid;border-color:var(--color-light-20);flex:1}",
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
  return `${$$result.head += `<!-- HEAD_svelte-2gatsb_START -->${$$result.title = `<title>HW | Jobs</title>`, ""}<meta name="${"description"}" content="${"HonestWork Jobs Page"}" class="${"svelte-d18fh4"}"><!-- HEAD_svelte-2gatsb_END -->`, ""}

<div style="${"height:16px"}" class="${"svelte-d18fh4"}"></div>
<main class="${"svelte-d18fh4"}"><div class="${"feed svelte-d18fh4"}"${add_attribute("style", `height:${feedHeight + 32}px;`, 0)}><div class="${"search-bar svelte-d18fh4"}"${add_attribute(
    "style",
    `${"background-color:var(--color-light-10)"}`,
    0
  )}><div class="${"input-container svelte-d18fh4"}"><img${add_attribute("src", "icons/search_active.svg", 0)} alt="${"search icon"}" class="${"svelte-d18fh4"}">
				<input class="${"search-input svelte-d18fh4"}" type="${"text"}" placeholder="${"Search for jobs"}"${add_attribute("value", search_input, 0)}>
				${``}</div>
			<div class="${"sorting-dropdown svelte-d18fh4"}"><div class="${"sorting-container svelte-d18fh4"}"><div class="${"sorting-wrapper svelte-d18fh4"}"><p class="${"light-40 svelte-d18fh4"}">sort by</p>
						<div style="${"width:8px"}" class="${"svelte-d18fh4"}"></div>
						<p class="${"svelte-d18fh4"}">${escape(sorting_options[chosen_sorting_option].k)}</p></div>
					<img${add_attribute(
    "src",
    "icons/chevron_passive.svg",
    0
  )} alt="${"chevron"}" class="${"svelte-d18fh4"}"></div>
				${``}</div></div>
		<div class="${"wrapper svelte-d18fh4"}"><div class="${"viewport svelte-d18fh4"}"${add_attribute("style", `width:520px; height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents svelte-d18fh4"}"${add_attribute("this", contents, 0)}><div style="${"height:8px"}" class="${"svelte-d18fh4"}"></div>
					${filteredJobs && filteredJobs.length > 0 ? `${each(filteredJobs, (job, index) => {
    return `${index == 0 ? `<div style="${"height:0px"}" class="${"svelte-d18fh4"}"${add_attribute("this", ghost_component, 0)}></div>` : ``}
							<div class="${"svelte-d18fh4"}">${validate_component(Job, "Job").$$render($$result, { chosen: job == active_job, job }, {}, {})}
							</div>`;
  })}` : ``}</div></div>
			${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}</div></div>
	<div style="${"width:12px"}" class="${"svelte-d18fh4"}"></div>
	<div class="${"job svelte-d18fh4"}">${active_job != null ? `${validate_component(JobPage, "JobPage").$$render($$result, { job: active_job }, {}, {})}` : ``}</div>
</main>`;
});
export {
  Page as default
};
