import { j as json } from "../../../../../../chunks/index2.js";
import { e as env } from "../../../../../../chunks/env-private.js";
const GET = async ({ params }) => {
  const apiUrl = parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;
  const url = `${apiUrl}skills/${params.sort}/${params.order}`;
  let response = await fetch(url);
  let data = await response.json();
  return json(data);
};
export {
  GET
};
