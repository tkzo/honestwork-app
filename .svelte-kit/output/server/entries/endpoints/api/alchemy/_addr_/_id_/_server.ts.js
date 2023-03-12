import { j as json } from "../../../../../../chunks/index.js";
import { Network, Alchemy } from "alchemy-sdk";
import { d as private_env } from "../../../../../../chunks/shared.js";
const GET = async ({ params }) => {
  const settings = {
    apiKey: private_env.PRIVATE_ALCHEMY_APIKEY,
    network: Network.ETH_MAINNET
  };
  const alchemy = new Alchemy(settings);
  const response = await alchemy.nft.getNftMetadata(params.addr, params.id);
  const nft_image = response.media[0].gateway;
  const owners_response = await alchemy.nft.getOwnersForNft(params.addr, params.id);
  const owners = owners_response.owners;
  return json({
    image: nft_image,
    owners
  });
};
export {
  GET
};
