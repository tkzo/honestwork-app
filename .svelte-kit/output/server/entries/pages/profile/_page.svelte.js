import { c as create_ssr_component, b as subscribe, d as add_attribute, f as escape, v as validate_component, g as null_to_empty } from "../../../chunks/index3.js";
import "../../../chunks/Constants.js";
/* empty css                                                   */import { a as changes_made, b as chosen_skill_slot, s as skill_upload_urls, d as submitting, e as skill_add } from "../../../chunks/State.js";
import { e as userAddress, u as userConnected, d as userState } from "../../../chunks/Network.js";
import { T as Tiptap } from "../../../chunks/Tiptap.js";
import { t as tweened } from "../../../chunks/index4.js";
import { S as Svrollbar } from "../../../chunks/Svroller.svelte_svelte_type_style_lang.js";
import { a as assets, b as base } from "../../../chunks/paths.js";
import { J as Jumper } from "../../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import "../../../chunks/Validation.js";
const SkillEdit_svelte_svelte_type_style_lang = "";
const Skills_svelte_svelte_type_style_lang = "";
const Watchlist_svelte_svelte_type_style_lang = "";
const Favorites_svelte_svelte_type_style_lang = "";
const Applications_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".bio.svelte-y879u2{width:100%;height:100%}img.svelte-y879u2{width:188px;height:188px}.input-fields.svelte-y879u2{display:flex;flex-direction:column;justify-content:flex-start;flex:1}.input-field.svelte-y879u2{display:flex;flex-direction:row;justify-content:flex-start;position:relative;background-color:var(--color-dark);align-items:center}.placeholder.svelte-y879u2{height:32px;display:flex;background-color:var(--color-dark);border-width:1px 0px 1px 1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box;padding:8px}main.svelte-y879u2{width:100%;height:100%;display:flex;flex-direction:column;align-items:center}.bar.svelte-y879u2{width:520px;flex-direction:row;justify-content:space-between;align-items:center;padding:0px 12px 0px 0px;background:var(--color-light-2)}.info.svelte-y879u2{width:520px;display:flex;flex-direction:row}.tabs.svelte-y879u2{display:flex;flex-direction:row}.tab.svelte-y879u2{display:flex;flex-direction:row;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.flex-input.svelte-y879u2{height:32px;flex:1;background-color:var(--color-dark)}.error.svelte-y879u2{border-color:var(--color-error)}.success.svelte-y879u2:focus{border-color:var(--color-success)}.infobox.svelte-y879u2{width:240px;padding:8px;position:absolute;margin-left:532px}.gm.svelte-y879u2{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:12px;display:flex;flex-direction:column;align-items:center;text-align:center}.gm-inner.svelte-y879u2{display:flex;flex-direction:row;align-items:center}.file-input.svelte-y879u2{opacity:0;width:188px;height:32px;cursor:pointer}.file-input-container.svelte-y879u2{position:relative;border-width:0px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);cursor:pointer}.pseudo-file-input.svelte-y879u2{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);pointer-events:none}.input-like.svelte-y879u2{background-color:var(--color-dark);font-family:'Proto Mono', monospace;color:var(--color-light);padding:8px;border-width:1px;border-style:solid;border-color:var(--color-light-20);font-size:13px;line-height:16px;box-sizing:border-box;flex:1;height:32px;display:flex;flex-direction:row;justify-content:flex-start}.limit.svelte-y879u2{position:relative}.description-bar.svelte-y879u2{display:flex;flex-direction:row;justify-content:space-between;font-size:13px;line-height:16px;align-items:center}.description-title.svelte-y879u2{padding:8px;border-width:1px 1px 0px 1px}.nft-checkbox.svelte-y879u2{display:flex;flex-direction:column;align-items:center}.save-changes.svelte-y879u2{display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding:8px;border-width:0px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20)}.wrapper.svelte-y879u2{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-y879u2{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none;display:flex;flex-direction:column;align-items:center}.viewport.svelte-y879u2::-webkit-scrollbar{display:none}.contents.svelte-y879u2{width:520px}.loader-container.svelte-y879u2{width:100%;display:flex;flex-direction:column;align-items:center}",
  map: null
};
let placeholder_image = "assets/xcopy.gif";
let username_input_limit = 50;
let title_input_limit = 50;
let bio_limit = 2e3;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_chosen_skill_slot;
  let $$unsubscribe_skill_upload_urls;
  let $userAddress, $$unsubscribe_userAddress;
  let $userConnected, $$unsubscribe_userConnected;
  let $userState, $$unsubscribe_userState;
  let $submitting, $$unsubscribe_submitting;
  let $changes_made, $$unsubscribe_changes_made;
  let $$unsubscribe_skill_add;
  $$unsubscribe_chosen_skill_slot = subscribe(chosen_skill_slot, (value) => value);
  $$unsubscribe_skill_upload_urls = subscribe(skill_upload_urls, (value) => value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_userState = subscribe(userState, (value) => $userState = value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => $submitting = value);
  $$unsubscribe_changes_made = subscribe(changes_made, (value) => $changes_made = value);
  $$unsubscribe_skill_add = subscribe(skill_add, (value) => value);
  let { data } = $$props;
  let { viewport } = $$props;
  let { contents } = $$props;
  let inputSettings = {
    title: "username",
    infobox_distance: 0,
    infobox_content: "your username will be used to identify you on the platform."
  };
  let link_0 = data.user.links != null ? data.user.links[0] : "";
  let link_1 = data.user.links != null ? data.user.links[1] : "";
  let link_2 = data.user.links != null ? data.user.links[2] : "";
  let image_url = data.user.image_url;
  let profileForm;
  let nft_image = placeholder_image;
  let username = data.user.username;
  let show_nft = data.user.show_nft;
  let title = data.user.title;
  let email = data.user.email;
  let nft_id = data.user.nft_id;
  let nft_address = data.user.nft_address;
  let bio = data.user.bio;
  let dms_open = data.user.dms_open;
  let ens_name;
  let show_ens = data.user.show_ens;
  let ens_loading = false;
  let username_input_element;
  let username_input_length = 0;
  let title_input_element;
  let title_input_length = 0;
  let infobox_marginleft = "532px";
  let feedHeight = 0;
  let ens_component;
  let content;
  let total_chars = 0;
  const setEnsName = async () => {
    ens_loading = true;
    let res = await fetch(`${base}/api/ens/${$userAddress}`);
    let ens = await res.text();
    if (ens != "error") {
      ens_name = ens;
    } else {
      show_ens = false;
    }
    ens_loading = false;
  };
  tweened(1, { duration: 100 });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0)
    $$bindings.viewport(viewport);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css);
  {
    if ($userConnected && show_ens) {
      setEnsName();
    }
  }
  {
    {
      nft_image = placeholder_image;
    }
  }
  {
    if (username != data.user.username || title != data.user.title || email != data.user.email || nft_id != data.user.nft_id || nft_address != data.user.nft_address || link_0 != (data.user.links ? data.user.links[0] : "") || link_1 != (data.user.links ? data.user.links[1] : "") || link_2 != (data.user.links ? data.user.links[2] : "") || bio != data.user.bio || image_url != data.user.image_url || show_nft != data.user.show_nft || show_ens != data.user.show_ens || dms_open != data.user.dms_open) {
      changes_made.set(true);
    } else {
      changes_made.set(false);
    }
  }
  $$unsubscribe_chosen_skill_slot();
  $$unsubscribe_skill_upload_urls();
  $$unsubscribe_userAddress();
  $$unsubscribe_userConnected();
  $$unsubscribe_userState();
  $$unsubscribe_submitting();
  $$unsubscribe_changes_made();
  $$unsubscribe_skill_add();
  return `${$$result.head += `<!-- HEAD_svelte-nly3j5_START -->${$$result.title = `<title>HW | Profile</title>`, ""}<meta name="${"description"}" content="${"HonestWork Profile Page"}"><!-- HEAD_svelte-nly3j5_END -->`, ""}

<main class="${"wrapper svelte-y879u2"}"><div class="${"viewport svelte-y879u2"}"${add_attribute("style", `width:100%; height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents svelte-y879u2"}"${add_attribute("this", contents, 0)}><div style="${"height:16px"}"></div>
			${$userAddress.toLowerCase() == data.user.address.toLowerCase() && $userState > 0 ? `${`<form method="${"POST"}" action="${"?/profile"}"${add_attribute("this", profileForm, 0)}><input hidden name="${"ens_name"}"${add_attribute("value", ens_name, 0)}${add_attribute("this", ens_component, 0)}>
						<input hidden name="${"bio"}"${add_attribute("value", content, 0)}>

						<section class="${"bar svelte-y879u2"}"><div class="${"tabs svelte-y879u2"}"><p class="${"tab link semibold yellow svelte-y879u2"}">profile</p>
								<p class="${"tab link semibold light-60 svelte-y879u2"}">skills
								</p>
								<p class="${"tab link semibold light-60 svelte-y879u2"}">watchlist
								</p>
								<p class="${"tab link semibold light-60 svelte-y879u2"}">favorites
								</p>
								<p class="${"tab link semibold light-60 svelte-y879u2"}">applications
								</p></div></section>
						<div class="${"save-changes svelte-y879u2"}">${$submitting ? `<img${add_attribute("src", `${assets}/icons/loader.svg`, 0)} alt="${"loading"}" class="${"rotating svelte-y879u2"}" style="${"height:16px;width:16px;"}">
								<div style="${"width:4px;"}"></div>` : ``}
							<button id="${"profile_post"}" class="${escape(null_to_empty(`semibold link ${$changes_made ? "yellow" : "light-60"}`), true) + " svelte-y879u2"}">save changes</button></div>
						<div style="${"height: 16px"}"></div>
						<section class="${"infobox svelte-y879u2"}"${add_attribute("style", `margin-top:${inputSettings.infobox_distance}px; opacity:${"0"}; margin-left:${infobox_marginleft}`, 0)}><p class="${"light-60"}"${add_attribute(
    "style",
    `color:${""}`,
    0
  )}>${escape(inputSettings.infobox_content)}</p></section>
						<div class="${"info svelte-y879u2"}"><div class="${"left-section"}"><section><img${add_attribute("src", show_nft ? nft_image : image_url ?? placeholder_image, 0)} alt="${"Profile"}"${add_attribute("placeholder", placeholder_image, 0)} class="${"svelte-y879u2"}"></section>
								<div class="${"input-field file-input-container svelte-y879u2"}"><input name="${"file_url"}" class="${"file-input svelte-y879u2"}" type="${"file"}" accept="${"image/png, image/jpeg"}">
									<div class="${"pseudo-file-input-container"}"><p class="${"pseudo-file-input svelte-y879u2"}">UPLOAD FILE</p></div></div>
								<div class="${"input-field file-input-container nft-checkbox svelte-y879u2"}" style="${"cursor:pointer; padding:8px;"}"><div style="${"display:flex;flex-direction:row;"}"><input hidden type="${"checkbox"}" name="${"show_nft"}"${add_attribute("checked", show_nft, 1)}>
										${show_nft ? `<img src="${"icons/checked.svg"}" alt="${"Checked"}" style="${"height:16px;width:16px;"}" class="${"svelte-y879u2"}">
											<div style="${"width:8px"}"></div>
											<p class="${"yellow"}">use nft image</p>` : `<img${add_attribute("src", `${assets}/icons/unchecked.svg`, 0)} alt="${"Checked"}" style="${"height:16px;width:16px;"}" class="${"svelte-y879u2"}">
											<div style="${"width:8px"}"></div>
											<p class="${"light-60"}">use nft image</p>`}</div></div></div>

							<div style="${"width: 12px"}"></div>
							<div class="${"input-fields svelte-y879u2"}"><div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">username</p></div>
									${show_ens ? `${ens_loading ? `<div class="${"input-like svelte-y879u2"}"><img${add_attribute("src", `${assets}/icons/loader.svg`, 0)} alt="${"loading"}" class="${"rotating svelte-y879u2"}" style="${"height:16px;width:16px;"}">
												<div style="${"width:4px"}"></div>
												<p>loading ens...</p></div>` : `<div class="${"input-like svelte-y879u2"}">${escape(ens_name)}</div>`}` : ``}
									<input name="${"username"}" class="${"flex-input svelte-y879u2"}" type="${"text"}" ${show_ens ? "hidden" : ""}${add_attribute("placeholder", data.user.username, 0)}${add_attribute("maxlength", username_input_limit, 0)}${add_attribute("value", username, 0)}${add_attribute("this", username_input_element, 0)}>
									${!show_ens ? `<div style="${"width:8px"}"></div>
										<div class="${"limit svelte-y879u2"}"><p class="${"light-60"}"><span class="${"yellow"}">${escape(username_input_length)}</span>/${escape(username_input_limit)}</p></div>` : ``}</div>
								<div style="${"height: 8px"}"></div>
								<div class="${"input-field svelte-y879u2"}" style="${"cursor:pointer;"}"><input hidden type="${"checkbox"}" name="${"show_ens"}"${add_attribute("checked", show_ens, 1)}>
									<img${add_attribute(
    "src",
    show_ens ? `${assets}/icons/checked.svg` : `${assets}/icons/unchecked.svg`,
    0
  )} alt="${"Checked"}" style="${"height:16px;width:16px;"}" class="${"svelte-y879u2"}">
									<div style="${"width:4px"}"></div>
									<p${add_attribute("class", show_ens ? "yellow" : "light-60", 0)}>use ens name</p></div>
								<div style="${"height: 12px"}"></div>
								<div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">title</p></div>
									<input name="${"title"}" class="${"flex-input svelte-y879u2"}" type="${"text"}"${add_attribute("placeholder", data.user.title, 0)}${add_attribute("maxlength", title_input_limit, 0)}${add_attribute("value", title, 0)}${add_attribute("this", title_input_element, 0)}>
									<div style="${"width:8px"}"></div>
									<div class="${"limit svelte-y879u2"}"><p class="${"light-60"}"><span class="${"yellow"}">${escape(title_input_length)}</span>/${escape(title_input_limit)}</p></div></div>
								<div style="${"height: 8px"}"></div>
								<div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">email</p></div>
									<input name="${"email"}" class="${"flex-input svelte-y879u2"}" type="${"email"}"${add_attribute("placeholder", data.user.email, 0)}${add_attribute("value", email, 0)}></div>
								<div style="${"height: 8px"}"></div>
								<div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">nft address</p></div>
									<input name="${"nft_address"}" class="${"flex-input svelte-y879u2"}" type="${"text"}"${add_attribute("placeholder", data.user.nft_address, 0)}${add_attribute("value", nft_address, 0)}></div>
								<div style="${"height: 8px"}"></div>
								<div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">nft id</p></div>
									<input name="${"nft_id"}" class="${escape(null_to_empty(`flex-input no-spinner ${""}`), true) + " svelte-y879u2"}" type="${"number"}"${add_attribute("placeholder", data.user.nft_id, 0)}${add_attribute("value", nft_id, 0)}></div>
								<div style="${"height:12px"}"></div>
								<div class="${"input-field svelte-y879u2"}" style="${"cursor:pointer;"}"><input hidden type="${"checkbox"}" name="${"dms_open"}"${add_attribute("checked", dms_open, 1)}>
									<img${add_attribute(
    "src",
    dms_open ? `${assets}/icons/checked.svg` : `${assets}/icons/unchecked.svg`,
    0
  )} alt="${"Checked"}" style="${"height:16px;width:16px;"}" class="${"svelte-y879u2"}">
									<div style="${"width:4px"}"></div>
									<p${add_attribute("class", dms_open ? "yellow" : "light-60", 0)}>receive private messages</p></div>
								<div style="${"height:8px"}"></div></div></div>
						<div style="${"height: 16px"}"></div>
						<div class="${"links"}"><div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">link</p></div>
								<input${add_attribute("name", `link-0`, 0)} class="${"flex-input svelte-y879u2"}" type="${"text"}"${add_attribute("placeholder", link_0, 0)}${add_attribute("value", link_0, 0)}></div>
							<div style="${"height: 8px"}"></div>
							<div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">link</p></div>
								<input${add_attribute("name", `link-1`, 0)} class="${"flex-input svelte-y879u2"}" type="${"text"}"${add_attribute("placeholder", link_1, 0)}${add_attribute("value", link_1, 0)}></div>
							<div style="${"height: 8px"}"></div>
							<div class="${"input-field svelte-y879u2"}"><div class="${"placeholder svelte-y879u2"}"><p class="${"light-40"}">link</p></div>
								<input${add_attribute("name", `link-2`, 0)} class="${"flex-input svelte-y879u2"}" type="${"text"}"${add_attribute("placeholder", link_2, 0)}${add_attribute("value", link_2, 0)}></div></div>
						<div style="${"height: 16px"}"></div>
						<div class="${"description-bar svelte-y879u2"}"><section class="${"description-title svelte-y879u2"}"><p class="${"light-40"}">bio</p></section>
							<p class="${"chars light-60"}"><span class="${"yellow"}">${escape(total_chars)}</span>/${escape(bio_limit)}</p></div>
						<div class="${"bio svelte-y879u2"}">${validate_component(Tiptap, "Tiptap").$$render(
    $$result,
    {
      content: data.user.bio != "" ? JSON.parse(data.user.bio) : ""
    },
    {},
    {}
  )}</div></form>`}` : `${$userConnected && $userAddress.toLowerCase() != data.user.address.toLowerCase() ? `<div style="${"height: 16px"}"></div>
				<section style="${"display:flex; flex-direction:column;"}"><div class="${"gm svelte-y879u2"}"><p>switch to <span class="${"light-60"}">${escape(data.user.address.substring(0, 6) + "..." + data.user.address.substring(data.user.address.length - 4))}</span> to see this page.
						</p></div>
					<div class="${"gm link svelte-y879u2"}"><p>or login with <span>${escape($userAddress.substring(0, 6) + "..." + $userAddress.substring($userAddress.length - 4))}</span></p></div></section>` : `<div class="${"loader-container svelte-y879u2"}">${validate_component(Jumper, "Jumper").$$render(
    $$result,
    {
      size: "60",
      color: "var(--color-primary)",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}</div>`}`}
			<div style="${"height: 64px"}"></div></div></div>
	${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}
</main>`;
});
export {
  Page as default
};
