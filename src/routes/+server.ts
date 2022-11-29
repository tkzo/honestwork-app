import type { RequestHandler } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	throw redirect(307, `/connect_wallet`);
};
