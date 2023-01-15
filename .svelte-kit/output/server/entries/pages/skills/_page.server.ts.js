import { e as env } from "../../../chunks/env-private.js";
const load = async ({}) => {
  const apiUrl = parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;
  const url = `${apiUrl}/skills/created_at/false`;
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    return { json };
  } else {
    console.log("HTTP-Error: " + response.status);
    return response.status;
  }
};
export {
  load
};
