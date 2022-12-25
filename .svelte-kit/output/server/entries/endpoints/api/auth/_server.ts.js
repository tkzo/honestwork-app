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
  const url = `${env.PRIVATE_HONESTWORK_API}users/${address}`;
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
