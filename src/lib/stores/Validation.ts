import { z } from 'zod';
import { parseContent } from '$lib/stores/Parser';
import { ethers } from 'ethers';
import { chains } from '$lib/stores/Constants';

// todo: initialize with dynamic config values from api
const tokens = chains[0].tokens;

export const JobInput = z.object({
	username: z.string().min(5).max(50),
	user_address: z.string().refine((val) => ethers.utils.isAddress(val), {
		message: 'Invalid address'
	}),
	token_paid: z.string().refine((val) => tokens.find((t) => t.address == val) != undefined),
	title: z.string().min(5).max(50),
	description: z.string().min(200).max(2000),
	tags: z.string().array().min(1).max(3),
	links: z.string().url().array().min(1).max(3),
	budget: z
		.string()
		.refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: 'Expected number, received a string'
		})
		.refine(
			(val) =>
				!Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 200 && parseInt(val, 10) < 1000000,
			{
				message: 'Wrong amount'
			}
		), // todo: bigInt
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
					address: z.string().refine((val) => tokens.find((t) => t.address == val) != undefined)
				})
				.array()
				.min(1)
		})
		.array()
		.min(1),
	sticky_duration: z.number().refine((val) => val == 0 || val == 7 || val == 14 || val == 30)
});
export type JobInput = z.infer<typeof JobInput>;

export const ProfileInput = z.object({
	username: z.string().min(5).max(50),
	show_ens: z.boolean(),
	ens_name: z.optional(z.string().min(5).max(50)),
	title: z.string().min(5).max(50),
	image_url: z.string().url(),
	show_nft: z.boolean(),
	dms_open: z.boolean(),
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
	bio: z.string().min(200).max(2000),
	links: z.string().url().array().min(1).max(3)
});
export type ProfileInput = z.infer<typeof ProfileInput>;

export const SkillInput = z.object({
	user_address: z.string().refine((val) => ethers.utils.isAddress(val), {
		message: 'Invalid address'
	}),
	title: z.string().min(5).max(50),
	description: z.string().min(200).max(2000),
	tags: z.string().min(2).max(20).array().min(1).max(3),
	links: z.string().url().optional().array().min(1).max(3),
	minimum_price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
			message: 'Expected number, received a string'
		}),
	publish: z.boolean()
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
				ethers.utils.isAddress(val.split(':')[1]) && !Number.isNaN(parseInt(val.split(':')[2], 10)),
			{
				message: 'Invalid job address or id'
			}
		),
	cover_letter: z.union([z.string().min(200, {
    message: "Cover letter must be empty or at least 200 chars"
  }).max(2000), z.literal('')])
});
export type CoverLetterInput = z.infer<typeof CoverLetterInput>;
