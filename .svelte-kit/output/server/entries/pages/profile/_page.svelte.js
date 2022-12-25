import { c as create_ssr_component, e as escape, f as each, h as assign, i as now, l as loop, j as identity, b as subscribe, v as validate_component } from "../../../chunks/index.js";
import { w as writable } from "../../../chunks/env-public.js";
import { n as networkSigner, d as userState, a as userAddress, e as nodeProvider, u as userConnected, f as connectNode } from "../../../chunks/Network.js";
import { t as theme } from "../../../chunks/Theme.js";
const Skill_svelte_svelte_type_style_lang = "";
let chosen_skill_slot = writable(-1);
let skill_upload_urls = writable([Array]);
let skill_add = writable(false);
let changes_made = writable(false);
let submitting = writable(false);
const SkillEdit_svelte_svelte_type_style_lang = "";
const Skills_svelte_svelte_type_style_lang = "";
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
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "textarea.svelte-1akgprq{width:100%;resize:none}.bio.svelte-1akgprq{width:100%;height:100%}img.svelte-1akgprq{width:188px;height:188px}.input-fields.svelte-1akgprq{display:flex;flex-direction:column;justify-content:flex-start;flex:1}.input-field.svelte-1akgprq{display:flex;flex-direction:row;justify-content:flex-start;position:relative}.placeholder.svelte-1akgprq{height:32px;display:flex;background-color:var(--color-dark);border-width:1px 0px 1px 1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box;padding:8px}main.svelte-1akgprq{width:100%;height:100%;display:flex;flex-direction:column;align-items:center}.bar.svelte-1akgprq{width:520px;flex-direction:row;justify-content:space-between;align-items:center;padding:0px 12px 0px 0px;background:var(--color-light-2)}.info.svelte-1akgprq{width:520px;display:flex;flex-direction:row}.tabs.svelte-1akgprq{display:flex;flex-direction:row}.tab.svelte-1akgprq{display:flex;flex-direction:row;padding:8px 12px;border-width:0px 1px 0px 0px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.flex-input.svelte-1akgprq{height:32px;flex:1}.error.svelte-1akgprq{border-color:var(--color-error)}.success.svelte-1akgprq:focus{border-color:var(--color-success)}.infobox.svelte-1akgprq{width:240px;padding:8px;position:absolute;margin-left:532px}.gm.svelte-1akgprq{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:12px;display:flex;flex-direction:column;align-items:center;text-align:center}.gm-inner.svelte-1akgprq{display:flex;flex-direction:row;align-items:center}.file-input.svelte-1akgprq{opacity:0;width:188px;height:32px;cursor:pointer}.file-input-container.svelte-1akgprq{position:relative;border-width:0px 1px 1px 1px;border-style:solid;border-color:var(--color-light-20);cursor:pointer}.pseudo-file-input.svelte-1akgprq{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);pointer-events:none}.input-like.svelte-1akgprq{background-color:var(--color-dark);font-family:'Proto Mono', monospace;color:var(--color-light);padding:8px;border-width:1px;border-style:solid;border-color:var(--color-light-20);font-size:13px;line-height:16px;box-sizing:border-box;flex:1;height:32px;display:flex;flex-direction:row;justify-content:flex-start}.limit.svelte-1akgprq{position:absolute;right:12px;transform:translateY(50%)}.description-bar.svelte-1akgprq{display:flex;flex-direction:row;justify-content:space-between;font-size:13px;line-height:16px;align-items:center}.description-title.svelte-1akgprq{padding:8px;border-width:1px 1px 0px 1px}.nft-checkbox.svelte-1akgprq{display:flex;flex-direction:column;align-items:center}.save-changes.svelte-1akgprq{display:flex;flex-direction:row;justify-content:flex-end;align-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_chosen_skill_slot;
  let $$unsubscribe_skill_upload_urls;
  let $$unsubscribe_networkSigner;
  let $$unsubscribe_userState;
  let $userAddress, $$unsubscribe_userAddress;
  let $$unsubscribe_blink;
  let $$unsubscribe_changes_made;
  let $nodeProvider, $$unsubscribe_nodeProvider;
  let $userConnected, $$unsubscribe_userConnected;
  let $$unsubscribe_theme;
  let $$unsubscribe_skill_add;
  let $$unsubscribe_submitting;
  $$unsubscribe_chosen_skill_slot = subscribe(chosen_skill_slot, (value) => value);
  $$unsubscribe_skill_upload_urls = subscribe(skill_upload_urls, (value) => value);
  $$unsubscribe_networkSigner = subscribe(networkSigner, (value) => value);
  $$unsubscribe_userState = subscribe(userState, (value) => value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  $$unsubscribe_changes_made = subscribe(changes_made, (value) => value);
  $$unsubscribe_nodeProvider = subscribe(nodeProvider, (value) => $nodeProvider = value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_theme = subscribe(theme, (value) => value);
  $$unsubscribe_skill_add = subscribe(skill_add, (value) => value);
  $$unsubscribe_submitting = subscribe(submitting, (value) => value);
  let { data } = $$props;
  let link_0 = data.user.links != null ? data.user.links[0] : "";
  let link_1 = data.user.links != null ? data.user.links[1] : "";
  let link_2 = data.user.links != null ? data.user.links[2] : "";
  let image_url = data.user.image_url;
  let username = data.user.username;
  let show_nft = data.user.show_nft;
  let title = data.user.title;
  let email = data.user.email;
  let nft_id = data.user.nft_id;
  let nft_address = data.user.nft_address;
  let bio = data.user.bio;
  let show_ens = data.user.show_ens;
  const setEnsName = async () => {
    await connectNode();
    await $nodeProvider.lookupAddress($userAddress);
  };
  const blink = tweened(1, { duration: 100 });
  $$unsubscribe_blink = subscribe(blink, (value) => value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  {
    if ($userConnected && show_ens) {
      setEnsName();
    }
  }
  {
    if (username != data.user.username || title != data.user.title || email != data.user.email || nft_id != data.user.nft_id || nft_address != data.user.nft_address || link_0 != (data.user.links ? data.user.links[0] : "") || link_1 != (data.user.links ? data.user.links[1] : "") || link_2 != (data.user.links ? data.user.links[2] : "") || bio != data.user.bio || image_url != data.user.image_url || show_nft != data.user.show_nft || show_ens != data.user.show_ens) {
      changes_made.set(true);
    } else {
      changes_made.set(false);
    }
  }
  $$unsubscribe_chosen_skill_slot();
  $$unsubscribe_skill_upload_urls();
  $$unsubscribe_networkSigner();
  $$unsubscribe_userState();
  $$unsubscribe_userAddress();
  $$unsubscribe_blink();
  $$unsubscribe_changes_made();
  $$unsubscribe_nodeProvider();
  $$unsubscribe_userConnected();
  $$unsubscribe_theme();
  $$unsubscribe_skill_add();
  $$unsubscribe_submitting();
  return `${$$result.head += `<!-- HEAD_svelte-nly3j5_START -->${$$result.title = `<title>HW | Profile</title>`, ""}<meta name="${"description"}" content="${"HonestWork Profile Page"}"><!-- HEAD_svelte-nly3j5_END -->`, ""}

<main class="${"svelte-1akgprq"}">${`${`${`<div class="${"spinner"}"><div style="${"height: 36px;"}"></div>
			${validate_component(Jumper, "Jumper").$$render(
    $$result,
    {
      size: "60",
      color: "var(--color-primary)",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}</div>`}`}`}
</main>`;
});
export {
  Page as default
};
