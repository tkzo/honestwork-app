import type { RequestHandler } from '@sveltejs/kit';
import { ethers } from 'ethers';
import { env as env_priv } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { escrow_abi } from '$lib/stores/ABI';
import { MongoClient, Db } from 'mongodb';
import { json, error } from '@sveltejs/kit';

// todo: multichain
// todo: delete this comment

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
    const listers = await cached_db.collection('jobs').find({}, { projection: { useraddress: 1 } }).toArray();
    const members = await cached_db.collection('users').find({}, { projection: { address: 1 } }).toArray();
    let addresses: string[] = [];
    for (const member of members) {
      addresses.push(member.address);
    }
    for (const lister of listers) {
      addresses.push(lister.useraddress);
    }
    for (const addr of addresses) {
      let rating = await paymentContract.getAggregatingRating(addr);
      let precision = await paymentContract.getPrecision();
      precision = parseInt(precision.toString());
      rating = parseInt(rating.toString());
      rating = rating / precision;
      await cached_db.collection('users').updateOne({ address: addr }, { $set: { rating: rating } })
    }
  } catch (err: any) {
    throw error(500, err)
  }
  return json({ success: true, message: "Updated deals." });
}
