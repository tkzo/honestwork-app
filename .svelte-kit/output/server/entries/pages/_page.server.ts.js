import { r as redirect } from "../../chunks/index2.js";
const load = async ({ cookies }) => {
  throw redirect(301, "/skills");
};
export {
  load
};
