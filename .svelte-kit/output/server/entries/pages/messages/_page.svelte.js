import { c as create_ssr_component, b as subscribe, o as onDestroy, d as add_attribute, e as each, v as validate_component, f as escape, g as null_to_empty } from "../../../chunks/index3.js";
import { f as xmtpClient, e as userAddress } from "../../../chunks/Network.js";
import { f as fade, S as Svrollbar } from "../../../chunks/Svroller.svelte_svelte_type_style_lang.js";
import { J as Jumper } from "../../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
import { n as new_conversation_metadata } from "../../../chunks/State.js";
import "../../../chunks/Constants.js";
const Message_svelte_svelte_type_style_lang = "";
const AgreementDB_svelte_svelte_type_style_lang = "";
const AgreementChain_svelte_svelte_type_style_lang = "";
const NewAgreement_svelte_svelte_type_style_lang = "";
const Agreements_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-11j1xcl.svelte-11j1xcl{display:flex;flex-direction:row;justify-content:space-between}textarea.svelte-11j1xcl.svelte-11j1xcl{width:100%;resize:none;border:none}textarea.svelte-11j1xcl.svelte-11j1xcl:focus{outline:none}.peer-image.svelte-11j1xcl.svelte-11j1xcl{width:62px;height:62px}.inbox.svelte-11j1xcl.svelte-11j1xcl{width:320px;border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);box-sizing:content-box;display:flex;flex-direction:column}.inbox-item.svelte-11j1xcl.svelte-11j1xcl{width:319px;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;border-width:1px 0px 1px 0px;border-style:solid;border-top-color:var(--color-light-20);border-bottom-color:var(--color-light-20);cursor:pointer}.inbox-item.svelte-11j1xcl.svelte-11j1xcl:hover{background-color:var(--color-light-2)}.chosen-item.svelte-11j1xcl.svelte-11j1xcl{border-width:1px 1px 1px 0px;border-right-color:var(--color-primary);background-color:var(--color-light-2)}.inbox-inner-contents.svelte-11j1xcl.svelte-11j1xcl{width:228px;display:flex;flex-direction:column;align-items:flex-start}.wrapper.svelte-11j1xcl.svelte-11j1xcl{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.create-conversation.svelte-11j1xcl.svelte-11j1xcl{width:100%;height:32px;display:flex;flex-direction:row;justify-content:center;align-items:center;border-width:0px 0px 1px 0px;border-style:solid;border-bottom-color:var(--color-light-20);cursor:pointer}.chat.svelte-11j1xcl.svelte-11j1xcl{position:relative;width:520px;height:calc(100vh - 128px);border-style:solid;border-width:1px 1px 1px 1px;border-color:var(--color-light-20);display:flex;flex-direction:column;justify-content:flex-end}.chat-window.svelte-11j1xcl.svelte-11j1xcl{display:flex;flex-direction:column}.inbox-window.svelte-11j1xcl.svelte-11j1xcl{display:flex;flex-direction:column;width:100%;box-sizing:border-box}.gray-line.svelte-11j1xcl.svelte-11j1xcl{border-style:solid;border-width:1px 1px 1px 0px;border-color:var(--color-light-20)}.input-field.svelte-11j1xcl.svelte-11j1xcl{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-style:solid;border-width:1px 0px 0px 0px;border-color:var(--color-light-20)}.send-button.svelte-11j1xcl.svelte-11j1xcl{margin-right:12px;margin-top:3px}.inbox-wrapper.svelte-11j1xcl.svelte-11j1xcl{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:1px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1;display:flex;flex-direction:column-reverse}.viewport.svelte-11j1xcl.svelte-11j1xcl{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-11j1xcl.svelte-11j1xcl::-webkit-scrollbar{display:none}.spinster.svelte-11j1xcl.svelte-11j1xcl{width:100%;display:flex;flex-direction:column;align-items:center;margin-top:24px}.inbox-viewport.svelte-11j1xcl.svelte-11j1xcl{display:flex;flex-direction:column;width:100%}.inbox-contents.svelte-11j1xcl.svelte-11j1xcl{display:flex;flex-direction:column-reverse;align-items:flex-start}.tab-bar.svelte-11j1xcl.svelte-11j1xcl{position:absolute;top:0px;width:100%;height:32px;display:flex;flex-direction:row;justify-content:flex-start;border-style:solid;border-width:0px 0px 1px 0px;border-color:var(--color-light-20);box-sizing:border-box;align-items:center;z-index:10}.tab-bar-item.svelte-11j1xcl.svelte-11j1xcl{height:30px;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;border-style:solid;border-width:0px 1px 0px 0px;border-color:var(--color-light-20);padding:0px 12px}.tab-bar-item.svelte-11j1xcl.svelte-11j1xcl:hover{background-color:var(--color-light-2);cursor:pointer}.tab-bar-item.svelte-11j1xcl:hover p.svelte-11j1xcl{color:var(--color-primary)}.agreements.svelte-11j1xcl.svelte-11j1xcl{width:520px;height:calc(100vh - 128px);border-style:solid;border-width:1px 1px 1px 1px;border-color:var(--color-light-20);display:flex;flex-direction:column}.agreements-container.svelte-11j1xcl.svelte-11j1xcl{height:32px;flex-direction:row;justify-content:flex-start;align-items:center;padding:16px 20px}.new-agreement.svelte-11j1xcl.svelte-11j1xcl{width:fit-content;display:flex;flex-direction:row;justify-content:center;align-items:center;border:1px solid var(--color-light-20);cursor:pointer;padding:6px 8px}.new-agreement.svelte-11j1xcl.svelte-11j1xcl:hover{background-color:var(--color-light-2)}.sections-container.svelte-11j1xcl.svelte-11j1xcl{display:flex;flex-direction:column}",
  map: null
};
let placeholder_image = "assets/xcopy.gif";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_xmtpClient;
  let $$unsubscribe_new_conversation_metadata;
  let $$unsubscribe_userAddress;
  $$unsubscribe_xmtpClient = subscribe(xmtpClient, (value) => value);
  $$unsubscribe_new_conversation_metadata = subscribe(new_conversation_metadata, (value) => value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => value);
  let viewport_inbox;
  let contents_inbox;
  let conversations = new Array();
  let last_messages = new Array();
  let peers = new Array();
  let loaded = false;
  let user_input;
  new Array();
  let new_message = "";
  let rows = 1;
  let chosen_conversation;
  onDestroy(() => {
  });
  let feedHeight = 0;
  let inboxHeight = 0;
  const fakeTransition = (node) => fade(node, { duration: 0 });
  $$result.css.add(css);
  $$unsubscribe_xmtpClient();
  $$unsubscribe_new_conversation_metadata();
  $$unsubscribe_userAddress();
  return `<div style="${"height:16px"}"></div>
<main class="${"svelte-11j1xcl"}"><div class="${"inbox svelte-11j1xcl"}">${``}
		<div class="${"inbox-window svelte-11j1xcl"}"><div class="${"inbox-wrapper svelte-11j1xcl"}"><div class="${"viewport inbox-viewport svelte-11j1xcl"}"${add_attribute("style", `height:${inboxHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport_inbox, 0)}><div class="${"contents inbox-contents svelte-11j1xcl"}"${add_attribute("this", contents_inbox, 0)}>${conversations && loaded ? `<div style="${"height:8px"}"></div>

							${each(conversations, (convo, index) => {
    return `<div class="${escape(null_to_empty(`inbox-item ${chosen_conversation == convo ? "chosen-item" : ""}`), true) + " svelte-11j1xcl"}"><img class="${"peer-image svelte-11j1xcl"}"${add_attribute(
      "src",
      peers[index]?.show_nft ? peers[index]?.nft_image_url : peers[index]?.image_url && peers[index]?.image_url != "" ? peers[index]?.image_url : placeholder_image,
      0
    )} alt="${"smth"}">

									<div style="${"width: 12px;"}"></div>
									<div class="${"inbox-inner-contents svelte-11j1xcl"}"><p class="${"svelte-11j1xcl"}">${escape(peers[index]?.show_ens ? peers[index]?.ens_name : peers[index]?.username && peers[index]?.username != "" ? peers[index].username : "anon")}</p>
										${last_messages[index] && last_messages[index] != "" ? `<div class="${"body-text light-60"}">${escape(last_messages[index])}</div>` : ``}
									</div></div>
								${index != conversations.length - 1 ? `<div style="${"height: 12px;"}"></div>` : ``}`;
  })}` : `<div class="${"spinster svelte-11j1xcl"}">${validate_component(Jumper, "Jumper").$$render(
    $$result,
    {
      size: "60",
      color: "var(--color-primary)",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}
								<div style="${"height: 12px;"}"></div>
								<p class="${"light-60"}" style="${"animation: blinking 2s linear infinite;"}">connecting xmtp...
								</p></div>`}</div></div></div></div></div>
	<div style="${"width:12px"}"></div>
	<div class="${"chat svelte-11j1xcl"}"><div class="${"tab-bar svelte-11j1xcl"}"><div class="${"tab-bar-item svelte-11j1xcl"}"><p class="${escape(null_to_empty(`${"yellow"}`), true) + " svelte-11j1xcl"}">messages</p></div>
			<div class="${"tab-bar-item svelte-11j1xcl"}"><p class="${escape(null_to_empty(`${"light-60"}`), true) + " svelte-11j1xcl"}">agreements</p></div></div>
		<div class="${"sections-container svelte-11j1xcl"}">${`<div class="${"chat-window svelte-11j1xcl"}"><div class="${"wrapper svelte-11j1xcl"}"><div class="${"viewport chat-viewport svelte-11j1xcl"}"${add_attribute("style", `height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport_inbox, 0)}><div class="${"contents"}"${add_attribute("this", contents_inbox, 0)}>${``}</div></div>
						${validate_component(Svrollbar, "Svrollbar").$$render(
    $$result,
    {
      alwaysVisible: true,
      viewport: viewport_inbox,
      contents: contents_inbox,
      vThumbOut: fakeTransition,
      vTrackOut: fakeTransition
    },
    {},
    {}
  )}</div></div>
				<div class="${"input-field svelte-11j1xcl"}"><textarea placeholder="${"Write a message..."}" name="${"message"}"${add_attribute("rows", rows, 0)} maxlength="${"1000"}" class="${"svelte-11j1xcl"}"${add_attribute("this", user_input, 0)}></textarea>
					<div class="${"send-button svelte-11j1xcl"}">${new_message.length > 0 ? `<img src="${"icons/loader.svg"}" alt="${"loading"}" class="${"rotating"}">` : `<img src="${"/icons/message.svg"}" alt="${"send"}">`}</div></div>`}</div></div>
</main>`;
});
export {
  Page as default
};
