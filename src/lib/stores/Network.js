import { writable } from 'svelte/store';
import { ethers } from 'ethers';
import { env } from '$env/dynamic/public';
import { Client } from '@xmtp/xmtp-js';
import { get } from 'svelte/store';
import { nft_abi } from '$lib/stores/Constants';

//todo: typescript

export let userConnected = writable(false);
export let userAddress = writable('');
export let networkProvider = writable();
export let networkSigner = writable();
export let chainID = writable('');
export let userState = writable(-1);
export let connecting = writable(false);
export let chainName = writable('');
export let token_address = env.PUBLIC_MEMBERSHIP_TOKEN_ADDRESS;
export let nodeProvider = writable();
export let xmtpClient = writable();
export let xmtpConnected = writable(false);
export let xmtpConnecting = writable(false);

let chain_names = {
	1: 'mainnet',
	56: 'binance',
	137: 'polygon',
	1453: 'devm'
};

export const connectWallet = async () => {
	connecting.set(true);
	try {
		// get user provider,signer
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		networkProvider.set(provider);
		networkSigner.set(signer);

		// get connection details
		let addr = await signer.getAddress();
		userAddress.set(addr);
		let chain_id = await signer.getChainId();
		chainID.set(chain_id);
		for (const [key, value] of Object.entries(chain_names)) {
			if (key == chain_id) {
				chainName.set(value);
			}
		}
		userConnected.set(true);

		// membership state
		// set network/account change listeners
		setListeners();
		connecting.set(false);

		// xmtp connection
		if (!get(xmtpConnected)) {
			xmtpConnecting.set(true);
			let xc = await Client.create(signer);
			xmtpClient.set(xc);
			xmtpConnecting.set(false);
			xmtpConnected.set(true);
		}
		await fetchUserState();
	} catch (err) {
		console.log('error:', err);
	}
};

const setListeners = () => {
	window.ethereum.on('accountsChanged', function () {
		window.location.reload();
	});
	window.ethereum.on('chainChanged', function () {
		window.location.reload();
	});
};

export const connectNode = async () => {
	try {
		const provider = new ethers.providers.JsonRpcProvider(env.PUBLIC_ETHEREUM_RPC);
		nodeProvider.set(provider);
	} catch (err) {
		console.log('error:', err);
	}
};

const fetchUserState = async () => {
	try {
		const contract = new ethers.Contract(token_address, nft_abi, get(networkSigner));
		let state = await contract.getUserState(get(userAddress));
		userState.set(state);
	} catch (err) {
		console.log(err);
	}
};

connectNode();
