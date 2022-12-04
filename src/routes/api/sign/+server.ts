import type { RequestHandler } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	// do checks
	console.log('Params.name:', url.searchParams.get('name'));
	console.log('Params.address:', url.searchParams.get('address'));
	console.log('Params.email:', url.searchParams.get('email'));
	console.log('Params.hash:', url.searchParams.get('hash'));

	try {
		const post_url = `http://localhost:3002/users/new/`;
		let response = await fetch(post_url, {
			method: 'POST',
			body: JSON.stringify({
				address: url.searchParams.get('address'),
				hash: url.searchParams.get('hash'),
				name: url.searchParams.get('name'),
				email: url.searchParams.get('email')
			})
		});
		if (response.ok) {
			let json = await response.json();
			console.log(json);
		} else {
			alert('HTTP-Error: ' + response.status);
		}
	} catch (err) {
		console.log(err);
	}

	throw redirect(307, `/jobs`);
};
