import { j as json } from "../../../../../chunks/index2.js";
import { e as env } from "../../../../../chunks/env-private.js";
const GET = async ({ params }) => {
  const url = `${env.PRIVATE_HONESTWORK_API}users/${params.address}`;
  let response = await fetch(url);
  let data = await response.json();
  return json(data);
};
export {
  GET
};
