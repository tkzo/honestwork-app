import type { RequestHandler } from '../../../$types';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ params }) => {
	const url = `${env.PRIVATE_HONESTWORK_API}skills/${params.sort}/${params.order}`;
	let response = await fetch(url);
	let data = await response.json();
	return json(data);
};
