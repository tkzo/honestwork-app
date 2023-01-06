import type { Actions } from './$types';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const apiUrl =
			parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : 'localhost:3000/api/v1/';
		const url = `${apiUrl}users/${formData.user_address}`;
		let response = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const json = await response.json();
			console.log(json);
		}
	}
};
