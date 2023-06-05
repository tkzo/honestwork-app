import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { json, error } from '@sveltejs/kit';
import { verifyMember, checkMembership, getApplicationLimit } from '$lib/stores/Crypto';
import { MongoClient, Db } from 'mongodb';
let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, cookies, params }) => {
  let user: any;
  let job: any;
  let data = await request.json();
  const userAddress = cookies.get('honestwork_address')!;
  const userSignature = cookies.get('honestwork_signature');
  if (!userSignature || !userSignature) {
    throw error(401, 'Unauthorized');
  }
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
    user = await cached_db.collection('users')
      .findOne({ address: params.address })
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
    job = await cached_db.collection('jobs').findOne({ useraddress: params.address as string, slot: parseInt(params.slot as string) })
    if (!job) {
      throw error(401, 'Unauthorized');
    }
    if (job.dealid != -1) {
      throw error(400, 'Bad Request');
    }
    if (job.applications && job.applications.length > 0) {
      for (let i = 0; i < job.applications.length; i++) {
        if (job.applications[i].useraddress == userAddress) {
          throw error(400, 'Bad Request');
        }
      }
    }
    let recent_applications = await cached_db.collection('jobs').find({
      useraddress: userAddress,
      applications: {
        $elemMatch: {
          createdat: {
            $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      }
    }).toArray();
    let limit = await getApplicationLimit(userAddress);
    if (recent_applications.length >= limit) {
      throw error(400, 'Bad Request');
    }
    const filter = { useraddress: params.address };
    const updateDoc = {
      $push: {
        applications: {
          useraddress: userAddress,
          jobid: data.job_id,
          coverletter: data.cover_letter,
          date: Date.now(),
        },
      }
    };
    await cached_db.collection('jobs').updateOne(filter, updateDoc);
  } catch (err: any) {
    throw error(500, err.body.message);
  }
  return json("success");
}
