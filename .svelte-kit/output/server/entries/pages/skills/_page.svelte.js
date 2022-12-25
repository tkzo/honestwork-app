import { c as create_ssr_component, e as escape, k as null_to_empty, d as add_attribute, f as each, j as identity, o as createEventDispatcher, p as onDestroy, v as validate_component } from "../../../chunks/index.js";
import "fuzzy";
const Skill_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "section.svelte-ls3qaw.svelte-ls3qaw{width:520px;flex-direction:column;cursor:pointer;border-width:1px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20)}section.svelte-ls3qaw.svelte-ls3qaw:hover{background-color:var(--color-light-2)}.contents.svelte-ls3qaw.svelte-ls3qaw{display:flex;flex-direction:row;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20)}.thumbnail.svelte-ls3qaw.svelte-ls3qaw{height:180px;width:240px}.content.svelte-ls3qaw.svelte-ls3qaw{display:flex;flex-direction:column;padding:8px;justify-content:space-between;width:278px}.sub.svelte-ls3qaw.svelte-ls3qaw{width:100%;display:flex;flex-direction:row;justify-content:space-between}.preview-image.svelte-ls3qaw.svelte-ls3qaw{height:180px;width:240px}.tag-bar.svelte-ls3qaw.svelte-ls3qaw{display:flex;flex-direction:row;justify-content:space-between}.tags.svelte-ls3qaw.svelte-ls3qaw{display:flex;flex-direction:row}.tag.svelte-ls3qaw.svelte-ls3qaw{padding:8px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20)}.tag.svelte-ls3qaw.svelte-ls3qaw:hover{background-color:var(--color-primary)}.tag.svelte-ls3qaw:hover p.svelte-ls3qaw{color:var(--color-dark)}.tag.svelte-ls3qaw:hover span.svelte-ls3qaw{color:var(--color-dark)}.actions.svelte-ls3qaw.svelte-ls3qaw{display:flex;flex-direction:row;align-items:center}.action.svelte-ls3qaw.svelte-ls3qaw{height:16px;padding:8px;border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20)}.chosen.svelte-ls3qaw.svelte-ls3qaw{background-color:var(--color-light-2)}",
  map: null
};
let placeholder_image = "assets/xcopy.gif";
const Skill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tags;
  let trimmed_description;
  let { title } = $$props;
  let { description } = $$props;
  let { image_urls } = $$props;
  let { minimum_price } = $$props;
  let { chosen } = $$props;
  let { user_address } = $$props;
  let user;
  let image_component;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.image_urls === void 0 && $$bindings.image_urls && image_urls !== void 0)
    $$bindings.image_urls(image_urls);
  if ($$props.minimum_price === void 0 && $$bindings.minimum_price && minimum_price !== void 0)
    $$bindings.minimum_price(minimum_price);
  if ($$props.chosen === void 0 && $$bindings.chosen && chosen !== void 0)
    $$bindings.chosen(chosen);
  if ($$props.user_address === void 0 && $$bindings.user_address && user_address !== void 0)
    $$bindings.user_address(user_address);
  $$result.css.add(css$3);
  tags = [
    { key: "member", value: "tier 3" },
    { key: "jobs delivered", value: "666" },
    {
      key: "min. budget",
      value: "$" + minimum_price.toString().slice(0, 6)
    }
  ];
  trimmed_description = description.length > 120 ? description.slice(0, 120) + "..." : description;
  return `



<section class="${escape(null_to_empty(chosen ? "chosen" : ""), true) + " svelte-ls3qaw"}"><div class="${"contents svelte-ls3qaw"}"><div class="${"thumbnail svelte-ls3qaw"}"><img${add_attribute("src", image_urls[0] ?? placeholder_image, 0)} alt="${"gallery"}" class="${"preview-image svelte-ls3qaw"}"${add_attribute("this", image_component, 0)}></div>
		<div class="${"content svelte-ls3qaw"}"><div><p>${escape(title)}</p>
				<div style="${"height:12px"}"></div>
				<div class="${"body-text light-60"}">${escape(trimmed_description)}</div></div>
			<div class="${"sub svelte-ls3qaw"}"><p class="${"yellow"}">${escape(user?.username)}</p>
				<p>4.9<span class="${"light-60"}">(366)</span></p></div></div></div>
	<div class="${"tag-bar svelte-ls3qaw"}"><div class="${"tags svelte-ls3qaw"}">${each(tags, (tag) => {
    return `<div class="${"tag svelte-ls3qaw"}"><p class="${"link svelte-ls3qaw"}">${escape(tag.value)} <span class="${"light-40 svelte-ls3qaw"}">${escape(tag.key)}</span></p></div>
				${tag != tags[tags.length - 1] ? `<div style="${"width: 4px"}"></div>` : ``}`;
  })}</div>
		<div class="${"actions svelte-ls3qaw"}"><div class="${"action svelte-ls3qaw"}"><img src="${"icons/message.svg"}" alt="${"message"}"></div>
			<div class="${"action svelte-ls3qaw"}"><img src="${"icons/heart.svg"}" alt="${"heart"}"></div></div></div></section>
<div style="${"height: 12px"}"></div>`;
});
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
const Svrollbar_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".v-scrollbar.svelte-iodyq2{position:absolute;top:0;right:0;width:var(--svrollbar-track-width, 10px)}.v-scrollbar.fixed.svelte-iodyq2{position:fixed}.v-track.svelte-iodyq2{position:absolute;top:0;right:0;border-radius:var(--svrollbar-track-radius, initial);width:var(--svrollbar-track-width, 10px);opacity:var(--svrollbar-track-opacity, 1);background:var(--svrollbar-track-background, initial);box-shadow:var(--svrollbar-track-shadow, initial)}.v-thumb.svelte-iodyq2{position:relative;margin:0 auto;border-radius:var(--svrollbar-thumb-radius, 0.25rem);width:var(--svrollbar-thumb-width, 6px);opacity:var(--svrollbar-thumb-opacity, 0.5);background:var(--svrollbar-thumb-background, gray);box-shadow:var(--svrollbar-thumb-shadow, initial)}",
  map: null
};
const Svrollbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let teardownViewport;
  let teardownContents;
  let teardownTrack;
  let teardownThumb;
  let marginTop;
  let marginBottom;
  let marginRight;
  let marginLeft;
  let wholeHeight;
  let scrollTop;
  let trackHeight;
  let thumbHeight;
  let thumbTop;
  let scrollable;
  let visible;
  let { viewport } = $$props;
  let { contents } = $$props;
  let { hideAfter = 1e3 } = $$props;
  let { alwaysVisible = false } = $$props;
  let { initiallyVisible = false } = $$props;
  let { margin = {} } = $$props;
  let { vTrackIn = (node) => fade(node, { duration: 100 }) } = $$props;
  let { vTrackOut = (node) => fade(node, { duration: 300 }) } = $$props;
  let { vThumbIn = (node) => fade(node, { duration: 100 }) } = $$props;
  let { vThumbOut = (node) => fade(node, { duration: 300 }) } = $$props;
  const dispatch = createEventDispatcher();
  let vTrack;
  let vThumb;
  let startTop = 0;
  let startY = 0;
  let timer = 0;
  let windowScrollEnabled = false;
  let interacted = false;
  function setupViewport(viewport2) {
    if (!viewport2)
      return;
    teardownViewport?.();
    if (typeof window.ResizeObserver === "undefined") {
      throw new Error("window.ResizeObserver is missing.");
    }
    windowScrollEnabled = document.scrollingElement === viewport2;
    const element = windowScrollEnabled ? document : viewport2;
    element.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver((entries) => {
      for (const _entry of entries) {
        wholeHeight = viewport2?.scrollHeight ?? 0;
        trackHeight = viewport2?.clientHeight - (marginTop + marginBottom);
      }
    });
    observer.observe(viewport2);
    return () => {
      element.removeEventListener("scroll", onScroll);
      observer.unobserve(contents);
      observer.disconnect();
    };
  }
  function setupTrack(track) {
    if (!track)
      return;
    teardownTrack?.();
    vTrack.addEventListener("mouseenter", onTrackEnter);
    vTrack.addEventListener("mouseleave", onTrackLeave);
    return () => {
      vTrack.removeEventListener("mouseenter", onTrackEnter);
      vTrack.removeEventListener("mouseleave", onTrackLeave);
    };
  }
  function setupThumb(thumb) {
    if (!thumb)
      return;
    teardownThumb?.();
    vThumb.addEventListener("mousedown", onThumbDown, { passive: true });
    vThumb.addEventListener("touchstart", onThumbDown, { passive: true });
    return () => {
      vThumb.removeEventListener("mousedown", onThumbDown);
      vThumb.removeEventListener("touchstart", onThumbDown);
    };
  }
  function setupContents(contents2) {
    if (!contents2)
      return;
    teardownContents?.();
    if (typeof window.ResizeObserver === "undefined") {
      throw new Error("window.ResizeObserver is missing.");
    }
    const observer = new ResizeObserver((entries) => {
      for (const _entry of entries) {
        wholeHeight = viewport?.scrollHeight ?? 0;
      }
    });
    observer.observe(contents2);
    return () => {
      observer.unobserve(contents2);
      observer.disconnect();
    };
  }
  function setupTimer() {
    timer = window.setTimeout(
      () => {
        visible = scrollable && (alwaysVisible || initiallyVisible && !interacted) || false;
        dispatch("hide");
      },
      hideAfter
    );
  }
  function clearTimer() {
    if (timer) {
      window.clearTimeout(timer);
      timer = 0;
    }
  }
  function onScroll() {
    if (!scrollable)
      return;
    clearTimer();
    setupTimer();
    visible = alwaysVisible || initiallyVisible && !interacted || true;
    scrollTop = viewport?.scrollTop ?? 0;
    interacted = true;
    dispatch("show");
  }
  function onTrackEnter() {
    clearTimer();
  }
  function onTrackLeave() {
    clearTimer();
    setupTimer();
  }
  function onThumbDown(event) {
    event.stopPropagation();
    event.preventDefault();
    startTop = viewport.scrollTop;
    startY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
    document.addEventListener("mousemove", onThumbMove);
    document.addEventListener("touchmove", onThumbMove);
    document.addEventListener("mouseup", onThumbUp);
    document.addEventListener("touchend", onThumbUp);
  }
  function onThumbMove(event) {
    event.stopPropagation();
    event.preventDefault();
    const clientY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
    const ratio = wholeHeight / trackHeight;
    viewport.scrollTop = startTop + ratio * (clientY - startY);
  }
  function onThumbUp(event) {
    event.stopPropagation();
    event.preventDefault();
    startTop = 0;
    startY = 0;
    document.removeEventListener("mousemove", onThumbMove);
    document.removeEventListener("touchmove", onThumbMove);
    document.removeEventListener("mouseup", onThumbUp);
    document.removeEventListener("touchend", onThumbUp);
  }
  onDestroy(() => {
    teardownViewport?.();
    teardownContents?.();
    teardownTrack?.();
    teardownThumb?.();
  });
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0)
    $$bindings.viewport(viewport);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  if ($$props.hideAfter === void 0 && $$bindings.hideAfter && hideAfter !== void 0)
    $$bindings.hideAfter(hideAfter);
  if ($$props.alwaysVisible === void 0 && $$bindings.alwaysVisible && alwaysVisible !== void 0)
    $$bindings.alwaysVisible(alwaysVisible);
  if ($$props.initiallyVisible === void 0 && $$bindings.initiallyVisible && initiallyVisible !== void 0)
    $$bindings.initiallyVisible(initiallyVisible);
  if ($$props.margin === void 0 && $$bindings.margin && margin !== void 0)
    $$bindings.margin(margin);
  if ($$props.vTrackIn === void 0 && $$bindings.vTrackIn && vTrackIn !== void 0)
    $$bindings.vTrackIn(vTrackIn);
  if ($$props.vTrackOut === void 0 && $$bindings.vTrackOut && vTrackOut !== void 0)
    $$bindings.vTrackOut(vTrackOut);
  if ($$props.vThumbIn === void 0 && $$bindings.vThumbIn && vThumbIn !== void 0)
    $$bindings.vThumbIn(vThumbIn);
  if ($$props.vThumbOut === void 0 && $$bindings.vThumbOut && vThumbOut !== void 0)
    $$bindings.vThumbOut(vThumbOut);
  $$result.css.add(css$2);
  teardownViewport = setupViewport(viewport);
  teardownContents = setupContents(contents);
  teardownTrack = setupTrack(vTrack);
  teardownThumb = setupThumb(vThumb);
  marginTop = margin.top ?? 0;
  marginBottom = margin.bottom ?? 0;
  marginRight = margin.right ?? 0;
  marginLeft = margin.left ?? 0;
  wholeHeight = viewport?.scrollHeight ?? 0;
  scrollTop = viewport?.scrollTop ?? 0;
  trackHeight = viewport?.clientHeight ?? 0 - (marginTop + marginBottom);
  thumbHeight = wholeHeight > 0 ? trackHeight / wholeHeight * trackHeight : 0;
  thumbTop = wholeHeight > 0 ? scrollTop / wholeHeight * trackHeight : 0;
  scrollable = wholeHeight > trackHeight;
  visible = scrollable && (alwaysVisible || initiallyVisible);
  return `${visible ? `<div class="${["v-scrollbar svelte-iodyq2", windowScrollEnabled ? "fixed" : ""].join(" ").trim()}" style="${"height: " + escape(trackHeight, true) + "px; margin: " + escape(marginTop, true) + "px " + escape(marginRight, true) + "px " + escape(marginBottom, true) + "px " + escape(marginLeft, true) + "px"}"><div class="${"v-track svelte-iodyq2"}" style="${"height: " + escape(trackHeight, true) + "px"}"${add_attribute("this", vTrack, 0)}></div>
    <div class="${"v-thumb svelte-iodyq2"}" style="${"height: " + escape(thumbHeight, true) + "px; top: " + escape(thumbTop, true) + "px"}"${add_attribute("this", vThumb, 0)}></div></div>` : ``}`;
});
const Svroller_svelte_svelte_type_style_lang = "";
const SkillPage_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "main.svelte-sd7p78.svelte-sd7p78{width:520px;display:flex;flex-direction:column}.profile-bar.svelte-sd7p78.svelte-sd7p78{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-20);cursor:pointer}.left-section.svelte-sd7p78.svelte-sd7p78{display:flex;flex-direction:row;align-items:center}.pfp.svelte-sd7p78.svelte-sd7p78{width:40px;height:40px}.gallery.svelte-sd7p78.svelte-sd7p78{width:518px;border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:column}.gallery-images.svelte-sd7p78.svelte-sd7p78{width:100%;height:388px;border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20)}.gallery-buttons.svelte-sd7p78.svelte-sd7p78{display:flex;flex-direction:row;justify-content:space-between;align-items:center;cursor:pointer}.left-gallery-button.svelte-sd7p78.svelte-sd7p78{border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);padding:8px 12px}.right-gallery-button.svelte-sd7p78.svelte-sd7p78{border-width:0px 0px 0px 1px;border-style:solid;border-color:var(--color-light-20);padding:8px 12px}.right-gallery-button.svelte-sd7p78.svelte-sd7p78:hover{background-color:var(--color-primary)}.right-gallery-button.svelte-sd7p78:hover p.svelte-sd7p78{color:var(--color-dark)}.description.svelte-sd7p78.svelte-sd7p78{border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);padding:12px}.link-container.svelte-sd7p78.svelte-sd7p78{display:flex;flex-direction:row;align-items:center;border-width:1px;border-style:solid;border-color:var(--color-light-20)}.placeholder.svelte-sd7p78.svelte-sd7p78{padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20)}.wrapper.svelte-sd7p78.svelte-sd7p78{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-sd7p78.svelte-sd7p78{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-sd7p78.svelte-sd7p78::-webkit-scrollbar{display:none}",
  map: null
};
const SkillPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let feedHeight;
  let trimmed_images;
  let { skill } = $$props;
  let viewport;
  let contents;
  let user;
  let chosen_image = 0;
  const fetchUser = async () => {
    const res = await fetch(`/api/user/${skill.user_address}`);
    user = await res.json();
  };
  const resetState = () => {
    chosen_image = 0;
  };
  if ($$props.skill === void 0 && $$bindings.skill && skill !== void 0)
    $$bindings.skill(skill);
  $$result.css.add(css$1);
  feedHeight = window.innerHeight - 136;
  {
    if (skill) {
      fetchUser();
      resetState();
    }
  }
  trimmed_images = skill.image_urls.filter((url) => url !== "");
  return `<main class="${"svelte-sd7p78"}"><div class="${"profile-bar svelte-sd7p78"}"><div class="${"left-section svelte-sd7p78"}"><img class="${"pfp svelte-sd7p78"}"${add_attribute("src", user?.image_url, 0)} alt="${""}">
			<div style="${"width:8px;"}"></div>
			<p class="${"yellow"}">${escape(user?.username)}</p>
			<div style="${"width:8px;"}"></div>
			<p class="${"light-60"}">${escape(user?.title)}</p></div>
		<img src="${"icons/external.svg"}" alt="${"External Link"}" style="${"margin-right:8px;"}"></div>
	<div class="${"wrapper svelte-sd7p78"}"><div class="${"viewport svelte-sd7p78"}"${add_attribute("style", `height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}><div class="${"gallery svelte-sd7p78"}"><img class="${"gallery-images svelte-sd7p78"}"${add_attribute("src", trimmed_images[chosen_image], 0)} alt="${"Gallery"}">
					<div class="${"gallery-buttons svelte-sd7p78"}"><div class="${"left-gallery-button svelte-sd7p78"}"><p class="${"light-40"}">PREVIOUS</p></div>
						<p>${escape(chosen_image + 1)}/${escape(trimmed_images.length)}</p>
						<div class="${"right-gallery-button svelte-sd7p78"}"><p class="${"light-40 svelte-sd7p78"}">NEXT</p></div></div></div>
				<div style="${"height:12px;"}"></div>
				<div class="${"description svelte-sd7p78"}"><div class="${"body-text light-80"}">${escape(skill.description)}</div></div>
				<div style="${"height:12px;"}"></div>
				<div class="${"links"}">${each(skill.links, (link) => {
    return `<div class="${"link-container svelte-sd7p78"}"><p class="${"placeholder light-40 svelte-sd7p78"}">link</p>
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
  code: "main.svelte-1p50jnd{display:flex;flex-direction:row;justify-content:space-between}.feed.svelte-1p50jnd{width:520px;border-width:1px 1px 0px 1px;border-style:solid;border-color:var(--color-light-20);overflow-y:hidden}.skill.svelte-1p50jnd{width:520px}.search-bar.svelte-1p50jnd{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);display:flex;flex-direction:row;align-items:center;background:var(--color-light-2)}.input-container.svelte-1p50jnd{width:320px;padding:0px 8px;display:flex;flex-direction:row;align-items:center;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);position:relative}input.svelte-1p50jnd{border:none;width:240px;background:var(--color-light-2)}input.svelte-1p50jnd:focus{outline:none}.search-input.svelte-1p50jnd{padding:8px}.top.svelte-1p50jnd{display:flex;flex-direction:row;align-items:center;position:absolute;right:8px;cursor:pointer}.sorting-container.svelte-1p50jnd{width:200px;padding:8px;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.sorting-wrapper.svelte-1p50jnd{display:flex;flex-direction:row;align-items:center}.wrapper.svelte-1p50jnd{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-1p50jnd{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-1p50jnd::-webkit-scrollbar{display:none}.sorting-dropdown.svelte-1p50jnd{position:relative;cursor:pointer}.sorting-options.svelte-1p50jnd{position:absolute;z-index:66;margin-top:1px;margin-left:-1px;width:100%}.sorting-option.svelte-1p50jnd{display:flex;flex-direction:row;align-items:center;background-color:var(--color-light-2);padding:8px;border-width:0px 0px 1px 1px;border-style:solid;border-color:var(--color-light-20);flex:1}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let feedHeight;
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
    { k: "rating", v: "rating", a: "false" },
    {
      k: "min. budget",
      v: "minimum_price",
      a: "false"
    }
  ];
  let chosen_sorting_option = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0)
    $$bindings.viewport(viewport);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  $$result.css.add(css);
  feedHeight = window.innerHeight - 128;
  filteredSkills = data.json;
  {
    if (filteredSkills) {
      active_skill = filteredSkills[0];
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-2u39ee_START -->${$$result.title = `<title>Skills</title>`, ""}<meta name="${"description"}" content="${"HonestWork Skills Page"}"><!-- HEAD_svelte-2u39ee_END -->`, ""}

<main class="${"svelte-1p50jnd"}"><div class="${"feed svelte-1p50jnd"}"><div class="${"search-bar svelte-1p50jnd"}"><div class="${"input-container svelte-1p50jnd"}"><img${add_attribute(
    "src",
    "icons/search_passive.svg",
    0
  )} alt="${"search icon"}">
				<input class="${"search-input svelte-1p50jnd"}" type="${"text"}" placeholder="${"Search for skills"}"${add_attribute("value", search_input, 0)}>
				${``}</div>
			<div class="${"sorting-dropdown svelte-1p50jnd"}"><div class="${"sorting-container svelte-1p50jnd"}"><div class="${"sorting-wrapper svelte-1p50jnd"}"><p class="${"light-40"}">sort by</p>
						<div style="${"width:8px"}"></div>
						<p>${escape(sorting_options[chosen_sorting_option].k)}</p></div>
					<img${add_attribute(
    "src",
    "icons/chevron_passive.svg",
    0
  )} alt="${"chevron"}"></div>
				${``}</div></div>
		<div class="${"wrapper svelte-1p50jnd"}"><div class="${"viewport svelte-1p50jnd"}"${add_attribute("style", `width:520px; height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}><div style="${"height:8px"}"></div>
					
					${each(filteredSkills, (skill, index) => {
    return `${index == 0 ? `<div style="${"height:0px"}"${add_attribute("this", ghost_component, 0)}></div>` : ``}
						<div>${validate_component(Skill, "Skill").$$render(
      $$result,
      {
        chosen: skill == active_skill,
        title: skill.title,
        description: skill.description,
        image_urls: skill.image_urls,
        minimum_price: skill.minimum_price,
        user_address: skill.user_address
      },
      {},
      {}
    )}
						</div>`;
  })}</div></div>
			${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}</div></div>
	<div style="${"width:12px"}"></div>
	<div class="${"skill svelte-1p50jnd"}">${active_skill != null ? `${validate_component(SkillPage, "SkillPage").$$render($$result, { skill: active_skill }, {}, {})}` : ``}</div>
</main>`;
});
export {
  Page as default
};
