import { z } from 'zod';
import { ethers } from 'ethers';
import { chains } from '$lib/stores/Constants';

const tokens = chains[0].tokens;

export const JobInput = z.object({
  slot: z.optional(z.number()),
  username: z.string().min(5).max(50),
  useraddress: z.string().refine((val) => ethers.utils.isAddress(val), {
    message: 'Invalid address'
  }),
  email: z.string().email(),
  imageurl: z.string().url(),
  tokenpaid: z.optional(z.string().refine((val) => tokens.find((t) => t.address == val) != undefined)),
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
  tokensaccepted: z
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
  stickyduration: z.number().refine((val: number) => val == 0 || val == 7 || val == 14 || val == 30),
  signature: z.optional(z.string()),
  txhash: z.optional(z.string())
});
export type JobInput = z.infer<typeof JobInput>;

export const ProfileInput = z.object({
  username: z.string().min(5).max(50),
  showens: z.boolean(),
  ensname: z.union([z.string().min(5).max(50), z.literal('')]),
  title: z.string().min(5).max(50),
  imageurl: z.optional(z.string()),
  fileurl: z.optional(z.string()),
  nfturl: z.optional(z.string()),
  shownft: z.boolean(),
  dmsopen: z.boolean(),
  timezone: z.number().min(-14).max(12),
  nftaddress: z.optional(
    z.string().refine((val) => ethers.utils.isAddress(val), {
      message: 'Invalid address'
    })
  ),
  nftid: z.optional(
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
  useraddress: z.string().refine((val) => ethers.utils.isAddress(val), {
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
  minimumprice: z.number().min(10).max(10000),
  imageurls: z.string().array().min(1).max(8),
  publish: z.boolean()
});
export type SkillInput = z.infer<typeof SkillInput>;

export const CoverLetterInput = z.object({
  useraddress: z.string().refine((val) => ethers.utils.isAddress(val), {
    message: 'Invalid address'
  }),
  jobid: z
    .string()
    .refine(
      (val) =>
        ethers.utils.isAddress(val.split(':')[1]) && !Number.isNaN(parseInt(val.split(':')[2], 10)),
      {
        message: 'Invalid job address or id'
      }
    ),
  coverletter: z.union([
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
