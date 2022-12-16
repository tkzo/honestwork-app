// @ts-nocheck
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const email = data.get('email');
		const name = data.get('name');
	}
};
;null as any as Actions;