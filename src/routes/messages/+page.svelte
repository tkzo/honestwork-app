<script lang="ts">
	//todo: add types

	import { networkSigner, userAddress, userConnected, xmtpClient } from '$lib/stores/Network';
	import { browser } from '$app/environment';
	import { Client } from '@xmtp/xmtp-js';
	import { shortcut } from '$lib/stores/Shortcut';
	import { Svrollbar } from 'svrollbar';
	import Message from '$lib/components/messages/Message.svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { onDestroy } from 'svelte';
	// import { new_conversation_address, new_conversation_metadata } from '$lib/stores/State';

	export let viewport: Element;
	export let contents: Element;

	let xmtp: any;
	let conversations = new Array();
	let last_messages = new Array();
	let peers = new Array();
	let loaded = false;
	let user_input: HTMLTextAreaElement;
	let placeholder_image = 'assets/xcopy.gif';
	let chosen_messages = new Array();
	let first_chat_load = true;
	let new_message = '';
	let rows = 1;
	let chosen_conversation: any;
	let error_message = '';
	let syncing = false;
	let active_stream: any;

	afterUpdate(async () => {
		if (first_chat_load && contents.clientHeight > 0) {
			scroll('auto');
			first_chat_load = false;
		} else {
			scroll('smooth');
		}
	});
	onDestroy(() => {
		if (active_stream) {
			active_stream.return();
		}
	});

	$: if (userConnected && !loaded) {
		fetchConversations();
	}
	$: feedHeight = window.innerHeight - 165;

	//todo: doesn't recognize wrapping -fix
	const updateRows = () => {
		rows = user_input.value.split(/\r\n|\r|\n/).length;
	};

	const scroll = (behavior: any) => {
		viewport.scroll({ top: contents.clientHeight, behavior: behavior });
	};

	// const pendingConversation = () => {
	// 	if ($new_conversation_address != '') {
	// 		console.log('Creating pending conversation...');
	// 		newConversation($new_conversation_address);
	// 		new_conversation_address.set('');
	// 	}
	// };

	const fetchConversations = async () => {
		if (browser) {
			conversations = await $xmtpClient.conversations.list();
			if (conversations.length > 0) {
				fetchInbox(conversations);
				for await (const conv of conversations) {
					peers.push(await fetchPeer(conv.peerAddress));
				}
				chooseItem(conversations[0]);
				chosen_conversation = conversations[0];
			}

			// pendingConversation();
		}
		loaded = true;
	};

	const fetchInbox = async (convos: any[]) => {
		let c = 0;
		for await (const convo of convos) {
			let msg = await getLastMessage(convo);
			if (!syncing) {
				syncChatMessages(convo);
			}
			last_messages[c] = msg;
			c++;
		}
		last_messages = last_messages;
	};

	// const newConversation = async (addr: string) => {
	// 	if (xmtp) {
	// 		let address_available = await xmtp.canMessage(addr);
	// 		if (!address_available) {
	// 			error_message = 'Address is not available on xmtp network';
	// 			return;
	// 		}
	// 		const convo = await xmtp.conversations.newConversation(addr, {
	// 			conversationId: 'honestwork.app/conversations',
	// 			metadata: {
	// 				title: $new_conversation_metadata.title
	// 			}
	// 		});
	// 		return convo;
	// 	}
	// };

	const chooseItem = async (convo: any) => {
		chosen_conversation = convo;
		first_chat_load = true;
		getChatMessages(convo);
	};

	const getLastMessage = async (convo: any) => {
		let convo_messages = await convo.messages();
		if (convo_messages.length == 0) {
			return 'No messages yet...';
		}
		let msg = convo_messages[convo_messages.length - 1].content;
		if (msg.length > 30) {
			msg = msg.substring(0, 30) + '...';
		}
		return msg;
	};

	const getChatMessages = async (convo: any) => {
		let convo_messages = await convo.messages();
		chosen_messages = convo_messages;
	};

	const syncChatMessages = async (convo: any) => {
		active_stream = await convo.streamMessages();
		for await (const message of active_stream) {
			syncing = true;
			chosen_messages.push(message);
			chosen_messages = chosen_messages;
			fetchInbox(conversations);
		}
	};

	const fetchPeer = async (peer: string) => {
		const result = await fetch(`/api/user/${peer}`);
		return await result.json();
	};

	const sendMessage = async (convo: any) => {
		new_message = user_input.value;
		let input_ = user_input.value;
		user_input.value = '';
		await convo.send(input_);
		new_message = '';
	};
</script>

<main>
	<div class="inbox">
		{#if error_message != ''}
			<div class="create-conversation">
				<p>{error_message}</p>
			</div>
		{/if}
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
								<img
									class="peer-image"
									src={peers[index]?.image_url && peers[index]?.image_url != ''
										? peers[index]?.image_url
										: placeholder_image}
									alt="smth"
								/>
								<div style="width: 12px;" />
								<div class="inbox-contents">
									{#await fetchPeer(convo.peerAddress) then peer}
										<p>{peer.username && peer.username != '' ? peer.username : 'anon'}</p>
									{/await}
									{#if last_messages[index] && last_messages[index] != ''}
										<div class="body-text light-60">{last_messages[index]}</div>
									{/if}
								</div>
							</div>
							{#if index != conversations.length - 1}
								<div style="height: 12px;" />
							{/if}
						{/each}
					{:else}
						<div class="spinster">
							<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
							<div style="height: 12px;" />
							<p class="light-60" style="animation: blinking 2s linear infinite;">
								connecting xmtp...
							</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div style="width:12px" />
	<div class="chat">
		<div class="chat-window">
			<div class="wrapper">
				<div bind:this={viewport} class="viewport" style={`height:${feedHeight.toString() + 'px'}`}>
					<div bind:this={contents} class="contents">
						{#if loaded && chosen_messages.length > 0}
							{#each chosen_messages as message, index}
								<Message {message} {index} array_length={chosen_messages.length} />
							{/each}
						{/if}
					</div>
				</div>
				<Svrollbar {viewport} {contents} />
			</div>
		</div>
		<div class="input-field">
			<textarea
				placeholder="Write a message..."
				bind:this={user_input}
				name="message"
				{rows}
				maxlength="1000"
				on:input={updateRows}
			/>
			<div
				class="send-button"
				on:click={() => sendMessage(chosen_conversation)}
				on:keydown
				use:shortcut={{ shift: true, code: 'Enter' }}
			>
				{#if new_message.length > 0}
					<img src="icons/loader.svg" alt="loading" class="rotating" />
				{:else}
					<img src="/icons/message.svg" alt="send" />
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	textarea {
		width: 100%;
		resize: none;
		border: none;
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
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-top-color: var(--color-light-20);
		border-bottom-color: var(--color-light-20);
		cursor: pointer;
	}
	.inbox-item:hover {
		background-color: var(--color-light-2);
	}
	.chosen-item {
		border-width: 1px 1px 1px 0px;
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
		justify-content: flex-end;
	}
	.chat-window {
		display: flex;
		flex-direction: column;
	}
	.gray-line {
		border-style: solid;
		border-width: 1px 1px 1px 0px;
		border-color: var(--color-light-20);
	}
	.input-field {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-style: solid;
		border-width: 1px 0px 0px 0px;
		border-color: var(--color-light-20);
	}
	.send-button {
		margin-right: 12px;
		margin-top: 3px;
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
	.spinster {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
	}
</style>
