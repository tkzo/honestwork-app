import { w as writable } from "./env-public.js";
const theme = writable("");
const themeLoaded = writable(false);
export {
  themeLoaded as a,
  theme as t
};
