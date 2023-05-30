import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';

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
    let update_doc = {
      $push: {
        deals: {
          status: "offered",
          signature: "",
          network: data.network,
          tokenaddress: data.tokenaddress,
          totalamount: data.totalamount,
          downpayment: data.downpayment,
          jobid: data.jobid,
          createdat: new Date(),
        }
      }
    }
    let result = await cached_db.collection('deals').updateOne({ recruiter: params.recruiter, creator: params.creator }, update_doc);
    console.log("Result: ", result)
  } catch (err: any) {
    throw error(500, err)
  }
  return json("success")
}
