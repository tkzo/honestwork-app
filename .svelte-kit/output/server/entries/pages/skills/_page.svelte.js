import { c as create_ssr_component, b as subscribe, f as escape, g as null_to_empty, d as add_attribute, q as is_promise, n as noop, e as each, v as validate_component } from "../../../chunks/index3.js";
import "../../../chunks/State.js";
import { a as assets, b as base } from "../../../chunks/paths.js";
import { p as placeholder_image } from "../../../chunks/Constants.js";
import { u as userConnected, i as nodeProvider } from "../../../chunks/Network.js";
import { p as parseContent } from "../../../chunks/Parser.js";
import { S as Svrollbar } from "../../../chunks/Svroller.svelte_svelte_type_style_lang.js";
import { S as Skeleton } from "../../../chunks/Skeleton.js";
import { b as browser } from "../../../chunks/environment.js";
import { T as Tiptap } from "../../../chunks/Tiptap.js";
import "fuzzy";
const Skill_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "section.svelte-1oe7e9m.svelte-1oe7e9m{width:520px;flex-direction:column;cursor:pointer;border-width:1px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20)}section.svelte-1oe7e9m.svelte-1oe7e9m:hover{background-color:var(--color-light-2)}.contents.svelte-1oe7e9m.svelte-1oe7e9m{display:flex;flex-direction:row;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20)}.thumbnail.svelte-1oe7e9m.svelte-1oe7e9m{height:180px;width:240px}.content.svelte-1oe7e9m.svelte-1oe7e9m{display:flex;flex-direction:column;padding:8px;justify-content:space-between;width:278px}.sub.svelte-1oe7e9m.svelte-1oe7e9m{width:100%;display:flex;flex-direction:row;justify-content:space-between}.preview-image.svelte-1oe7e9m.svelte-1oe7e9m{height:180px;width:240px}.tag-bar.svelte-1oe7e9m.svelte-1oe7e9m{display:flex;flex-direction:row;justify-content:space-between}.tags.svelte-1oe7e9m.svelte-1oe7e9m{display:flex;flex-direction:row}.tag.svelte-1oe7e9m.svelte-1oe7e9m{padding:8px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20)}.tag.svelte-1oe7e9m.svelte-1oe7e9m:hover{background-color:var(--color-primary)}.tag.svelte-1oe7e9m:hover p.svelte-1oe7e9m{color:var(--color-dark)}.actions.svelte-1oe7e9m.svelte-1oe7e9m{display:flex;flex-direction:row;align-items:center}.action.svelte-1oe7e9m.svelte-1oe7e9m{height:16px;padding:8px;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20)}.chosen.svelte-1oe7e9m.svelte-1oe7e9m{background-color:var(--color-light-2)}",
  map: null
};
const Skill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userConnected;
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => value);
  let { chosen } = $$props;
  let { skill } = $$props;
  let user;
  const getRating = async () => {
  };
  if ($$props.chosen === void 0 && $$bindings.chosen && chosen !== void 0)
    $$bindings.chosen(chosen);
  if ($$props.skill === void 0 && $$bindings.skill && skill !== void 0)
    $$bindings.skill(skill);
  $$result.css.add(css$2);
  $$unsubscribe_userConnected();
  return `



<section class="${escape(null_to_empty(chosen ? "chosen" : ""), true) + " svelte-1oe7e9m"}"><div class="${"contents svelte-1oe7e9m"}"><div class="${"thumbnail svelte-1oe7e9m"}"><img${add_attribute("src", skill.image_urls[0] ?? placeholder_image, 0)} alt="${"gallery"}" class="${"preview-image svelte-1oe7e9m"}"></div>
		<div class="${"content svelte-1oe7e9m"}"><div><p>${escape(skill.title)}</p>
				<div style="${"height:12px"}"></div>
				<div class="${"body-text light-60"}">${escape(parseContent(skill.description).slice(0, 140) + "...")}</div></div>
			<div class="${"sub svelte-1oe7e9m"}"><p class="${"yellow"}">${escape(user?.username)}</p>
				${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
					<img${add_attribute("src", `${assets}/icons/loader.svg`, 0)} alt="${"loading"}" class="${"rotating"}" style="${"height:16px;width:16px;"}">
				`;
    }
    return function(rating) {
      return `
					<p><span class="${"light-60"}">rating:</span>${escape(rating)}/10</p>
				`;
    }(__value);
  }(getRating())}</div></div></div>
	<div class="${"tag-bar svelte-1oe7e9m"}"><div class="${"tags svelte-1oe7e9m"}">${each(skill.tags, (tag) => {
    return `<div class="${"tag svelte-1oe7e9m"}"><p class="${"link svelte-1oe7e9m"}">#${escape(tag)}</p></div>
				${tag != skill.tags[skill.tags.length - 1] ? `<div style="${"width: 4px"}"></div>` : ``}`;
  })}</div>
		<div class="${"actions svelte-1oe7e9m"}"><div class="${"action svelte-1oe7e9m"}"><img${add_attribute("src", `${assets}/icons/message.svg`, 0)} alt="${"message"}"></div>
			<div class="${"action svelte-1oe7e9m"}">${`<img${add_attribute("src", `${assets}/icons/heart.svg`, 0)} alt="${"heart"}">`}</div></div></div></section>
<div style="${"height: 12px"}"></div>`;
});
const SkillPage_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "main.svelte-1h5qr5r.svelte-1h5qr5r{width:520px;display:flex;flex-direction:column}.profile-bar.svelte-1h5qr5r.svelte-1h5qr5r{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-20);cursor:pointer}.profile-bar.svelte-1h5qr5r.svelte-1h5qr5r:hover{background-color:var(--color-light-2)}.left-section.svelte-1h5qr5r.svelte-1h5qr5r{display:flex;flex-direction:row;align-items:center}.pfp.svelte-1h5qr5r.svelte-1h5qr5r{width:40px;height:40px}.gallery.svelte-1h5qr5r.svelte-1h5qr5r{width:518px;border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:column}.gallery-images.svelte-1h5qr5r.svelte-1h5qr5r{width:100%;height:388px;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20)}.gallery-buttons.svelte-1h5qr5r.svelte-1h5qr5r{display:flex;flex-direction:row;justify-content:space-between;align-items:center;cursor:pointer}.left-gallery-button.svelte-1h5qr5r.svelte-1h5qr5r{border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);padding:8px 12px}.right-gallery-button.svelte-1h5qr5r.svelte-1h5qr5r{border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);padding:8px 12px}.right-gallery-button.svelte-1h5qr5r:hover p.svelte-1h5qr5r{color:var(--color-dark)}.left-gallery-button.svelte-1h5qr5r:hover p.svelte-1h5qr5r{color:var(--color-dark)}.link-container.svelte-1h5qr5r.svelte-1h5qr5r{display:flex;flex-direction:row;align-items:center;border-width:1px;border-style:solid;border-color:var(--color-light-20)}.placeholder.svelte-1h5qr5r.svelte-1h5qr5r{padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20)}.wrapper.svelte-1h5qr5r.svelte-1h5qr5r{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-1h5qr5r.svelte-1h5qr5r{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-1h5qr5r.svelte-1h5qr5r::-webkit-scrollbar{display:none}.skeleton-container.svelte-1h5qr5r.svelte-1h5qr5r{position:absolute;top:0;left:0;width:100%;height:100%}",
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
    ens_name = user.ens_name ?? await $nodeProvider.lookupAddress(skill.user_address);
    await getNft();
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
  return `<main class="${"svelte-1h5qr5r"}"><a class="${"profile-bar svelte-1h5qr5r"}"${add_attribute("href", `${base}/creator/${skill.user_address}`, 0)}><div class="${"left-section svelte-1h5qr5r"}"><img class="${"pfp svelte-1h5qr5r"}"${add_attribute(
    "src",
    user?.show_nft ? nft_image && nft_image != "" ? nft_image : placeholder_image : user?.image_url && user.image_url != "" ? user.image_url : placeholder_image,
    0
  )} alt="${""}">
			<div style="${"width:8px;"}"></div>
			${user?.show_ens && ens_name && ens_name != "" ? `<p class="${"yellow"}">${escape(ens_name)}</p>` : `${user?.username && user.username != "" ? `<p class="${"yellow"}">${escape(user?.username)}</p>` : `${validate_component(Skeleton, "Skeleton").$$render($$result, { width: "100px", height: "20px" }, {}, {})}`}`}
			<div style="${"width:8px;"}"></div>
			<p class="${"light-60"}">${escape(user?.title)}</p></div>
		<img${add_attribute("src", `${assets}/icons/external.svg`, 0)} alt="${"External Link"}" style="${"margin-right:8px;"}"></a>
	<div class="${"wrapper svelte-1h5qr5r"}"><div class="${"viewport svelte-1h5qr5r"}"${add_attribute("style", `height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}><div class="${"gallery svelte-1h5qr5r"}"><img class="${"gallery-images svelte-1h5qr5r"}"${add_attribute("src", trimmed_images[chosen_image], 0)} alt="${"Gallery"}">
					${``}
					<div class="${"gallery-buttons svelte-1h5qr5r"}"><div class="${"left-gallery-button link svelte-1h5qr5r"}"><p class="${"light-60 svelte-1h5qr5r"}">PREVIOUS</p></div>
						<p class="${"light-60"}"><span class="${"yellow"}">${escape(chosen_image + 1)}</span>/${escape(trimmed_images.length)}</p>
						<div class="${"right-gallery-button link svelte-1h5qr5r"}"><p class="${"light-60 svelte-1h5qr5r"}">NEXT</p></div></div></div>
				<div style="${"height:12px;"}"></div>
				${validate_component(Tiptap, "Tiptap").$$render(
    $$result,
    {
      content: JSON.parse(skill.description),
      editable: false
    },
    {},
    {}
  )}
				<div style="${"height:12px;"}"></div>
				<div class="${"links"}">${each(skill.links.filter((n) => n != ""), (link) => {
    return `<div class="${"link-container svelte-1h5qr5r"}"><p class="${"placeholder light-40 svelte-1h5qr5r"}">link</p>
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
  code: "main.svelte-1dl3ynh{display:flex;flex-direction:row;justify-content:space-between}.feed.svelte-1dl3ynh{width:520px;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-20);overflow-y:hidden;box-sizing:border-box}.skill.svelte-1dl3ynh{width:520px}.search-bar.svelte-1dl3ynh{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:row;align-items:center}.input-container.svelte-1dl3ynh{width:320px;padding:0px 8px;display:flex;flex-direction:row;align-items:center;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);position:relative}input.svelte-1dl3ynh{border:none;width:240px}input.svelte-1dl3ynh:focus{outline:none}.svelte-1dl3ynh::placeholder{color:var(--color-light-80)}.search-input.svelte-1dl3ynh{padding:8px}.top.svelte-1dl3ynh{display:flex;flex-direction:row;align-items:center;position:absolute;right:8px;cursor:pointer}.sorting-container.svelte-1dl3ynh{width:200px;padding:8px;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.sorting-wrapper.svelte-1dl3ynh{display:flex;flex-direction:row;align-items:center}.wrapper.svelte-1dl3ynh{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-1dl3ynh{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-1dl3ynh::-webkit-scrollbar{display:none}.sorting-dropdown.svelte-1dl3ynh{position:relative;cursor:pointer}.sorting-options.svelte-1dl3ynh{position:absolute;z-index:66;margin-top:1px;margin-left:-1px;width:100%}.sorting-option.svelte-1dl3ynh{display:flex;flex-direction:row;align-items:center;background-color:var(--color-light-2);padding:8px;border-width:0px 0px 1px 1px;border-style:solid;border-color:var(--color-light-20);flex:1}",
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
  return `${$$result.head += `<!-- HEAD_svelte-9fpxgr_START -->${$$result.title = `<title>HW | Skills</title>`, ""}<meta name="${"description"}" content="${"HonestWork Skills Page"}" class="${"svelte-1dl3ynh"}"><!-- HEAD_svelte-9fpxgr_END -->`, ""}

<div style="${"height:16px"}" class="${"svelte-1dl3ynh"}"></div>
<main class="${"svelte-1dl3ynh"}"><div class="${"feed svelte-1dl3ynh"}"><div class="${"search-bar svelte-1dl3ynh"}"${add_attribute(
    "style",
    `${"background-color:var(--color-light-10)"}`,
    0
  )}><div class="${"input-container svelte-1dl3ynh"}"><img${add_attribute("src", "icons/search_active.svg", 0)} alt="${"search icon"}" class="${"svelte-1dl3ynh"}">
				<input class="${"search-input svelte-1dl3ynh"}" type="${"text"}" placeholder="${"Search for skills"}"${add_attribute("value", search_input, 0)}>
				${``}</div>
			<div class="${"sorting-dropdown svelte-1dl3ynh"}"><div class="${"sorting-container svelte-1dl3ynh"}"><div class="${"sorting-wrapper svelte-1dl3ynh"}"><p class="${"light-40 svelte-1dl3ynh"}">sort by</p>
						<div style="${"width:8px"}" class="${"svelte-1dl3ynh"}"></div>
						<p class="${"svelte-1dl3ynh"}">${escape(sorting_options[chosen_sorting_option].k)}</p></div>
					<img${add_attribute(
    "src",
    "icons/chevron_passive.svg",
    0
  )} alt="${"chevron"}" class="${"svelte-1dl3ynh"}"></div>
				${``}</div></div>
		<div class="${"wrapper svelte-1dl3ynh"}"><div class="${"viewport svelte-1dl3ynh"}"${add_attribute("style", `width:520px; height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents svelte-1dl3ynh"}"${add_attribute("this", contents, 0)}><div style="${"height:8px"}" class="${"svelte-1dl3ynh"}"></div>
					${filteredSkills && filteredSkills.length > 0 ? `${each(filteredSkills, (skill, index) => {
    return `${index == 0 ? `<div style="${"height:0px"}" class="${"svelte-1dl3ynh"}"${add_attribute("this", ghost_component, 0)}></div>` : ``}
							<div class="${"svelte-1dl3ynh"}">${validate_component(Skill, "Skill").$$render($$result, { chosen: skill == active_skill, skill }, {}, {})}
							</div>`;
  })}` : ``}</div></div>
			${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}</div></div>
	<div style="${"width:12px"}" class="${"svelte-1dl3ynh"}"></div>
	<div class="${"skill svelte-1dl3ynh"}">${active_skill != null ? `${validate_component(SkillPage, "SkillPage").$$render($$result, { skill: active_skill }, {}, {})}` : ``}</div>
</main>`;
});
export {
  Page as default
};
