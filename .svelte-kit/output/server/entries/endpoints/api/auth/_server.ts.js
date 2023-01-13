import { r as redirect } from "../../../../chunks/index2.js";
import { e as env } from "../../../../chunks/env-private.js";
const GET = ({ url, cookies }) => {
  const userSignature = cookies.get("signature");
  const userSalt = cookies.get("salt");
  const address = url.searchParams.get("address");
  if (userSignature && userSalt && address) {
    validateSignature(address);
    throw redirect(301, `/profile`);
  }
  throw redirect(301, "/create_account");
};
const validateSignature = async (address, userSignature, userSalt) => {
  const apiUrl = parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;
  const url = `${apiUrl}/users/${address}`;
  let response = await fetch(url);
  if (response.ok) {
    await response.json();
  } else {
    console.log("HTTP-Error: " + response.status);
    throw "";
  }
};
export {
  GET
};
