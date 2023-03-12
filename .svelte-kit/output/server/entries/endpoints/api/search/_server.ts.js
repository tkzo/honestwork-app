import { d as private_env } from "../../../../chunks/shared.js";
const GET = async ({ url, cookies }) => {
  const apiUrl = parseInt(private_env.PRODUCTION_ENV) == 1 ? private_env.PRIVATE_HONESTWORK_API : private_env.PRIVATE_LOCAL_HONESTWORK_API;
  const fetch_url = `${apiUrl}/skills`;
  let response = await fetch(fetch_url, {
    headers: new Headers({
      Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
      "Content-Type": "application/json"
    })
  });
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
