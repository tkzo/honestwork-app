import { c as create_ssr_component, e as escape } from "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1is31pg_START -->${$$result.title = `<title>Profile</title>`, ""}<meta name="${"description"}" content="${"HonestWork Profile Page"}"><!-- HEAD_svelte-1is31pg_END -->`, ""}

<p>${escape(data)}</p>`;
});
export {
  Page as default
};
