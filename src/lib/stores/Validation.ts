import { z } from 'zod';
import { ethers } from 'ethers';
import { chains } from '$lib/stores/Constants';

// todo: initialize with dynamic config values from api
const tokens = chains[0].tokens;

export const JobInput = z.object({
  job_slot: z.optional(z.number()),
  username: z.string().min(5).max(50),
  user_address: z.string().refine((val) => ethers.utils.isAddress(val), {
    message: 'Invalid address'
  }),
  email: z.string().email(),
  image_url: z.string().url(),
  token_paid: z.optional(z.string().refine((val) => tokens.find((t) => t.address == val) != undefined)),
  title: z.string().min(5).max(50),
  description: z.string().min(200).max(2000),
  tags: z.string().min(2).max(20).array().min(1).max(3),
  links: z
    .union([z.string().url(), z.literal('')])
    .array()
    .min(1)
    .max(3),
  budget: z.number().min(200).max(100000),
  timezone: z.number().min(-14).max(14),
  tokens_accepted: z
    .object({
      id: z.number(),
      tokens: z
        .object({
          address: z.string().refine((val) => tokens.find((t) => t.address == val != undefined), {
            message: "Not a token"
          })
        })
        .array()
        .min(1)
    })
    .array()
    .min(1),
  sticky_duration: z.number().refine((val: number) => val == 0 || val == 7 || val == 14 || val == 30),
  signature: z.optional(z.string()),
  tx_hash: z.optional(z.string())
});
export type JobInput = z.infer<typeof JobInput>;

export const ProfileInput = z.object({
  username: z.string().min(5).max(50),
  show_ens: z.boolean(),
  ens_name: z.union([z.string().min(5).max(50), z.literal('')]),
  title: z.string().min(5).max(50),
  image_url: z.optional(z.string()),
  file_url: z.optional(z.string()),
  nft_url: z.optional(z.string()),
  show_nft: z.boolean(),
  dms_open: z.boolean(),
  timezone: z.number().min(-14).max(12),
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
  links: z
    .union([z.string().url(), z.literal('')])
    .array()
    .min(1)
    .max(3)
});
export type ProfileInput = z.infer<typeof ProfileInput>;

export const SkillInput = z.object({
  user_address: z.string().refine((val) => ethers.utils.isAddress(val), {
    message: 'Invalid address'
  }),
  title: z.string().min(5).max(50),
  description: z.string().min(200).max(2000),
  tags: z.string().min(2).max(20).array().min(1).max(3),
  links: z
    .union([z.string().url(), z.literal('')])
    .array()
    .min(1)
    .max(3),
  minimum_price: z.number().min(10).max(10000),
  image_urls: z.string().array().min(1).max(8),
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
  cover_letter: z.union([
    z
      .string()
      .min(200, {
        message: 'Cover letter must be empty or at least 200 chars'
      })
      .max(2000),
    z.literal('')
  ])
});
export type CoverLetterInput = z.infer<typeof CoverLetterInput>;
