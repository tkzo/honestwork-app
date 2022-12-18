import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
// import { Mixpanel } from 'mixpanel';
var Mixpanel = require('mixpanel');

export const POST: RequestHandler = async ({ request, cookies }) => {
	console.log(request);
	let mixpanel = Mixpanel.init(env.PRIVATE_MIXPANEL_TOKEN);
	let userAddr = cookies.get('address');
	// mixpanel.track('event name', {
	// 	distinct_id: userAddr,
	// 	ip: '127.0.0.1'
	// });

	return json('');
};
