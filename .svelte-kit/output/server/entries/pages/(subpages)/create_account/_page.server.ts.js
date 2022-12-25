import { r as redirect } from "../../../../chunks/index2.js";
import { e as env } from "../../../../chunks/env-private.js";
const load = ({ cookies }) => {
  const userAddress = cookies.get("address");
  const userSignature = cookies.get("signature");
  const userSalt = cookies.get("salt");
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
      const url = `${env.PRIVATE_HONESTWORK_API}users/${address}/${salt}/${signature}`;
      let response = await fetch(url, {
        method: "POST"
      });
      let text = await response.text();
      if (text != `"User doesn't have NFT."`) {
        cookies.set("address", address.toString(), {
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1e3)
        });
        cookies.set("salt", salt.toString(), {
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1e3)
        });
        cookies.set("signature", signature.toString(), {
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1e3)
        });
      }
    }
  }
};
export {
  actions,
  load
};
