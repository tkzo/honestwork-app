import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { ethers } from 'ethers';

// todo: test

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, params }) => {
  let data = await request.json();
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      const database = client.db("honestwork-cluster");
      cached_db = database;
    }
    const existing = await cached_db.collection('deals').findOne({ recruiter: params.recruiter, creator: params.creator });
    if (!existing) {
      throw error(404, "Relationship not found");
    }
    if (!existing.deals[data.slot]) {
      throw error(404, "Deal not found");
    }
    if (existing.deals[data.slot].status != "accepted") {
      throw error(404, "Deal not offered");
    }
    let salt = await cached_db.collection('salts').findOne({ address: params.recruiter });
    let message =
      'HonestWork: Execute Agreement\n' +
      `${salt}\n` +
      '\n' +
      'For more info: https://docs.honestwork.app';
    let addr = ethers.utils.verifyMessage(message, data.signature);
    if (addr != params.recruiter) {
      throw error(401, 'Unauthorized');
    }
    let existing_tx = await cached_db.collection('txs').findOne({ key: data.txhash });
    if (existing_tx != null) {
      throw error(400, "Bad Request");
    }
    let update_doc = {
      $set: {
        [`deals.${data.slot}.status`]: "executed",
      }
    }
    await cached_db.collection('deals').updateOne({ recruiter: params.recruiter, creator: params.creator }, update_doc);
    await cached_db.collection('txs').insertOne({
      key: data.txhash,
    });
  } catch (err: any) {
    throw error(500, err)
  }
  return json("success")
}
