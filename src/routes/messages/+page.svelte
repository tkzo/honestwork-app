<script lang="ts">
	import { userConnected, xmtpClient, userAddress } from '$lib/stores/Network';
	import { browser } from '$app/environment';
	import { shortcut } from '$lib/stores/Shortcut';
	import { Svrollbar } from 'svrollbar';
	import Message from '$lib/components/messages/Message.svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { onDestroy } from 'svelte';
	import { new_conversation_metadata } from '$lib/stores/State';
	import { onMount, afterUpdate } from 'svelte';
	import { base } from '$app/paths';
	import Agreements from '$lib/components/messages/Agreements.svelte';
	import { fade } from 'svelte/transition';

	let viewport_inbox: Element;
	let contents_inbox: Element;
	let conversations = new Array();
	let last_messages = new Array();
	let peers = new Array();
	let loaded = false;
	let user_input: HTMLTextAreaElement;
	let placeholder_image = 'assets/xcopy.gif';
	let chosen_messages = new Array();
	let new_message = '';
	let rows = 1;
	let chosen_conversation: any;
	let error_message = '';
	let syncing = false;
	let active_stream: any;
	let all_streams: any;
	let chosen_tab = 'messages';
	let feedHeight = 0;
	let inboxHeight = 0;

	onDestroy(() => {
		if (active_stream) {
			active_stream.return();
		}
		if (all_streams) {
			all_streams.return();
		}
	});
	onMount(async () => {
		if (userConnected && !loaded) {
			await fetchConversations();
		}
	});
	afterUpdate(() => {
		if (chosen_tab == 'messages' && viewport_inbox && contents_inbox.clientHeight > 0) {
			setTimeout(() => {
				scroll('auto');
			}, 100);
		}
	});

	$: if (browser) {
		feedHeight = window.innerHeight - 197;
		inboxHeight = window.innerHeight - 128;
	}

	const parseMeta = (m: string) => {
		let stringified = m.split(':').slice(1, m.length).join(':');
		return stringified;
	};

	//todo: doesn't recognize wrapping -fix
	const updateRows = () => {
		rows = user_input.value.split(/\r\n|\r|\n/).length;
	};
	const scroll = (behavior: any) => {
		if (viewport_inbox && contents_inbox) {
			viewport_inbox.scroll({ top: contents_inbox.clientHeight, behavior: behavior });
		}
	};
	const fetchConversations = async () => {
		if (browser && $xmtpClient) {
			const url = `${base}/api/conversation/${$userAddress}`;
			const response = await fetch(url);
			const json = await response.json();
			if ($new_conversation_metadata.address != '') {
				await newConversation();
				new_conversation_metadata.set({ title: '', address: '' });
			}
			conversations = await $xmtpClient.conversations.list();
			conversations = conversations?.filter(
				(convo) =>
					convo.context?.conversationId &&
					convo.context.conversationId.startsWith('honestwork.app/')
			);
			if (conversations?.length > 0) {
				conversations = conversations?.filter((convo) => {
					return json?.find((j: any) => {
						return j.matcheduser == convo.peerAddress;
					});
				});
				conversations = conversations?.filter((convo) => {
					return json.find((j: any) => {
						return j.muted == false;
					});
				});
				if (conversations?.length > 0) {
					await fetchInbox(conversations);
					for await (const conv of conversations) {
						peers.push(await fetchPeer(conv.peerAddress));
					}
					peers = peers;
					chooseItem(conversations[conversations.length - 1]);
				}
			}
		}
		loaded = true;
		scroll('auto');
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
	const newConversation = async () => {
		const convo = await $xmtpClient.conversations.newConversation(
			$new_conversation_metadata.address,
			{
				conversationId: 'honestwork.app/conversations',
				metadata: {
					title: $new_conversation_metadata.title
				}
			}
		);
		conversations.push(convo);
		chooseItem(conversations[conversations.length - 1]);
		// user_input.focus();
		return convo;
	};
	const chooseItem = async (convo: any) => {
		chosen_conversation = convo;
		getChatMessages(convo);
		scroll('auto');
		// user_input.focus();
	};
	const getLastMessage = async (convo: any) => {
		let meta_message;
		let convo_messages = await convo.messages();
		if (convo_messages.length == 0) {
			return 'No messages yet...';
		}
		let msg = convo_messages[convo_messages.length - 1].content;
		if (msg.startsWith('Meta:')) {
			meta_message = JSON.parse(parseMeta(msg));
			return `[${meta_message.type}]`;
		} else {
			return msg.slice(0, 30) + '...';
		}
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
			conversations.push(conversation);
			conversations = conversations;
		}
	};
	const fetchPeer = async (peer: string) => {
		const result = await fetch(`${base}/api/user/${peer}`);
		let jason = await result.json();
		if (jason.shownft) {
			let img_url = await getNft(jason.nftaddress, jason.nftid);
			jason.nfturl = img_url;
		}
		return jason;
	};
	const sendMessage = async (convo: any) => {
		new_message = user_input.value;
		let input_ = user_input.value;
		user_input.value = '';
		await convo.send(input_);
		new_message = '';
		scroll('auto');
	};
	const getNft = async (addr: string, id: number) => {
		try {
			const response = await fetch(`${base}/api/alchemy/${addr}/${id}`);
			if (response.ok) {
				const data = await response.json();
				return data.image;
			}
		} catch (err) {
			console.log(err);
		}
	};
	const fakeTransition = (node: any) => fade(node, { duration: 0 });
	$: console.log('Contents inbox:', contents_inbox);
</script>

<div style="height:16px" />
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
										src={peers[index]?.shownft
											? peers[index]?.nfturl
											: peers[index]?.imageurl && peers[index]?.imageurl != ''
											? peers[index]?.imageurl
											: placeholder_image}
										alt="smth"
									/>
									<div style="width: 12px;" />
									<div class="inbox-inner-contents">
										<p>
											{peers[index]?.showens
												? peers[index]?.ensname
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
		<div class="tab-bar">
			<div class="tab-bar-item" on:click={() => (chosen_tab = 'messages')} on:keydown>
				<p class={`${chosen_tab == 'messages' ? 'yellow' : 'light-60'}`}>messages</p>
			</div>
			<div class="tab-bar-item" on:click={() => (chosen_tab = 'agreements')} on:keydown>
				<p class={`${chosen_tab == 'agreements' ? 'yellow' : 'light-60'}`}>agreements</p>
			</div>
		</div>
		<div class="sections-container">
			{#if chosen_tab == 'messages'}
				<div class="chat-window">
					<div class="wrapper">
						<div
							bind:this={viewport_inbox}
							class="viewport chat-viewport"
							style={`height:${feedHeight.toString() + 'px'}`}
						>
							<div bind:this={contents_inbox} class="contents">
								{#if loaded && chosen_messages.length > 0}
									{#each chosen_messages as message, index}
										<Message {message} {index} array_length={chosen_messages.length} />
									{/each}
								{/if}
							</div>
						</div>
						<Svrollbar
							alwaysVisible
							viewport={viewport_inbox}
							contents={contents_inbox}
							vThumbOut={fakeTransition}
							vTrackOut={fakeTransition}
						/>
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
						use:shortcut={{ code: 'Enter' }}
					>
						{#if new_message.length > 0}
							<img src="icons/loader.svg" alt="loading" class="rotating" />
						{:else}
							<img src="/icons/message.svg" alt="send" />
						{/if}
					</div>
				</div>
			{:else if chosen_tab == 'agreements' && chosen_conversation != null}
				<Agreements conversation={chosen_conversation} />
			{/if}
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
		border-color: var(--color-light-20);
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
		/* --svrollbar-track-width: 1px; */
		/* --svrollbar-track-opacity: 1; */
		/* --svrollbar-thumb-width: 10px; */
		/* --svrollbar-thumb-background: #d9ab55; */
		/* --svrollbar-thumb-opacity: 1; */
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
		position: relative;
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
	.inbox-window {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
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

	.inbox-wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;
		--svrollbar-thumb-width: 1px;
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
		width: 100%;
	}
	.inbox-contents {
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-start;
	}
	.tab-bar {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 32px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		border-style: solid;
		border-width: 0px 0px 1px 0px;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		align-items: center;
		z-index: 10;
	}
	.tab-bar-item {
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-style: solid;
		border-width: 0px 1px 0px 0px;
		border-color: var(--color-light-20);
		padding: 0px 12px;
	}
	.tab-bar-item:hover {
		background-color: var(--color-light-2);
		cursor: pointer;
	}
	.tab-bar-item:hover p {
		color: var(--color-primary);
	}
	.agreements {
		width: 520px;
		height: calc(100vh - 128px);
		border-style: solid;
		border-width: 1px 1px 1px 1px;
		border-color: var(--color-light-20);
		display: flex;
		flex-direction: column;
	}
	.agreements-container {
		height: 32px;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 16px 20px;
	}
	.new-agreement {
		width: fit-content;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--color-light-20);
		cursor: pointer;
		padding: 6px 8px;
	}
	.new-agreement:hover {
		background-color: var(--color-light-2);
	}
	.sections-container {
		display: flex;
		flex-direction: column;
	}
</style>
