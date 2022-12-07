import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { Network, Alchemy } from 'alchemy-sdk';

export const GET: RequestHandler = async ({ params }) => {
	const settings = {
		apiKey: '6S77iu4XWkdCm3lztMIZql9JOLMW_adQ',
		network: Network.ETH_MAINNET
	};
	const alchemy = new Alchemy(settings);
	const response = await alchemy.nft.getNftMetadata(params.addr, params.id);
	const nft_image = response.media[0].gateway;
	const owners_response = await alchemy.nft.getOwnersForNft(params.addr, params.id);
	const owners = owners_response.owners;
	return json({
		image: nft_image,
		owners: owners
	});
};
