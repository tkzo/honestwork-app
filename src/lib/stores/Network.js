import { writable } from 'svelte/store';
import { ethers } from 'ethers';
import { Client } from '@xmtp/xmtp-js';
import { get } from 'svelte/store';
import { base } from '$app/paths';
import { toast } from '@zerodevx/svelte-toast';
import { user_watchlist, user_favorites } from '$lib/stores/State';

//todo: typescript
export let userConnected = writable(false);
export let userAddress = writable('');
export let networkProvider = writable();
export let networkSigner = writable();
export let chainID = writable(0);
export let userState = writable(-1);
export let userToken = writable(0);
export let connecting = writable(false);
export let chainName = writable('');
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

export const connectIfCached = async () => {
	if (!get(userConnected)) {
		let local = localStorage.getItem('honestwork_connection', 'true');
		if (local && local == 'true') {
			connectWallet();
		}
	}
};

export const connectWallet = async () => {
	connecting.set(true);
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		networkProvider.set(provider);
		networkSigner.set(signer);

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
		const url = `${base}/api/nft/user-token-id/${addr}`;
		const res = await fetch(url);
		const token = await res.json();
		userToken.set(token.token_id);
		toast.push(
			`<p class="light-60"><span style='color:var(--color-success)'>success: </span>wallet connected.</p>`
		);
		let local = localStorage.getItem('honestwork_connection', 'true');
		if (local != 'true') {
			localStorage.setItem('honestwork_connection', 'true');
		}
		setListeners();
		connecting.set(false);
		await fetchUserState();
	} catch (err) {
		console.log('error:', err);
	}
};

export const connectXmtp = async () => {
	try {
		if (!get(xmtpConnected)) {
			xmtpConnecting.set(true);
			let xc = await Client.create(get(networkSigner));
			xmtpClient.set(xc);
			xmtpConnecting.set(false);
			xmtpConnected.set(true);
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>xmtp connected.</p>`
			);
		}
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

const fetchUserState = async () => {
	try {
		let res = await fetch(`${base}/api/membership/${get(userAddress)}`);
		let tier = await res.json();
		userState.set(tier);
	} catch (err) {
		console.log(err);
	}
};

export const getWatchlist = async () => {
	if (get(userConnected)) {
		try {
			const response = await fetch(`/api/watchlist/get`);
			const data = await response.json();
			user_watchlist.set([]);
			if (data != null && data.length > 0) {
				data.forEach((item) => {
					user_watchlist.update((w) => {
						w.push(item);
						return w;
					});
				});
			}
		} catch (error) {
			toast.push('Error fetching watchlist');
		}
	}
};

export const getFavorites = async () => {
	if (get(userConnected)) {
		try {
			const response = await fetch(`/api/favorites/get`);
			const data = await response.json();
			user_favorites.set([]);
			if (data != null && data.length > 0) {
				data.forEach((item) => {
					user_favorites.update((w) => {
						w.push(item);
						return w;
					});
				});
			}
		} catch (error) {
			toast.push('Error fetching favorites');
		}
	}
};
