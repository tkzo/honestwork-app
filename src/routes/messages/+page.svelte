<script lang="ts">
	//todo: add types

	import { nodeProvider, userConnected, xmtpClient } from '$lib/stores/Network';
	import { browser } from '$app/environment';
	import { shortcut } from '$lib/stores/Shortcut';
	import { Svrollbar } from 'svrollbar';
	import Message from '$lib/components/messages/Message.svelte';
	import { afterUpdate } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { onDestroy } from 'svelte';
	import { new_conversation_address, new_conversation_metadata } from '$lib/stores/State';

	//todo: move conversation into its own component
	export let viewport: Element;
	export let contents: Element;
	export let viewport_inbox: Element;
	export let contents_inbox: Element;

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
	let all_streams: any;

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
		if (all_streams) {
			all_streams.return();
		}
	});

	$: if (userConnected && !loaded) {
		fetchConversations();
	}
	$: feedHeight = window.innerHeight - 165;
	$: inboxHeight = window.innerHeight - 128;

	//todo: doesn't recognize wrapping -fix
	const updateRows = () => {
		rows = user_input.value.split(/\r\n|\r|\n/).length;
	};

	const scroll = (behavior: any) => {
		viewport.scroll({ top: contents.clientHeight, behavior: behavior });
	};

	const fetchConversations = async () => {
		if (browser && $xmtpClient) {
			if ($new_conversation_address != '') {
				await newConversation($new_conversation_address);
				new_conversation_address.set('');
			}
			conversations = await $xmtpClient.conversations.list();
			if (conversations.length > 0) {
				await fetchInbox(conversations);
				for await (const conv of conversations) {
					peers.push(await fetchPeer(conv.peerAddress));
				}
				peers = peers;
				chooseItem(conversations[conversations.length - 1]);
			}
		}
		loaded = true;
	};

	const fetchInbox = async (convos: any[]) => {
		let c = 0;
		for await (const convo of convos) {
			let msg = await getLastMessage(convo);
			if (!syncing) {
				syncChatMessages(convo);
				syncConversations();
			}
			last_messages[c] = msg;
			c++;
		}
		last_messages = last_messages;
	};

	const newConversation = async (addr: string) => {
		const convo = await $xmtpClient.conversations.newConversation(addr, {
			conversationId: 'honestwork.app/conversations',
			metadata: {
				title: $new_conversation_metadata.title
			}
		});
		conversations.push(convo);
		chooseItem(conversations[conversations.length - 1]);
		user_input.focus();
		return convo;
	};

	const chooseItem = async (convo: any) => {
		chosen_conversation = convo;
		first_chat_load = true;
		getChatMessages(convo);
		user_input.focus();
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

	const syncConversations = async () => {
		all_streams = await $xmtpClient.conversations.stream();
		for await (const conversation of all_streams) {
			console.log(`New conversation started with ${conversation.peerAddress}`);
			conversations.push(conversation);
			conversations = conversations;
		}
	};

	const fetchPeer = async (peer: string) => {
		const result = await fetch(`/api/user/${peer}`);
		let jason = await result.json();
		if (jason.show_nft) {
			let img_url = await getNft(jason.nft_address, jason.nft_id);
			jason.nft_image_url = img_url;
		}
		if (jason.show_ens) {
			let ens_name = await $nodeProvider.lookupAddress(peer);
			jason.ens_name = ens_name;
		}
		return jason;
	};

	const sendMessage = async (convo: any) => {
		new_message = user_input.value;
		let input_ = user_input.value;
		user_input.value = '';
		await convo.send(input_);
		new_message = '';
	};

	const getNft = async (addr: string, id: number) => {
		try {
			const response = await fetch(`api/alchemy/${addr}/${id}`);
			if (response.ok) {
				const data = await response.json();
				return data.image;
			}
		} catch (err) {
			console.log(err);
		}
	};
</script>

<main>
	<div class="inbox">
		{#if error_message != ''}
			<div class="create-conversation">
				<p>{error_message}</p>
			</div>
		{/if}
		<div class="inbox-window">
			<div class="inbox-wrapper">
				<div
					bind:this={viewport_inbox}
					class="viewport inbox-viewport"
					style={`height:${inboxHeight.toString() + 'px'}`}
				>
					<div bind:this={contents_inbox} class="contents inbox-contents">
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
										src={peers[index]?.show_nft
											? peers[index]?.nft_image_url
											: peers[index]?.image_url && peers[index]?.image_url != ''
											? peers[index]?.image_url
											: placeholder_image}
										alt="smth"
									/>

									<div style="width: 12px;" />
									<div class="inbox-inner-contents">
										<p>
											{peers[index]?.show_ens
												? peers[index]?.ens_name
												: peers[index]?.username && peers[index]?.username != ''
												? peers[index].username
												: 'anon'}
										</p>
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
	</div>
	<div style="width:12px" />
	<div class="chat">
		<div class="chat-window">
			<div class="wrapper">
				<div
					bind:this={viewport}
					class="viewport chat-viewport"
					style={`height:${feedHeight.toString() + 'px'}`}
				>
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
	textarea:focus {
		outline: none;
	}
	.peer-image {
		width: 62px;
		height: 62px;
	}
	.inbox {
		width: 320px;
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: content-box;
		display: flex;
		flex-direction: column;
	}
	.inbox-item {
		width: 319px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-top-color: var(--color-light-10);
		border-bottom-color: var(--color-light-10);
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
	.inbox-inner-contents {
		width: 228px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
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
		border-bottom-color: var(--color-light-10);
		cursor: pointer;
	}
	.chat {
		width: 520px;
		height: calc(100vh - 128px);
		border-style: solid;
		border-width: 1px 1px 1px 1px;
		border-color: var(--color-light-10);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.chat-window {
		display: flex;
		flex-direction: column;
	}
	.inbox-window {
		display: flex;
		flex-direction: column;
	}
	.gray-line {
		border-style: solid;
		border-width: 1px 1px 1px 0px;
		border-color: var(--color-light-10);
	}
	.input-field {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-style: solid;
		border-width: 1px 0px 0px 0px;
		border-color: var(--color-light-10);
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
		display: flex;
		flex-direction: column;
	}

	.inbox-wrapper {
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
		display: flex;
		flex-direction: column-reverse;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.chat-viewport {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
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
	.inbox-viewport {
		display: flex;
		flex-direction: column;
	}
	.inbox-contents {
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-start;
	}
</style>
