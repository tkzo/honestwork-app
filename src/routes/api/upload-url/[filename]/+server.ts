import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { S3 } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const userAddress = cookies.get('address');
	const s3Client = new S3({
		forcePathStyle: false,
		endpoint: env.PRIVATE_SPACES_URL,
		region: 'us-east-1',
		credentials: {
			accessKeyId: env.PRIVATE_SPACES_KEY!,
			secretAccessKey: env.PRIVATE_SPACES_SECRET!
		}
	});
	//todo: delete previous user image if exists
	try {
		const url = await createPresignedPost(s3Client, {
			Bucket: env.PRIVATE_SPACES_BUCKETNAME!,
			Key: `${userAddress}/${params.filename}`,
			Conditions: [
				['content-length-range', 0, 1048576] // up to 1 MB
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
