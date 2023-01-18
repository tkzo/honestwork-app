import { c as create_ssr_component, b as subscribe, f as escape, e as each, o as onDestroy, d as add_attribute, v as validate_component, g as null_to_empty } from "../../../chunks/index.js";
import { d as userAddress, u as userConnected, f as nodeProvider, g as xmtpClient, h as new_conversation_metadata, i as new_conversation_address } from "../../../chunks/Network.js";
import { S as Svrollbar } from "../../../chunks/Svrollbar.js";
/* empty css                                                      */const Message_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".self-message.svelte-67fk4g{display:flex;flex-direction:row;justify-content:flex-end}.peer-message.svelte-67fk4g{display:flex;flex-direction:row;justify-content:flex-start}.message-contents.svelte-67fk4g{background-color:var(--color-light-2);padding:12px 16px;width:100%;display:flex;flex-direction:row;justify-self:flex-end;width:max-content;max-width:352px}.yellow-line.svelte-67fk4g{border-style:solid;border-width:0px 0px 0px 1px;border-color:var(--color-primary)}.gray-line.svelte-67fk4g{border-style:solid;border-width:1px 1px 1px 0px;border-color:var(--color-light-10)}",
  map: null
};
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userAddress, $$unsubscribe_userAddress;
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  let { message } = $$props;
  let { index } = $$props;
  let { array_length } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.array_length === void 0 && $$bindings.array_length && array_length !== void 0)
    $$bindings.array_length(array_length);
  $$result.css.add(css$2);
  $$unsubscribe_userAddress();
  return `



<div style="${"height:12px"}"></div>
${message.senderAddress == $userAddress ? `<div class="${"self-message svelte-67fk4g"}"><div class="${"date"}"></div>
		<div class="${"message-contents yellow-line svelte-67fk4g"}"><div class="${"body-text light-80"}">${escape(message.content)}</div></div></div>` : `<div class="${"peer-message svelte-67fk4g"}"><div class="${"date"}"></div>
		<div class="${"message-contents gray-line svelte-67fk4g"}"><div class="${"body-text light-80"}">${escape(message.content)}</div></div></div>`}
${index == array_length - 1 ? `<div style="${"height:12px"}"></div>` : ``}`;
});
const Circle_svelte_svelte_type_style_lang = "";
const Circle2_svelte_svelte_type_style_lang = "";
const Circle3_svelte_svelte_type_style_lang = "";
const durationUnitRegex = /[a-zA-Z]/;
const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const DoubleBounce_svelte_svelte_type_style_lang = "";
const GoogleSpin_svelte_svelte_type_style_lang = "";
const ScaleOut_svelte_svelte_type_style_lang = "";
const SpinLine_svelte_svelte_type_style_lang = "";
const Stretch_svelte_svelte_type_style_lang = "";
const BarLoader_svelte_svelte_type_style_lang = "";
const Jumper_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".wrapper.svelte-c0n7a9{width:var(--size);height:var(--size)}.circle.svelte-c0n7a9{border-radius:100%;animation-fill-mode:both;position:absolute;opacity:0;width:var(--size);height:var(--size);background-color:var(--color);animation:svelte-c0n7a9-bounce var(--duration) linear infinite}.pause-animation.svelte-c0n7a9{animation-play-state:paused}@keyframes svelte-c0n7a9-bounce{0%{opacity:0;transform:scale(0)}5%{opacity:1}100%{opacity:0;transform:scale(1)}}",
  map: null
};
const Jumper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "1s" } = $$props;
  let { size = "60" } = $$props;
  let { pause = false } = $$props;
  let durationUnit = duration.match(durationUnitRegex)?.[0] ?? "s";
  let durationNum = duration.replace(durationUnitRegex, "");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  $$result.css.add(css$1);
  return `<div class="${"wrapper svelte-c0n7a9"}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true) + ";"}">${each(range(3, 1), (version) => {
    return `<div class="${["circle svelte-c0n7a9", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"animation-delay: " + escape(+durationNum / 3 * (version - 1) + durationUnit, true) + ";"}"></div>`;
  })}
</div>`;
});
const RingLoader_svelte_svelte_type_style_lang = "";
const SyncLoader_svelte_svelte_type_style_lang = "";
const Rainbow_svelte_svelte_type_style_lang = "";
const Firework_svelte_svelte_type_style_lang = "";
const Pulse_svelte_svelte_type_style_lang = "";
const Jellyfish_svelte_svelte_type_style_lang = "";
const Chasing_svelte_svelte_type_style_lang = "";
const Square_svelte_svelte_type_style_lang = "";
const Shadow_svelte_svelte_type_style_lang = "";
const Moon_svelte_svelte_type_style_lang = "";
const Plane_svelte_svelte_type_style_lang = "";
const Diamonds_svelte_svelte_type_style_lang = "";
const Clock_svelte_svelte_type_style_lang = "";
const Wave_svelte_svelte_type_style_lang = "";
const Puff_svelte_svelte_type_style_lang = "";
const ArrowDown_svelte_svelte_type_style_lang = "";
const ArrowUp_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1nforkr{display:flex;flex-direction:row;justify-content:space-between}textarea.svelte-1nforkr{width:100%;resize:none;border:none}textarea.svelte-1nforkr:focus{outline:none}.peer-image.svelte-1nforkr{width:62px;height:62px}.inbox.svelte-1nforkr{width:320px;border-width:1px 1px 1px 1px;border-style:solid;border-color:var(--color-light-10);box-sizing:content-box;display:flex;flex-direction:column}.inbox-item.svelte-1nforkr{width:319px;display:flex;flex-direction:row;justify-content:flex-start;align-items:center;border-width:1px 0px 1px 0px;border-style:solid;border-top-color:var(--color-light-10);border-bottom-color:var(--color-light-10);cursor:pointer}.inbox-item.svelte-1nforkr:hover{background-color:var(--color-light-2)}.chosen-item.svelte-1nforkr{border-width:1px 1px 1px 0px;border-right-color:var(--color-primary);background-color:var(--color-light-2)}.inbox-inner-contents.svelte-1nforkr{width:228px;display:flex;flex-direction:column;align-items:flex-start}.wrapper.svelte-1nforkr{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1}.viewport.svelte-1nforkr{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.viewport.svelte-1nforkr::-webkit-scrollbar{display:none}.create-conversation.svelte-1nforkr{width:100%;height:32px;display:flex;flex-direction:row;justify-content:center;align-items:center;border-width:0px 0px 1px 0px;border-style:solid;border-bottom-color:var(--color-light-10);cursor:pointer}.chat.svelte-1nforkr{width:520px;height:calc(100vh - 128px);border-style:solid;border-width:1px 1px 1px 1px;border-color:var(--color-light-10);display:flex;flex-direction:column;justify-content:flex-end}.chat-window.svelte-1nforkr{display:flex;flex-direction:column}.inbox-window.svelte-1nforkr{display:flex;flex-direction:column}.gray-line.svelte-1nforkr{border-style:solid;border-width:1px 1px 1px 0px;border-color:var(--color-light-10)}.input-field.svelte-1nforkr{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-style:solid;border-width:1px 0px 0px 0px;border-color:var(--color-light-10)}.send-button.svelte-1nforkr{margin-right:12px;margin-top:3px}.wrapper.svelte-1nforkr{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1;display:flex;flex-direction:column}.inbox-wrapper.svelte-1nforkr{position:relative;-ms-overflow-style:none;scrollbar-width:none;overflow-y:scroll;--svrollbar-track-width:1px;--svrollbar-track-opacity:1;--svrollbar-thumb-width:10px;--svrollbar-thumb-background:#d9ab55;--svrollbar-thumb-opacity:1;display:flex;flex-direction:column-reverse}.viewport.svelte-1nforkr{position:relative;overflow:scroll;box-sizing:border-box;-ms-overflow-style:none;scrollbar-width:none}.chat-viewport.svelte-1nforkr{display:flex;flex-direction:column;justify-content:flex-end}.viewport.svelte-1nforkr::-webkit-scrollbar{display:none}.spinster.svelte-1nforkr{width:100%;display:flex;flex-direction:column;align-items:center;margin-top:24px}.inbox-viewport.svelte-1nforkr{display:flex;flex-direction:column}.inbox-contents.svelte-1nforkr{display:flex;flex-direction:column-reverse;align-items:flex-start}",
  map: null
};
let placeholder_image = "assets/xcopy.gif";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let feedHeight;
  let inboxHeight;
  let $$unsubscribe_nodeProvider;
  let $$unsubscribe_xmtpClient;
  let $$unsubscribe_new_conversation_metadata;
  let $$unsubscribe_new_conversation_address;
  $$unsubscribe_nodeProvider = subscribe(nodeProvider, (value) => value);
  $$unsubscribe_xmtpClient = subscribe(xmtpClient, (value) => value);
  $$unsubscribe_new_conversation_metadata = subscribe(new_conversation_metadata, (value) => value);
  $$unsubscribe_new_conversation_address = subscribe(new_conversation_address, (value) => value);
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
  feedHeight = window.innerHeight - 165;
  inboxHeight = window.innerHeight - 128;
  $$unsubscribe_nodeProvider();
  $$unsubscribe_xmtpClient();
  $$unsubscribe_new_conversation_metadata();
  $$unsubscribe_new_conversation_address();
  return `<main class="${"svelte-1nforkr"}"><div class="${"inbox svelte-1nforkr"}">${``}
		<div class="${"inbox-window svelte-1nforkr"}"><div class="${"inbox-wrapper svelte-1nforkr"}"><div class="${"viewport inbox-viewport svelte-1nforkr"}"${add_attribute("style", `height:${inboxHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport_inbox, 0)}><div class="${"contents inbox-contents svelte-1nforkr"}"${add_attribute("this", contents_inbox, 0)}>${conversations && loaded ? `<div style="${"height:8px"}"></div>

							${each(conversations, (convo, index) => {
    return `<div class="${escape(null_to_empty(`inbox-item ${chosen_conversation == convo ? "chosen-item" : ""}`), true) + " svelte-1nforkr"}"><img class="${"peer-image svelte-1nforkr"}"${add_attribute(
      "src",
      peers[index]?.show_nft ? peers[index]?.nft_image_url : peers[index]?.image_url && peers[index]?.image_url != "" ? peers[index]?.image_url : placeholder_image,
      0
    )} alt="${"smth"}">

									<div style="${"width: 12px;"}"></div>
									<div class="${"inbox-inner-contents svelte-1nforkr"}"><p>${escape(peers[index]?.show_ens ? peers[index]?.ens_name : peers[index]?.username && peers[index]?.username != "" ? peers[index].username : "anon")}</p>
										${last_messages[index] && last_messages[index] != "" ? `<div class="${"body-text light-60"}">${escape(last_messages[index])}</div>` : ``}
									</div></div>
								${index != conversations.length - 1 ? `<div style="${"height: 12px;"}"></div>` : ``}`;
  })}` : `<div class="${"spinster svelte-1nforkr"}">${validate_component(Jumper, "Jumper").$$render(
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
	<div class="${"chat svelte-1nforkr"}"><div class="${"chat-window svelte-1nforkr"}"><div class="${"wrapper svelte-1nforkr"}"><div class="${"viewport chat-viewport svelte-1nforkr"}"${add_attribute("style", `height:${feedHeight.toString() + "px"}`, 0)}${add_attribute("this", viewport, 0)}><div class="${"contents"}"${add_attribute("this", contents, 0)}>${loaded && chosen_messages.length > 0 ? `${each(chosen_messages, (message, index) => {
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
		<div class="${"input-field svelte-1nforkr"}"><textarea placeholder="${"Write a message..."}" name="${"message"}"${add_attribute("rows", rows, 0)} maxlength="${"1000"}" class="${"svelte-1nforkr"}"${add_attribute("this", user_input, 0)}></textarea>
			<div class="${"send-button svelte-1nforkr"}">${new_message.length > 0 ? `<img src="${"icons/loader.svg"}" alt="${"loading"}" class="${"rotating"}">` : `<img src="${"/icons/message.svg"}" alt="${"send"}">`}</div></div></div>
</main>`;
});
export {
  Page as default
};
