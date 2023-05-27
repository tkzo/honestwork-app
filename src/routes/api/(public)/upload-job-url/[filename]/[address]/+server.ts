import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { S3 } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { ListObjectsCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { base } from '$app/paths';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const s3Client = new S3({
    forcePathStyle: false,
    endpoint: env.PRIVATE_SPACES_URL,
    region: 'us-east-1',
    credentials: {
      accessKeyId: env.PRIVATE_SPACES_KEY!,
      secretAccessKey: env.PRIVATE_SPACES_SECRET!
    }
  });
  const jobs_response = await fetch(`${base}/api/get_jobs/${params.address}`);
  const jobs = await jobs_response.json();
  try {
    const s3Client2 = new S3({
      forcePathStyle: false,
      endpoint: env.PRIVATE_SPACES_REGION_URL,
      region: 'us-east-1',
      credentials: {
        accessKeyId: env.PRIVATE_SPACES_KEY!,
        secretAccessKey: env.PRIVATE_SPACES_SECRET!
      }
    });
    const data = await s3Client2.send(
      new ListObjectsCommand({
        Bucket: `${env.PRIVATE_SPACES_BUCKETNAME}`
      })
    );
    if (data.Contents) {
      for (let i = 0; i < data.Contents.length; i++) {
        let foldername = data.Contents[i].Key?.split('/');
        if (foldername && foldername[0] == params.address && typeof foldername[1] == undefined) {
          if (
            foldername[1] &&
            foldername[1] == 'job' &&
            foldername[2] &&
            foldername[2] == jobs.length
          )
            try {
              const deleted_file = await s3Client2.send(
                new DeleteObjectCommand({
                  Bucket: `${env.PRIVATE_SPACES_BUCKETNAME}`,
                  Key: data.Contents[i].Key
                })
              );
            } catch (err) {
              console.log('Error', err);
            }
        }
      }
    }
  } catch (err) {
    console.log('Error', err);
  }
  try {
    const url = await createPresignedPost(s3Client, {
      Bucket: env.PRIVATE_SPACES_BUCKETNAME!,
      Key: `${params.address}/job/${jobs.length}/${params.filename}`,
      Conditions: [
        ['content-length-range', 0, 26214400] // up to 25 MB
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': 'image/jpeg'
      },
      Expires: 600
    });
    return json(url);
  } catch (err) {
    console.log('Error', err);
    return json({
      err: err
    });
  }
};
