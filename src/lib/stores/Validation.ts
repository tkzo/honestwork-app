import { z } from 'zod';

export const JobInput = z.object({
	user_address: z.string().min(5).max(50),
	token_paid: z.string(),
	title: z.string(),
	description: z.string(),
	tags: z.string().array(),
	links: z.string().array(),
	budget: z.number(),
	installments: z.number(),
	timezone: z.enum(['EST', 'CST', 'MST', 'PST']),
	tokens: z
		.object({
			network_name: z.string(),
			network_id: z.number(),
			tokens: z
				.object({
					name: z.string(),
					symbol: z.string(),
					address: z.string(),
					max_allowed: z.number()
				})
				.array()
		})
		.array(),
	sticky_duration: z.number(),
	highlight: z.number()
});
export type JobInput = z.infer<typeof JobInput>;
