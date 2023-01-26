import { z } from 'zod';
import { parseContent } from '$lib/stores/Parser';
import { ethers } from 'ethers';
import { chains } from '$lib/stores/Constants';

// todo: multichain support
const tokens = chains[0].tokens;

export const JobInput = z.object({
	username: z.string().min(5).max(50),
	user_address: z.string().refine((val) => ethers.utils.isAddress(val), {
		message: 'Invalid address'
	}),
	token_paid: z.string().refine((val) => tokens.find((t) => t.address == val) == undefined),
	title: z.string().min(5).max(50),
	description: z
		.string()
		.refine((val) => 2000 >= parseContent(val).total_chars && parseContent(val).total_chars >= 200),
	tags: z.string().url().array().min(1).max(3),
	links: z.string().url().array().min(1).max(3),
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
		), // todo: bigInt
	installments: z
		.string()
		.refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: 'Expected number, received a string'
		})
		.refine(
			(val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 2 && parseInt(val, 10) < 5,
			{
				message: 'Wrong amount'
			}
		),
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
					address: z.string().refine((val) => tokens.find((t) => t.address == val) == undefined)
				})
				.array()
		})
		.array(),
	sticky_duration: z.enum(['7', '14', '30', '0'])
});
export type JobInput = z.infer<typeof JobInput>;

export const ProfileInput = z.object({
	username: z.string().min(5).max(50),
	show_ens: z.boolean(),
	ens_name: z.optional(z.string().min(5).max(50)),
	title: z.string().min(5).max(50),
	image_url: z.string().url(),
	show_nft: z.boolean(),
	nft_address: z.optional(
		z.string().refine((val) => ethers.utils.isAddress(val), {
			message: 'Invalid address'
		})
	),
	nft_id: z.optional(
		z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: 'Expected number, received a string'
		})
	),
	email: z.string().email(),
	bio: z
		.string()
		.refine((val) => 2000 >= parseContent(val).total_chars && parseContent(val).total_chars >= 200),
	links: z.string().url().array().min(1).max(3),
	rating: z.never()
});
export type ProfileInput = z.infer<typeof ProfileInput>;

export const SkillInput = z.object({
	user_address: z.string().refine((val) => ethers.utils.isAddress(val), {
		message: 'Invalid address'
	}),
	title: z.string().min(5).max(50),
	description: z
		.string()
		.refine((val) => 2000 >= parseContent(val).total_chars && parseContent(val).total_chars >= 200),
	tags: z.string().url().array().min(1).max(3),
	links: z.string().url().array().min(1).max(3),
	image_urls: z.string().url().array().min(1).max(3),
	minimum_price: z
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
		), // todo: bigInt
	publish: z.boolean(),
	created_at: z.never()
});
export type SkillInput = z.infer<typeof SkillInput>;

export const CoverLetterInput = z.object({
	user_address: z.string().refine((val) => ethers.utils.isAddress(val), {
		message: 'Invalid address'
	}),
	job_id: z
		.string()
		.refine(
			(val) =>
				ethers.utils.isAddress(val.split(':')[0]) && !Number.isNaN(parseInt(val.split(':')[1], 10)),
			{
				message: 'Invalid job address or id'
			}
		),
	cover_letter: z
		.string()
		.refine((val) => 2000 >= parseContent(val).total_chars && parseContent(val).total_chars >= 200),
	date: z.never()
});
export type CoverLetterInput = z.infer<typeof CoverLetterInput>;
