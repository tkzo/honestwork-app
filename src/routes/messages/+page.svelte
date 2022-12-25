<script lang="ts">
	import { networkSigner, userAddress, userConnected } from '$lib/stores/Network';
	import { browser } from '$app/environment';
	import { Client, Conversations } from '@xmtp/xmtp-js';

	import type { Conversation, Message } from '@xmtp/xmtp-js';

	export let viewport: Element;
	export let contents: Element;

	let xmtp: any;
	let conversations = new Array();
	let first_messages = new Array();
	let peers = new Array();
	let loaded = false;
	let chosen_conversation: Conversation;
	// let chosen_messages = new Array();

	$: if (userConnected) {
		connectXmtp();
	}
	$: feedHeight = window.innerHeight - 128;

	const connectXmtp = async () => {
		if (browser && $networkSigner) {
			xmtp = await Client.create($networkSigner);
			conversations = await xmtp.conversations.list();
			fetchInbox(conversations);
			for await (const conv of conversations) {
				peers.push(await fetchPeer(conv.peerAddress));
			}
		}
		loaded = true;
	};

	const fetchInbox = async (conversations: any[]) => {
		for await (const convo of conversations) {
			let convo_messages = await convo.messages();
			first_messages.push(convo_messages[0]);
		}
	};

	const createConversation = async () => {
		await connectXmtp();
		console.log('Client:', xmtp);
		if ($userAddress != '0xfB1C2FF46962B452C1731d44F0789bFb3607e63f') {
			const newConversation = await xmtp.conversations.newConversation(
				'0xfB1C2FF46962B452C1731d44F0789bFb3607e63f'
			);
			newConversation.send('gm');
			console.log('New conv:', newConversation);
		}
	};

	const chooseItem = async (convo: any) => {
		chosen_conversation = convo;
	};

	const getFirstMessage = async (convo: any) => {
		let convo_messages = await convo.messages();
		return convo_messages[0].content;
	};

	const getChatMessages = async (convo: any) => {
		let convo_messages = await convo.messages();
		return convo_messages;
	};

	const fetchPeer = async (peer: string) => {
		const result = await fetch(`/api/user/${peer}`);
		return await result.json();
	};
</script>

<main>
	<div class="inbox">
		<div class="create-conversation" on:click={createConversation} on:keydown>
			<p class="yellow">create new chat</p>
		</div>
		<div class="wrapper">
			<div bind:this={viewport} class="viewport" style={`height:${feedHeight.toString() + 'px'}`}>
				<div bind:this={contents} class="contents">
					{#if conversations && loaded}
						<div style="height:8px" />
						{#each conversations as convo, index}
							<div
								class={`inbox-item ${chosen_conversation == convo ? 'chosen-item' : ''}`}
								on:click={() => chooseItem(convo)}
								on:keydown
							>
								<img class="peer-image" src={peers[index]?.image_url ?? ''} alt="smth" />
								<div style="width: 12px;" />
								<div class="inbox-contents">
									{#await fetchPeer(convo.peerAddress) then peer}
										<p>{peer.username}</p>
									{/await}
									{#await getFirstMessage(convo) then msg}
										<div class="body-text light-60">{msg}</div>
									{/await}
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div style="width:12px" />
	<div class="chat">
		<div class="chat-window">
			{#if loaded}
				{#await getChatMessages(chosen_conversation) then chosen_messages}
					{#each chosen_messages as message}
						{#if message.senderAddress == $userAddress}
							<div class="self-message">
								<div class="date" />
								<div class="message-contents">
									<div class="body-text light-80">{message.content}</div>
								</div>
							</div>
						{:else}
							<div class="peer-message">
								<div class="date" />
								<div class="message-contents">
									<div class="body-text light-80">{message.content}</div>
								</div>
							</div>
						{/if}
					{/each}
				{/await}
			{/if}
		</div>
		<div class="input-field" />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.peer-image {
		width: 62px;
		height: 62px;
	}
	.inbox {
		width: 320px;
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: content-box;
	}
	.inbox-item {
		width: 319px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-width: 1px 1px 1px 0px;
		border-style: solid;
		border-top-color: var(--color-light-20);
		border-bottom-color: var(--color-light-20);
	}
	.chosen-item {
		border-right-color: var(--color-primary);
		background-color: var(--color-light-2);
	}
	.inbox-contents {
		width: 228px;
		display: flex;
		flex-direction: column;
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none;
		scrollbar-width: none;
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		--svrollbar-track-opacity: 1;
		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
	}
	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.viewport::-webkit-scrollbar {
		display: none;
	}
	.create-conversation {
		width: 100%;
		height: 32px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-bottom-color: var(--color-light-20);
		cursor: pointer;
	}
	.chat {
		width: 520px;
		height: calc(100vh - 128px);
		border-style: solid;
		border-width: 1px 1px 1px 1px;
		border-color: var(--color-light-20);
		display: flex;
		flex-direction: column;
	}
	.chat-window {
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
	}
	.self-message {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: min-content;
		max-width: 352px;
	}
	.peer-message {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: min-content;
		max-width: 352px;
	}
	.message-contents {
		background-color: var(--color-light-2);
		padding: 12px 16px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
</style>
