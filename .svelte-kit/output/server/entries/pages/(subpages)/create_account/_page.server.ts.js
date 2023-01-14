import { r as redirect } from "../../../../chunks/index2.js";
import { e as env } from "../../../../chunks/env-private.js";
const load = ({ cookies }) => {
  const userAddress = cookies.get("honestwork_address", {});
  const userSignature = cookies.get("honestwork_signature");
  const userSalt = cookies.get("honestwork_salt");
  if (userSignature && userSalt && userAddress) {
    throw redirect(301, `/profile`);
  }
  return {};
};
const actions = {
  default: async ({ cookies, request, fetch }) => {
    const data = await request.formData();
    const address = data.get("address");
    const salt = data.get("salt");
    const signature = data.get("signature");
    if (salt && signature && address) {
      const apiUrl = parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;
      const url = `${apiUrl}/users/${address}/${salt}/${signature}`;
      let response = await fetch(url, {
        method: "POST"
      });
      let text = await response.text();
      if (text != `"User doesn't have NFT."`) {
        cookies.set("honestwork_address", address.toString(), {
          domain: parseInt(env.PRODUCTION_ENV) == 1 ? "honestwork.app" : "localhost",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1e3),
          secure: true,
          httpOnly: true,
          sameSite: true,
          path: "/"
        });
        cookies.set("honestwork_salt", salt.toString(), {
          domain: parseInt(env.PRODUCTION_ENV) == 1 ? "honestwork.app" : "localhost",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1e3),
          secure: true,
          httpOnly: true,
          sameSite: true,
          path: "/"
        });
        cookies.set("honestwork_signature", signature.toString(), {
          domain: parseInt(env.PRODUCTION_ENV) == 1 ? "honestwork.app" : "localhost",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1e3),
          secure: true,
          httpOnly: true,
          sameSite: true,
          path: "/"
        });
      }
    }
  }
};
export {
  actions,
  load
};
