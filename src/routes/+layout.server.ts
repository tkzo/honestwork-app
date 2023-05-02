import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { base } from '$app/paths';
import type { APIConfig } from '$lib/stores/Types';
import { redirect } from '@sveltejs/kit';

const apiUrl =
  parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const load = (async ({ cookies, fetch }) => {
  // todo: implement config
  const config_url = `${base}/api/config`;
  let config_response = await fetch(config_url, {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
      'Content-Type': 'application/json'
    })
  });
  let config_data: APIConfig = await config_response.json();

  const userAddress = cookies.get('honestwork_address');
  const userSignature = cookies.get('honestwork_signature');

  if (userAddress != undefined && userAddress != null && userSignature != undefined && userSignature != null) {
    const callUrl = `${apiUrl}/verify/${userAddress}/${userSignature}`;
    let callResponse = await fetch(callUrl, {
      headers: new Headers({
        Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
        'Content-Type': 'application/json'
      })
    });
    if (callResponse.status == 200) {
      let calldata = await callResponse.json();
      if (calldata == 'success') {
        return {
          signed: true
        };
      } else {
        return {
          signed: false
        };
      }
    }
  }
}) satisfies LayoutServerLoad;
