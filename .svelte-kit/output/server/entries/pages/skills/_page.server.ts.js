import { e as env } from "../../../chunks/env-private.js";
const load = async ({}) => {
  const url = `${env.PRIVATE_HONESTWORK_API}skills/created_at/false`;
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
