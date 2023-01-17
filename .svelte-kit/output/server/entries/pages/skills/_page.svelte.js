import { c as create_ssr_component, b as subscribe, f as escape, g as null_to_empty, d as add_attribute, e as each, v as validate_component } from "../../../chunks/index.js";
import { u as userConnected, f as nodeProvider } from "../../../chunks/Network.js";
import { a as assets, b as base } from "../../../chunks/paths.js";
import { p as placeholder_image } from "../../../chunks/Constants.js";
import { S as Svrollbar } from "../../../chunks/Svrollbar.js";
/* empty css                                                      */import { S as Skeleton } from "../../../chunks/Skeleton.js";
import { b as browser } from "../../../chunks/environment.js";
import "fuzzy";
const Skill_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "section.svelte-wg54sw.svelte-wg54sw{width:520px;flex-direction:column;cursor:pointer;border-width:1px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}section.svelte-wg54sw.svelte-wg54sw:hover{background-color:var(--color-light-2)}.contents.svelte-wg54sw.svelte-wg54sw{display:flex;flex-direction:row;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}.thumbnail.svelte-wg54sw.svelte-wg54sw{height:180px;width:240px}.content.svelte-wg54sw.svelte-wg54sw{display:flex;flex-direction:column;padding:8px;justify-content:space-between;width:278px}.sub.svelte-wg54sw.svelte-wg54sw{width:100%;display:flex;flex-direction:row;justify-content:space-between}.preview-image.svelte-wg54sw.svelte-wg54sw{height:180px;width:240px}.tag-bar.svelte-wg54sw.svelte-wg54sw{display:flex;flex-direction:row;justify-content:space-between}.tags.svelte-wg54sw.svelte-wg54sw{display:flex;flex-direction:row}.tag.svelte-wg54sw.svelte-wg54sw{padding:8px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10)}.tag.svelte-wg54sw.svelte-wg54sw:hover{background-color:var(--color-primary)}.tag.svelte-wg54sw:hover p.svelte-wg54sw{color:var(--color-dark)}.tag.svelte-wg54sw:hover span.svelte-wg54sw{color:var(--color-dark)}.actions.svelte-wg54sw.svelte-wg54sw{display:flex;flex-direction:row;align-items:center}.action.svelte-wg54sw.svelte-wg54sw{height:16px;padding:8px;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-10)}.chosen.svelte-wg54sw.svelte-wg54sw{background-color:var(--color-light-2)}",
  map: null
};
const Skill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tags;
  let trimmed_description;
  let $$unsubscribe_userConnected;
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => value);
  let { chosen } = $$props;
  let { skill } = $$props;
  let title = skill.title;
  let description = skill.description;
  let image_urls = skill.image_urls;
  let minimum_price = skill.minimum_price;
  skill.user_address;
  let user;
  let image_component;
  if ($$props.chosen === void 0 && $$bindings.chosen && chosen !== void 0)
    $$bindings.chosen(chosen);
  if ($$props.skill === void 0 && $$bindings.skill && skill !== void 0)
    $$bindings.skill(skill);
  $$result.css.add(css$2);
  tags = [
    { key: "member", value: "tier 3" },
    { key: "jobs delivered", value: "666" },
    {
      key: "min. budget",
      value: "$" + minimum_price.toString().slice(0, 6)
    }
  ];
  trimmed_description = description.length > 120 ? description.slice(0, 120) + "..." : description;
  $$unsubscribe_userConnected();
  return `



<section class="${escape(null_to_empty(chosen ? "chosen" : ""), true) + " svelte-wg54sw"}"><div class="${"contents svelte-wg54sw"}"><div class="${"thumbnail svelte-wg54sw"}"><img${add_attribute("src", image_urls[0] ?? placeholder_image, 0)} alt="${"gallery"}" class="${"preview-image svelte-wg54sw"}"${add_attribute("this", image_component, 0)}></div>
		<div class="${"content svelte-wg54sw"}"><div><p>${escape(title)}</p>
				<div style="${"height:12px"}"></div>
				<div class="${"body-text light-60"}">${escape(trimmed_description)}</div></div>
			<div class="${"sub svelte-wg54sw"}"><p class="${"yellow"}">${escape(user?.username)}</p>
				<p>4.9<span class="${"light-60"}">(366)</span></p></div></div></div>
	<div class="${"tag-bar svelte-wg54sw"}"><div class="${"tags svelte-wg54sw"}">${each(tags, (tag) => {
    return `<div class="${"tag svelte-wg54sw"}"><p class="${"link svelte-wg54sw"}">${escape(tag.value)} <span class="${"light-40 svelte-wg54sw"}">${escape(tag.key)}</span></p></div>
				${tag != tags[tags.length - 1] ? `<div style="${"width: 4px"}"></div>` : ``}`;
  })}</div>
		<div class="${"actions svelte-wg54sw"}"><div class="${"action svelte-wg54sw"}"><a href="${"/messages"}"><img${add_attribute("src", `${assets}/icons/message.svg`, 0)} alt="${"message"}"></a></div>
			<div class="${"action svelte-wg54sw"}">${`<img${add_attribute("src", `${assets}/icons/heart.svg`, 0)} alt="${"heart"}">`}</div></div></div></section>
<div style="${"height: 12px"}"></div>`;
});
const SkillPage_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "main.svelte-17mq2nz.svelte-17mq2nz{width:520px;display:flex;flex-direction:column}.profile-bar.svelte-17mq2nz.svelte-17mq2nz{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-10);cursor:pointer}.profile-bar.svelte-17mq2nz.svelte-17mq2nz:hover{background-color:var(--color-light-2)}.left-section.svelte-17mq2nz.svelte-17mq2nz{display:flex;flex-direction:row;align-items:center}.pfp.svelte-17mq2nz.svelte-17mq2nz{width:40px;height:40px}.gallery.svelte-17mq2nz.svelte-17mq2nz{width:518px;border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-10);display:flex;flex-direction:column}.gallery-images.svelte-17mq2nz.svelte-17mq2nz{width:100%;height:388px;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10)}.gallery-buttons.svelte-17mq2nz.svelte-17mq2nz{display:flex;flex-direction:row;justify-content:space-between;align-items:center;cursor:pointer}.left-gallery-button.svelte-17mq2nz.svelte-17mq2nz{border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10);padding:8px 12px}.right-gallery-button.svelte-17mq2nz.svelte-17mq2nz{border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-10);padding:8px 12px}.right-gallery-button.svelte-17mq2nz.svelte-17mq2nz:hover{background-color:var(--color-primary)}.right-gallery-button.svelte-17mq2nz:hover p.svelte-17mq2nz{color:var(--color-dark)}.description.svelte-17mq2nz.svelte-17mq2nz{border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-10);padding:12px}.link-container.svelte-17mq2nz.svelte-17mq2nz{display:flex;flex-direction:row;align-items:center;border-width:1px;border-style:solid;border-color:var(--color-light-10)}.placeholder.svelte-17mq2nz.svelte-17mq2nz{padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10)}.wrapper.svelte-17mq2nz.svelte-17mq2nz{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-17mq2nz.svelte-17mq2nz{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-17mq2nz.svelte-17mq2nz::-webkit-scrollbar{display:none}",
  map: null
};
const SkillPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trimmed_images;
  let $nodeProvider, $$unsubscribe_nodeProvider;
  $$unsubscribe_nodeProvider = subscribe(nodeProvider, (value) => $nodeProvider = value);
  let { skill } = $$props;
  let viewport;
  let contents;
  let user;
  let chosen_image = 0;
  let nft_image;
  let ens_name;
  let feedHeight = 0;
  const fetchUser = async () => {
    const res = await fetch(`${base}/api/user/${skill.user_address}`);
    user = await res.json();
    await getNft();
    ens_name = await $nodeProvider.lookupAddress(skill.user_address);
  };
  const resetState = () => {
    chosen_image = 0;
    ens_name = "";
    nft_image = "";
  };
  const getNft = async () => {
    if (user.nft_address && user.nft_id) {
      try {
        const response = await fetch(`${base}/api/alchemy/${user.nft_address}/${user.nft_id}`);
        if (response.ok) {
          const data = await response.json();
          nft_image = data.image;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  if ($$props.skill === void 0 && $$bindings.skill && skill !== void 0)
    $$bindings.skill(skill);
  $$result.css.add(css$1);
  {
    if (skill && browser) {
      nft_image = "";
      resetState();
      fetchUser();
    }
  }
  trimmed_images = skill.image_urls.filter((url) => url !== "");
  $$unsubscribe_nodeProvider();
  return `<main class="${"svelte-17mq2nz"}"><a class="${"profile-bar svelte-17mq2nz"}"${add_attribute("href", `${base}/creator/${skill.user_address}`, 0)} target="${"_blank"}" rel="${"noreferrer"}"><div class="${"left-section svelte-17mq2nz"}"><img class="${"pfp svelte-17mq2nz"}"${add_attribute(
    "src",
    user?.show_nft ? nft_image && nft_image != "" ? nft_image : placeholder_image : user?.image_url && user.image_url != "" ? user.image_url : placeholder_image,
    0
  )} alt="${""}">
			<div style="${"width:8px;"}"></div>
			${user?.show_ens && ens_name && ens_name != "" ? `<p class="${"yellow"}">${escape(ens_name)}</p>` : `${user?.username && user.username != "" ? `<p class="${"yellow"}">${escape(user?.username)}</p>` : `${validate_component(Skeleton, "Skeleton").$$render($$result, { width: "100px", height: "20px" }, {}, {})}`}`}
			<div style="${"width:8px;"}"></div>
			<p class="${"light-60"}">${escape(user?.title)}</p></div>
		<img${add_attribute("src", `${assets}/icons/external.svg`, 0)} alt="${"External Link"}" style="${"margin-right:8px;"}"></a>
	<div class="${"wrapper svelte-17mq2nz"}"><div class="${"viewport svelte-17mq2nz"}"${add_attribute("style", `height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}><div class="${"gallery svelte-17mq2nz"}"><img class="${"gallery-images svelte-17mq2nz"}"${add_attribute("src", trimmed_images[chosen_image], 0)} alt="${"Gallery"}">
					<div class="${"gallery-buttons svelte-17mq2nz"}"><div class="${"left-gallery-button svelte-17mq2nz"}"><p class="${"light-40"}">PREVIOUS</p></div>
						<p>${escape(chosen_image + 1)}/${escape(trimmed_images.length)}</p>
						<div class="${"right-gallery-button svelte-17mq2nz"}"><p class="${"light-40 svelte-17mq2nz"}">NEXT</p></div></div></div>
				<div style="${"height:12px;"}"></div>
				<div class="${"description svelte-17mq2nz"}"><div class="${"body-text light-80"}">${escape(skill.description)}</div></div>
				<div style="${"height:12px;"}"></div>
				<div class="${"links"}">${each(skill.links, (link) => {
    return `<div class="${"link-container svelte-17mq2nz"}"><p class="${"placeholder light-40 svelte-17mq2nz"}">link</p>
							<div style="${"width:8px;"}"></div>
							<a${add_attribute("href", link, 0)}><p class="${"light-80"}">${escape(link)}</p>
							</a></div>
						${link !== skill.links[skill.links.length - 1] ? `<div style="${"height:8px;"}"></div>` : ``}`;
  })}</div>
				<div style="${"height:32px;"}"></div></div></div>
		${validate_component(Svrollbar, "Svrollbar").$$render($$result, { alwaysVisible: true, viewport, contents }, {}, {})}</div>
</main>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-2maeha{display:flex;flex-direction:row;justify-content:space-between}.feed.svelte-2maeha{width:520px;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-10);overflow-y:hidden}.skill.svelte-2maeha{width:520px}.search-bar.svelte-2maeha{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-10);display:flex;flex-direction:row;align-items:center;background:var(--color-light-2)}.input-container.svelte-2maeha{width:320px;padding:0px 8px;display:flex;flex-direction:row;align-items:center;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-10);position:relative}input.svelte-2maeha{border:none;width:240px;background:var(--color-light-2)}input.svelte-2maeha:focus{outline:none}.search-input.svelte-2maeha{padding:8px}.top.svelte-2maeha{display:flex;flex-direction:row;align-items:center;position:absolute;right:8px;cursor:pointer}.sorting-container.svelte-2maeha{width:200px;padding:8px;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.sorting-wrapper.svelte-2maeha{display:flex;flex-direction:row;align-items:center}.wrapper.svelte-2maeha{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-2maeha{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-2maeha::-webkit-scrollbar{display:none}.sorting-dropdown.svelte-2maeha{position:relative;cursor:pointer}.sorting-options.svelte-2maeha{position:absolute;z-index:66;margin-top:1px;margin-left:-1px;width:100%}.sorting-option.svelte-2maeha{display:flex;flex-direction:row;align-items:center;background-color:var(--color-light-2);padding:8px;border-width:0px 0px 1px 1px;border-style:solid;border-color:var(--color-light-10);flex:1}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredSkills;
  let { data } = $$props;
  let { viewport } = $$props;
  let { contents } = $$props;
  let ghost_component;
  let search_input = "";
  let active_skill = null;
  let sorting_options = [
    {
      k: "publish date",
      v: "created_at",
      a: "false"
    },
    {
      k: "budget",
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
      active_skill = filteredSkills[0];
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-9fpxgr_START -->${$$result.title = `<title>HW | Skills</title>`, ""}<meta name="${"description"}" content="${"HonestWork Skills Page"}"><!-- HEAD_svelte-9fpxgr_END -->`, ""}

<main class="${"svelte-2maeha"}"><div class="${"feed svelte-2maeha"}"><div class="${"search-bar svelte-2maeha"}"><div class="${"input-container svelte-2maeha"}"><img${add_attribute(
    "src",
    "icons/search_passive.svg",
    0
  )} alt="${"search icon"}">
				<input class="${"search-input svelte-2maeha"}" type="${"text"}" placeholder="${"Search for skills"}"${add_attribute("value", search_input, 0)}>
				${``}</div>
			<div class="${"sorting-dropdown svelte-2maeha"}"><div class="${"sorting-container svelte-2maeha"}"><div class="${"sorting-wrapper svelte-2maeha"}"><p class="${"light-40"}">sort by</p>
						<div style="${"width:8px"}"></div>
						<p>${escape(sorting_options[chosen_sorting_option].k)}</p></div>
					<img${add_attribute(
    "src",
    "icons/chevron_passive.svg",
    0
  )} alt="${"chevron"}"></div>
				${``}</div></div>
		<div class="${"wrapper svelte-2maeha"}"><div class="${"viewport svelte-2maeha"}"${add_attribute("style", `width:520px; height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}><div style="${"height:8px"}"></div>
					${filteredSkills && filteredSkills.length > 0 ? `${each(filteredSkills, (skill, index) => {
    return `${index == 0 ? `<div style="${"height:0px"}"${add_attribute("this", ghost_component, 0)}></div>` : ``}
							<div>${validate_component(Skill, "Skill").$$render($$result, { chosen: skill == active_skill, skill }, {}, {})}
							</div>`;
  })}` : ``}</div></div>
			${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}</div></div>
	<div style="${"width:12px"}"></div>
	<div class="${"skill svelte-2maeha"}">${active_skill != null ? `${validate_component(SkillPage, "SkillPage").$$render($$result, { skill: active_skill }, {}, {})}` : ``}</div>
</main>`;
});
export {
  Page as default
};
