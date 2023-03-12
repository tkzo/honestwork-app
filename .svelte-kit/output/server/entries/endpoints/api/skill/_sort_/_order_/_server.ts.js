import { j as json } from "../../../../../../chunks/index.js";
import { d as private_env } from "../../../../../../chunks/shared.js";
const GET = async ({ params }) => {
  const apiUrl = parseInt(private_env.PRODUCTION_ENV) == 1 ? private_env.PRIVATE_HONESTWORK_API : private_env.PRIVATE_LOCAL_HONESTWORK_API;
  const url = `${apiUrl}/skills/${params.sort}/${params.order}`;
  let response = await fetch(url, {
    headers: new Headers({
      Authorization: "Basic " + btoa(`${private_env.PRIVATE_CLIENT_KEY}:${private_env.PRIVATE_CLIENT_PASSWORD}`),
      "Content-Type": "application/json"
    })
  });
  let data = await response.json();
  return json(data);
};
export {
  GET
};
