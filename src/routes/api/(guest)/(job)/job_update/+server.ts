import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { JobInput } from '$lib/stores/Validation';
import { ethers } from 'ethers';
import { parseContent } from '$lib/stores/Parser';

let cached_db: Db = "" as any;

export const POST: RequestHandler = async ({ request }) => {
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  let data = await request.json();
  let salt: any;
  if (cached_db == "" as any) {
    const client = new MongoClient(uri!);
    await client.connect();
    cached_db = client.db("honestwork-cluster");
  }
  salt = await cached_db.collection('salts').findOne({ address: data.useraddress });
  let message =
    'HonestWork: Update Job Post\n' +
    `${salt.salt}\n` +
    '\n' +
    'For more info: https://docs.honestwork.app';
  const addr = ethers.utils.verifyMessage(message, data.signature);
  if (addr != data.useraddress) {
    throw error(401, "Unauthorized");
  }
  await cached_db.collection('salts').deleteMany({ address: data.useraddress });
  let data_to_validate = JSON.parse(JSON.stringify(data));
  data_to_validate.description = parseContent(data.description);
  let parsed = JobInput.safeParse(data_to_validate);
  if (!parsed.success) {
    for (const err of parsed.error.errors) {
      console.log(err.message);
    }
    throw error(400, "Bad Request");
  }
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      cached_db = client.db("honestwork-cluster");
    }
    let query = { useraddress: data.useraddress, slot: data.slot };
    let options = { upsert: true };
    let updt = {
      $set: {
        title: data.title,
        slot: data.slot,
        description: data.description,
        tags: data.tags,
        links: data.links,
        imageurl: data.imageurl,
        useraddress: data.useraddress,
        username: data.username,
        email: data.email,
        tokenpaid: data.tokenpaid,
        budget: data.budget,
        stickyduration: data.stickyduration,
        tokensaccepted: data.tokensaccepted,
        txhash: data.txhash,
        timezone: data.timezone,
      },
    };
    await cached_db.collection('jobs').updateOne(query, updt, options);
  } catch (err: any) {
    throw error(400, "Bad Request");
  }
  return json("success");
}
