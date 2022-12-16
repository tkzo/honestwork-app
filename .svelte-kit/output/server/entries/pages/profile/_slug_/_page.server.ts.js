import { r as redirect } from "../../../../chunks/index2.js";
const load = ({ cookies, params }) => {
  const userSignature = cookies.get("signature");
  const userSalt = cookies.get("salt");
  if (userSignature && userSalt) {
    validateSignature(params.slug, userSignature, userSalt);
    return redirect(301, `/profile/${params.slug}`);
  }
  return redirect(301, "/");
};
const validateSignature = async (address, userSignature, userSalt) => {
  const url = `http://localhost:3000/users/${address}/${userSalt}/${userSignature}`;
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    console.log(json);
  } else {
    alert("HTTP-Error: " + response.status);
  }
};
export {
  load
};
