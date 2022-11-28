import { writable } from 'svelte/store';
import { ethers } from 'ethers';

export let userConnected = writable(false);
export let userAddress = writable('');
export let networkProvider = writable('');
export let networkSigner = writable('');
export let chainID = writable('');

export const connectWallet = async () => {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		networkProvider.set(provider);
		networkSigner.set(signer);
		userAddress.set(await signer.getAddress());
		chainID.set(await signer.getChainId());
		userConnected.set(true);
	} catch (err) {
		console.log('error:', err);
	}
};
