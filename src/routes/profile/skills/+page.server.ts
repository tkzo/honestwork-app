import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

const apiUrl =
  parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const load: PageServerLoad = async (event) => {
  const userAddress = event.cookies.get('honestwork_address');
  const userSignature = event.cookies.get('honestwork_signature');

  if (userAddress && userSignature) {
    const callUrl = `${apiUrl}/verify/${userAddress}/${userSignature}`;
    let callResponse = await fetch(callUrl, {
      headers: new Headers({
        Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
        'Content-Type': 'application/json'
      })
    });
    let calldata = await callResponse.json();
    if (calldata == 'success') {
      let skills = await getSkills(userAddress, userSignature);

      return { skills: skills };
    } else {
      throw redirect(301, '/auth');
    }
  }
};

const getSkills = async (address: string, signature: string) => {
  const url = `${apiUrl}/skills_member/${address}/${signature}`;
  let response = await fetch(url, {
    headers: new Headers({
      Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
      'Content-Type': 'application/json'
    })
  });
  if (response.ok) {
    let json = await response.json();
    return { json: json };
  } else {
    console.log('HTTP-Error: ' + response.status);
    return response.status;
  }
};
