import { z } from 'zod';

export const JobInput = z.object({
	user_address: z.string().min(5).max(50),
	token_paid: z.string(),
	title: z.string().min(5).max(50),
	description: z.string().min(100).max(1000),
	tags: z.string().array().min(1).max(3),
	links: z.string().array().min(1).max(3),

	//todo: how to check max allowed amounts for each network/token combo?
	// $1000-$1,000,000 set for now as a soft check on frontend

	budget: z
		.string()
		.refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: 'Expected number, received a string'
		})
		.refine(
			(val) =>
				!Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 1000 && parseInt(val, 10) < 1000000,
			{
				message: 'Wrong amount'
			}
		),
	installments: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
		message: 'Expected number, received a string'
	}),
	timezone: z.enum([
		'UTC+0',
		'UTC+1',
		'UTC+2',
		'UTC+3',
		'UTC+4',
		'UTC+5',
		'UTC+6',
		'UTC+7',
		'UTC+8',
		'UTC+9',
		'UTC+10',
		'UTC+11',
		'UTC+12',
		'UTC-1',
		'UTC-2',
		'UTC-3',
		'UTC-4',
		'UTC-5',
		'UTC-6',
		'UTC-7',
		'UTC-8',
		'UTC-9',
		'UTC-10',
		'UTC-11',
		'UTC-12'
	]),
	tokens_accepted: z
		.object({
			id: z.number(),
			tokens: z
				.object({
					address: z.string()
				})
				.array()
		})
		.array(),
	sticky_duration: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
		message: 'Expected number, received a string'
	})
});
export type JobInput = z.infer<typeof JobInput>;
