import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { S3 } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { ListObjectsCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const userAddress = cookies.get('honestwork_address');
	const s3Client = new S3({
		forcePathStyle: false,
		endpoint: env.PRIVATE_SPACES_URL,
		region: 'us-east-1',
		credentials: {
			accessKeyId: env.PRIVATE_SPACES_KEY!,
			secretAccessKey: env.PRIVATE_SPACES_SECRET!
		}
	});
	try {
		//todo: investigate dns issue
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
				if (foldername && foldername[0] == userAddress && foldername[1] == 'profile') {
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
			Key: `${userAddress}/profile/${params.filename}`,
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
