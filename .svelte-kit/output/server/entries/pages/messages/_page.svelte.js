import { c as create_ssr_component, b as subscribe, f as escape, d as add_attribute, o as onDestroy, e as each, v as validate_component, g as null_to_empty } from "../../../chunks/index.js";
import { f as userAddress, u as userConnected, g as nodeProvider, i as xmtpClient, j as new_conversation_metadata } from "../../../chunks/Network.js";
import { S as Svrollbar } from "../../../chunks/Svrollbar.js";
/* empty css                                                      */import { a as assets } from "../../../chunks/paths.js";
import { J as Jumper } from "../../../chunks/ArrowUp.svelte_svelte_type_style_lang.js";
const Message_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".self-message.svelte-cnfgry{display:flex;flex-direction:row;justify-content:flex-end}.date.svelte-cnfgry{display:flex;flex-direction:row;justify-content:flex-end;padding:4px}.peer-message.svelte-cnfgry{display:flex;flex-direction:row;justify-content:flex-start}.self-meta-message.svelte-cnfgry{display:flex;flex-direction:row;justify-content:flex-end}.meta-message-contents.svelte-cnfgry{width:320px;display:flex;flex-direction:column;justify-content:flex-start}.meta-message-header.svelte-cnfgry{width:100%;display:flex;flex-direction:row;justify-content:space-between;padding:8px 12px;box-sizing:border-box;border-style:solid;border-width:1px 0px 1px 1px;border-color:var(--color-light-20);cursor:pointer}.meta-message-header.svelte-cnfgry:hover{background-color:var(--color-light-2)}.message-contents.svelte-cnfgry{background-color:var(--color-light-2);padding:12px 16px;width:100%;display:flex;flex-direction:row;justify-self:flex-end;width:max-content;max-width:352px}.yellow-line.svelte-cnfgry{border-style:solid;border-width:0px 0px 0px 1px;border-color:var(--color-primary)}.gray-line.svelte-cnfgry{border-style:solid;border-width:1px 1px 1px 0px;border-color:var(--color-light-10)}.dropdown-container.svelte-cnfgry{display:flex;flex-direction:column;justify-content:flex-start;box-sizing:border-box;border-style:solid;border-width:0px 0px 1px 1px;border-color:var(--color-light-20);padding:8px}.dropdown-item.svelte-cnfgry{display:flex;flex-direction:row;justify-content:space-between;padding:4px}.command-bar.svelte-cnfgry{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;height:32px;padding:4px;box-sizing:border-box;margin-top:8px}.action-button.svelte-cnfgry{height:32px;width:166px;display:flex;justify-content:center;align-items:center;cursor:pointer;box-sizing:border-box;border:1px solid var(--color-light-20)}.token-link.svelte-cnfgry{display:flex;flex-direction:row;align-items:center}.token-link.svelte-cnfgry:hover{background-color:var(--color-light-2);cursor:pointer}",
  map: null
};
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userAddress, $$unsubscribe_userAddress;
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  let { message } = $$props;
  let { index } = $$props;
  let { array_length } = $$props;
  let meta_message;
  let parsed = false;
  let ismeta = message.content.startsWith("Meta:");
  const parseDate = (d) => {
    let date = new Date(d);
    return date.toLocaleString();
  };
  const parseMeta = (m) => {
    let stringified = m.split(":").slice(1, m.length).join(":");
    try {
      meta_message = JSON.parse(stringified);
      parsed = true;
    } catch (e) {
      console.log("Error parsing meta message: ", e);
    }
  };
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.array_length === void 0 && $$bindings.array_length && array_length !== void 0)
    $$bindings.array_length(array_length);
  $$result.css.add(css$1);
  {
    console.log("Message:", message);
  }
  {
    if (ismeta) {
      parseMeta(message.content);
    }
  }
  $$unsubscribe_userAddress();
  return `



<div style="${"height:12px"}"></div>

${ismeta && parsed && meta_message.type == "new agreement offer" ? `<div class="${"date  svelte-cnfgry"}"><div class="${"body-text light-60"}">${escape(parseDate(message.sent))}</div></div>
	<div class="${"self-meta-message svelte-cnfgry"}"><div class="${"date svelte-cnfgry"}"></div>
		<div class="${"meta-message-contents svelte-cnfgry"}"><div class="${"meta-message-header svelte-cnfgry"}"><p class="${"yellow"}">${escape(meta_message.type)}</p>
				<img${add_attribute("src", `${assets}/icons/chevron_${"passive"}.svg`, 0)} alt="${"arrow-right"}"></div>
			${``}</div></div>` : `${ismeta && !parsed ? `<div class="${"self-message svelte-cnfgry"}"><div class="${"message-contents yellow-line svelte-cnfgry"}"><p class="${"red"}">incompatible message format</p></div></div>` : `${message.senderAddress == $userAddress ? `<div class="${"date  svelte-cnfgry"}"><div class="${"body-text light-60"}">${escape(parseDate(message.sent))}</div></div>
	<div class="${"self-message svelte-cnfgry"}"><div class="${"message-contents yellow-line svelte-cnfgry"}"><div class="${"body-text light-80"}">${escape(message.content)}</div></div></div>` : `<div class="${"peer-message svelte-cnfgry"}"><div class="${"date svelte-cnfgry"}"></div>
		<div class="${"message-contents gray-line svelte-cnfgry"}"><div class="${"body-text light-80"}">${escape(message.content)}</div></div></div>`}`}`}

${index == array_length - 1 ? `<div style="${"height:12px"}"></div>` : ``}`;
});
const Agreement_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-js4569.svelte-js4569{display:flex;flex-direction:row;justify-content:space-between}textarea.svelte-js4569.svelte-js4569{width:100%;resize:none;border:none}textarea.svelte-js4569.svelte-js4569:focus{outline:none}.peer-image.svelte-js4569.svelte-js4569{width:62px;height:62px}.inbox.svelte-js4569.svelte-js4569{width:320px;border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-10);box-sizing:content-box;display:flex;flex-direction:column}.inbox-item.svelte-js4569.svelte-js4569{width:319px;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;border-width:1px 0px 1px 0px;border-style:solid;border-top-color:var(--color-light-10);border-bottom-color:var(--color-light-10);cursor:pointer}.inbox-item.svelte-js4569.svelte-js4569:hover{background-color:var(--color-light-2)}.chosen-item.svelte-js4569.svelte-js4569{border-width:1px 1px 1px 0px;border-right-color:var(--color-primary);background-color:var(--color-light-2)}.inbox-inner-contents.svelte-js4569.svelte-js4569{width:228px;display:flex;flex-direction:column;align-items:flex-start}.wrapper.svelte-js4569.svelte-js4569{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.create-conversation.svelte-js4569.svelte-js4569{width:100%;height:32px;display:flex;flex-direction:row;justify-content:center;align-items:center;border-width:0px 0px 1px 0px;border-style:solid;border-bottom-color:var(--color-light-10);cursor:pointer}.chat.svelte-js4569.svelte-js4569{width:520px;height:calc(100vh - 128px);border-style:solid;border-width:1px 1px 1px 1px;border-color:var(--color-light-10);display:flex;flex-direction:column;justify-content:flex-end}.chat-window.svelte-js4569.svelte-js4569{display:flex;flex-direction:column}.inbox-window.svelte-js4569.svelte-js4569{display:flex;flex-direction:column}.gray-line.svelte-js4569.svelte-js4569{border-style:solid;border-width:1px 1px 1px 0px;border-color:var(--color-light-10)}.input-field.svelte-js4569.svelte-js4569{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-style:solid;border-width:1px 0px 0px 0px;border-color:var(--color-light-10)}.send-button.svelte-js4569.svelte-js4569{margin-right:12px;margin-top:3px}.inbox-wrapper.svelte-js4569.svelte-js4569{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1;display:flex;flex-direction:column-reverse}.viewport.svelte-js4569.svelte-js4569{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-js4569.svelte-js4569::-webkit-scrollbar{display:none}.spinster.svelte-js4569.svelte-js4569{width:100%;display:flex;flex-direction:column;align-items:center;margin-top:24px}.inbox-viewport.svelte-js4569.svelte-js4569{display:flex;flex-direction:column}.inbox-contents.svelte-js4569.svelte-js4569{display:flex;flex-direction:column-reverse;align-items:flex-start}.tab-bar.svelte-js4569.svelte-js4569{width:100%;height:32px;display:flex;flex-direction:row;justify-content:flex-start;border-style:solid;border-width:0px 0px 1px 0px;border-color:var(--color-light-10);box-sizing:border-box;align-items:center}.tab-bar-item.svelte-js4569.svelte-js4569{height:30px;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;border-style:solid;border-width:0px 1px 0px 0px;border-color:var(--color-light-10);padding:0px 12px}.tab-bar-item.svelte-js4569.svelte-js4569:hover{background-color:var(--color-light-2);cursor:pointer}.tab-bar-item.svelte-js4569:hover p.svelte-js4569{color:var(--color-primary)}.agreements.svelte-js4569.svelte-js4569{width:520px;height:calc(100vh - 128px);border-style:solid;border-width:1px 1px 1px 1px;border-color:var(--color-light-10);display:flex;flex-direction:column}.agreements-container.svelte-js4569.svelte-js4569{height:32px;flex-direction:row;justify-content:flex-start;align-items:center;padding:16px 20px}.new-agreement.svelte-js4569.svelte-js4569{width:fit-content;display:flex;flex-direction:row;justify-content:center;align-items:center;border:1px solid var(--color-light-20);cursor:pointer;padding:6px 8px}.new-agreement.svelte-js4569.svelte-js4569:hover{background-color:var(--color-light-2)}",
  map: null
};
let placeholder_image = "assets/xcopy.gif";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let feedHeight;
  let inboxHeight;
  let $$unsubscribe_nodeProvider;
  let $$unsubscribe_xmtpClient;
  let $$unsubscribe_new_conversation_metadata;
  let $$unsubscribe_userAddress;
  $$unsubscribe_nodeProvider = subscribe(nodeProvider, (value) => value);
  $$unsubscribe_xmtpClient = subscribe(xmtpClient, (value) => value);
  $$unsubscribe_new_conversation_metadata = subscribe(new_conversation_metadata, (value) => value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => value);
  let { viewport } = $$props;
  let { contents } = $$props;
  let { viewport_inbox } = $$props;
  let { contents_inbox } = $$props;
  let conversations = new Array();
  let last_messages = new Array();
  let peers = new Array();
  let loaded = false;
  let user_input;
  let chosen_messages = new Array();
  let new_message = "";
  let rows = 1;
  let chosen_conversation;
  onDestroy(() => {
  });
  const fetchConversations = async () => {
    loaded = true;
  };
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0)
    $$bindings.viewport(viewport);
  if ($$props.contents === void 0 && $$bindings.contents && contents !== void 0)
    $$bindings.contents(contents);
  if ($$props.viewport_inbox === void 0 && $$bindings.viewport_inbox && viewport_inbox !== void 0)
    $$bindings.viewport_inbox(viewport_inbox);
  if ($$props.contents_inbox === void 0 && $$bindings.contents_inbox && contents_inbox !== void 0)
    $$bindings.contents_inbox(contents_inbox);
  $$result.css.add(css);
  {
    if (userConnected && !loaded) {
      fetchConversations();
    }
  }
  feedHeight = window.innerHeight - 165 - 32;
  inboxHeight = window.innerHeight - 128;
  $$unsubscribe_nodeProvider();
  $$unsubscribe_xmtpClient();
  $$unsubscribe_new_conversation_metadata();
  $$unsubscribe_userAddress();
  return `<main class="${"svelte-js4569"}"><div class="${"inbox svelte-js4569"}">${``}
		<div class="${"inbox-window svelte-js4569"}"><div class="${"inbox-wrapper svelte-js4569"}"><div class="${"viewport inbox-viewport svelte-js4569"}"${add_attribute("style", `height:${inboxHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport_inbox, 0)}><div class="${"contents inbox-contents svelte-js4569"}"${add_attribute("this", contents_inbox, 0)}>${conversations && loaded ? `<div style="${"height:8px"}"></div>

							${each(conversations, (convo, index) => {
    return `<div class="${escape(null_to_empty(`inbox-item ${chosen_conversation == convo ? "chosen-item" : ""}`), true) + " svelte-js4569"}"><img class="${"peer-image svelte-js4569"}"${add_attribute(
      "src",
      peers[index]?.show_nft ? peers[index]?.nft_image_url : peers[index]?.image_url && peers[index]?.image_url != "" ? peers[index]?.image_url : placeholder_image,
      0
    )} alt="${"smth"}">

									<div style="${"width: 12px;"}"></div>
									<div class="${"inbox-inner-contents svelte-js4569"}"><p class="${"svelte-js4569"}">${escape(peers[index]?.show_ens ? peers[index]?.ens_name : peers[index]?.username && peers[index]?.username != "" ? peers[index].username : "anon")}</p>
										${last_messages[index] && last_messages[index] != "" ? `<div class="${"body-text light-60"}">${escape(last_messages[index])}</div>` : ``}
									</div></div>
								${index != conversations.length - 1 ? `<div style="${"height: 12px;"}"></div>` : ``}`;
  })}` : `<div class="${"spinster svelte-js4569"}">${validate_component(Jumper, "Jumper").$$render(
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
	${`<div class="${"chat svelte-js4569"}"><div class="${"tab-bar svelte-js4569"}"><div class="${"tab-bar-item svelte-js4569"}"><p class="${"yellow svelte-js4569"}">messages</p></div>
				<div class="${"tab-bar-item svelte-js4569"}"><p class="${"light-60 svelte-js4569"}">agreements</p></div></div>
			<div class="${"chat-window svelte-js4569"}"><div class="${"wrapper svelte-js4569"}"><div class="${"viewport chat-viewport svelte-js4569"}"${add_attribute("style", `height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}>${loaded && chosen_messages.length > 0 ? `${each(chosen_messages, (message, index) => {
    return `${validate_component(Message, "Message").$$render(
      $$result,
      {
        message,
        index,
        array_length: chosen_messages.length
      },
      {},
      {}
    )}`;
  })}` : ``}</div></div>
					${validate_component(Svrollbar, "Svrollbar").$$render($$result, { viewport, contents }, {}, {})}</div></div>
			<div class="${"input-field svelte-js4569"}"><textarea placeholder="${"Write a message..."}" name="${"message"}"${add_attribute("rows", rows, 0)} maxlength="${"1000"}" class="${"svelte-js4569"}"${add_attribute("this", user_input, 0)}></textarea>
				<div class="${"send-button svelte-js4569"}">${new_message.length > 0 ? `<img src="${"icons/loader.svg"}" alt="${"loading"}" class="${"rotating"}">` : `<img src="${"/icons/message.svg"}" alt="${"send"}">`}</div></div></div>`}
</main>`;
});
export {
  Page as default
};
