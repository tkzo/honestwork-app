import type { RequestHandler } from '@sveltejs/kit';
import { ethers } from 'ethers';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { escrow_abi } from '$lib/stores/ABI';
import { MongoClient, Db } from 'mongodb';
import { json, error } from '@sveltejs/kit';

// todo: multichain

let cached_db: Db = "" as any;

export const GET: RequestHandler = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(env_priv.PRIVATE_ARBITRUM_RPC);
    const paymentContract = new ethers.Contract(
      env_pub.PUBLIC_ESCROW_ADDRESS!,
      escrow_abi,
      provider
    );
    const uri =
      parseInt(env_priv.PRODUCTION_ENV) == 1
        ? env_priv.MONGODB_URI
        : env_priv.PRIVATE_MONGODB_URI;
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      cached_db = client.db("honestwork-cluster");
    }
    const deals = await paymentContract.getDeals();
    if (!deals) {
      throw error(500, "No deals found.");
    }
    for await (const id of deals) {
      const deal = await paymentContract.getDeal(id);
      const job = await cached_db.collection('jobs').findOne({ useraddress: deal.Recruiter, slot: deal.JobId });
      if (!job) {
        continue;
      }
      if (job.dealid == -1) {
        await cached_db.collection('jobs').updateOne(
          { useraddress: deal.Recruiter, slot: deal.JobId },
          {
            $set: {
              dealid: id,
              dealnetworkid: 42161
            }
          });
      }
    }
  } catch (err) {
    throw error(500, "Error updating deals.");
  }
  return json({ success: true, message: "Updated deals." });
}
