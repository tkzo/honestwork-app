import { e as env } from "../../../../chunks/env-private.js";
const GET = async ({ url, cookies }) => {
  const fetch_url = `${env.PRIVATE_HONESTWORK_API}skills`;
  let response = await fetch(fetch_url);
  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    console.log("HTTP-Error: " + response.status);
    return response;
  }
};
export {
  GET
};
