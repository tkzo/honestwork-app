import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../chunks/index.js";
import "../../chunks/Network.js";
import { S as Svrollbar } from "../../chunks/Svrollbar.js";
/* empty css                                                   */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".wrapper.svelte-siapzz{width:80vw}.wrapper.svelte-siapzz{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1;width:100%}.viewport.svelte-siapzz{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none;width:100%;display:flex;flex-direction:column;align-items:center;height:100vh}.viewport.svelte-siapzz::-webkit-scrollbar{display:none}.contents.svelte-siapzz{width:520px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let viewport;
  let contents;
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-h90vph_START -->${$$result.title = `<title>HonestWorkDAO</title>`, ""}<meta name="${"description"}" content="${"HonestWork"}"><!-- HEAD_svelte-h90vph_END -->`, ""}

<div class="${"wrapper svelte-siapzz"}"><div class="${"viewport svelte-siapzz"}"${add_attribute("this", viewport, 0)}><div class="${"contents svelte-siapzz"}"${add_attribute("this", contents, 0)}><div>LOGIN</div>
			<div>EXPLORE</div>
			
			
			
			</div></div>
	${validate_component(Svrollbar, "Svrollbar").$$render($$result, { alwaysVisible: true, viewport, contents }, {}, {})}
</div>`;
});
export {
  Page as default
};
