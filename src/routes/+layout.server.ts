import type { LayoutServerLoad } from './$types';
import { base } from '$app/paths';

export const load = (async ({ cookies, fetch }) => {
  const userAddress = cookies.get('honestwork_address');
  const userSignature = cookies.get('honestwork_signature');
  if (userAddress != undefined && userAddress != null && userSignature != undefined && userSignature != null) {
    const callUrl = `${base}/api/verify/${userAddress}/${userSignature}`;
    let callResponse = await fetch(callUrl);
    if (callResponse.ok) {
      return {
        signed: true
      };
    } else {
      return {
        signed: false
      };
    }
  }
  return {
    signed: false
  };
}) satisfies LayoutServerLoad;
