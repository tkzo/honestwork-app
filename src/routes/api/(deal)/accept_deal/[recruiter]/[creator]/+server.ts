import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { verifyMember, checkMembership } from '$lib/stores/Crypto';
import { ethers } from 'ethers';
import { escrow_abi } from '$lib/stores/ABI';

// todo: test

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, params, cookies }) => {
  const userAddress = cookies.get('honestwork_address')!;
  const userSignature = cookies.get('honestwork_signature')!;
  if (!userSignature || !userSignature) {
    throw error(401, 'Unauthorized');
  }
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
    const user = await cached_db.collection('users')
      .findOne({ address: userAddress })
    if (!user) {
      throw error(401, 'Unauthorized');
    }
    let verified = verifyMember(user.salt, userAddress, userSignature);
    if (!verified) {
      throw error(401, 'Unauthorized');
    }
    if (!checkMembership(userAddress)) {
      throw error(401, 'Unauthorized');
    }
    const existing = await cached_db.collection('deals').findOne({ recruiter: params.recruiter, creator: params.creator });
    if (!existing) {
      throw error(404, "Relationship not found");
    }
    if (!existing.deals[data.slot]) {
      throw error(404, "Deal not found");
    }
    if (existing.deals[data.slot].status != "offered") {
      throw error(404, "Deal not offered");
    }
    const provider = new ethers.providers.JsonRpcProvider(env.PRIVATE_ARBITRUM_RPC);
    const escrow = new ethers.Contract(env.PUBLIC_ESCROW_ADDRESS!, escrow_abi, provider);
    const message_hash = await escrow.getMessageHash(
      params.recruiter,
      userAddress,
      existing.deals[data.slot].tokenaddress,
      existing.deals[data.slot].totalamount,
      existing.deals[data.slot].downpayment,
      existing.deals[data.slot].jobid
    );
    let hash_array = ethers.utils.arrayify(message_hash);
    let addr = ethers.utils.verifyMessage(hash_array, data.signature);
    if (addr != userAddress) {
      throw error(401, 'Wrong signature');
    }
    let update_doc = {
      $set: {
        [`deals.${data.slot}.status`]: "accepted",
        [`deals.${data.slot}.signature`]: data.signature,
      }
    }
    await cached_db.collection('deals').updateOne({ recruiter: params.recruiter, creator: params.creator }, update_doc);
  } catch (err: any) {
    throw error(500, err.body.message);
  }
  return json("success")
}
