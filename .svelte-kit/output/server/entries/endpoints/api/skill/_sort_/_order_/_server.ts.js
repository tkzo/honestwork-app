import { j as json } from "../../../../../../chunks/index2.js";
import { e as env } from "../../../../../../chunks/env-private.js";
const GET = async ({ params }) => {
  const url = `${env.PRIVATE_HONESTWORK_API}skills/${params.sort}/${params.order}`;
  let response = await fetch(url);
  let data = await response.json();
  return json(data);
};
export {
  GET
};
