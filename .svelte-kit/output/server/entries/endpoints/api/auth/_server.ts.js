import { r as redirect } from "../../../../chunks/index2.js";
const GET = ({ url, cookies }) => {
  const userSignature = cookies.get("signature");
  const userSalt = cookies.get("salt");
  const address = url.searchParams.get("address");
  console.log("Signature:", userSignature);
  console.log("Salt:", userSalt);
  console.log("Address", address);
  if (userSignature && userSalt && address) {
    validateSignature(address, userSignature, userSalt);
    throw redirect(301, `/profile/${address}`);
  }
  throw redirect(301, "/create_account");
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
  GET
};
