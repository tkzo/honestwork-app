import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const salt = data.get('salt');
		const signature = data.get('signature');
		if (salt && signature) {
			cookies.set('salt', salt.toString());
			cookies.set('signature', signature.toString());
		}
	}
};
