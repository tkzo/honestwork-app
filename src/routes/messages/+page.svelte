<script lang="ts">
	import { networkSigner, userConnected } from '$lib/stores/Network';
	import { browser } from '$app/environment';
	import { Client } from '@xmtp/xmtp-js';

	export let data: any;

	let xmtp: any;

	const connectXmtp = async () => {
		if (browser) {
			xmtp = await Client.create($networkSigner);
		}
	};

	const createConversation = async () => {
		await connectXmtp();
		console.log('Client:', xmtp);
		// const newConversation = await xmtp.conversations.newConversation(
		// 	'0xfB1C2FF46962B452C1731d44F0789bFb3607e63f'
		// );
	};
</script>

{data.conversations}

<p on:click={createConversation} on:keydown>CREATE CONVERSATION</p>
