<script lang="ts">
	import Skill from '$lib/components/cards/Skill.svelte';
	import { connectWallet, userAddress, userConnected } from '$lib/stores/Network';
	import { onMount } from 'svelte';

	/*
	 * General utils for managing cookies in Typescript.
	 */
	export function setCookie(name: string, val: string) {
		const date = new Date();
		const value = val;

		// Set it expire in 7 days
		date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

		// Set it
		document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
	}

	export function getCookie(name: string) {
		const value = '; ' + document.cookie;
		console.log('Value:', value);
		const parts = value.split('; ' + name + '=');

		if (parts.length == 2) {
			return parts.pop()?.split(';').shift();
		}
	}

	export function deleteCookie(name: string) {
		const date = new Date();

		// Set it expire in -1 days
		date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

		// Set it
		document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
	}

	//todo: add non-gateway image resolver
	//todo: add wrong account, switch to correct account
	//todo: type declaration of data
	//todo: refactor input fields into a component

	export let data: any;
	let placeholder_image = 'assets/xcopy.gif';
	let correct_address: boolean;

	let links: string[] = data.user.links;
	let myform: HTMLFormElement;
	let chosenTab = 'profile';
	let nft_image: string = placeholder_image;
	let is_owner: boolean;
	let username: string = data.user.username;
	let title: string = data.user.title;
	let email: string = data.user.email;
	let nft_id: number = data.user.nft_id;
	let nft_address: string = data.user.nft_address;
	let fetching_image = true;
	let infobox_show: boolean = false;
	let infobox_previous_content: string;
	let chosen_skill_slot: number = -1;

	type InputSettings = {
		title: string;
		infobox_distance: number;
		infobox_content: string;
	};
	let inputSettings: InputSettings = {
		title: 'username',
		infobox_distance: 0,
		infobox_content: 'your username will be used to identify you on the platform.'
	};

	onMount(async () => {
		await connectWallet();
		await getNft();
		correct_address = $userAddress.toLowerCase() == data.user.address.toLowerCase();
	});

	$: if (fetching_image) {
		nft_image = placeholder_image;
	}

	const toggle = (tab: string) => {
		chosenTab = tab;
	};
	const getNft = async () => {
		fetching_image = true;
		infobox_show = false;
		if (nft_address && nft_id) {
			try {
				const response = await fetch(`api/alchemy/${nft_address}/${nft_id}`);
				if (response.ok) {
					const data = await response.json();
					fetching_image = false;
					nft_image = data.image;
					is_owner = data.owners.includes($userAddress.toLowerCase());
					if (!is_owner && inputSettings.title == 'nft_id') {
						infobox_previous_content = inputSettings.infobox_content;
						inputSettings.infobox_content = "you don't own this nft.";
						infobox_show = true;
					} else if (is_owner && inputSettings.title == 'nft_id') {
						inputSettings.infobox_content =
							'your nft address will be used to identify you on the platform.';
						infobox_show = true;
					}
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
	const focusInput = (input: string) => {
		infobox_show = true;
		switch (input) {
			case 'username':
				inputSettings = {
					title: 'username',
					infobox_distance: 0,
					infobox_content: 'your username will be used to identify you on the platform.'
				};
				break;
			case 'title':
				inputSettings = {
					title: 'title',
					infobox_distance: 40,
					infobox_content: 'your title will be used to identify you on the platform.'
				};
				break;
			case 'email':
				inputSettings = {
					title: 'email',
					infobox_distance: 80,
					infobox_content: 'your email will only be used to protocol level notifications.'
				};
				break;
			case 'nft_address':
				inputSettings = {
					title: 'nft_address',
					infobox_distance: 120,
					infobox_content: 'your nft address will be used to identify you on the platform.'
				};
				break;
			case 'nft_id':
				if (fetching_image || is_owner) {
					inputSettings.infobox_content =
						'your nft id will be used to identify you on the platform.';
				} else if (!is_owner) {
					inputSettings.infobox_content = "you don't own this nft.";
				}
				inputSettings.title = 'nft_id';
				inputSettings.infobox_distance = 160;
				break;
		}
	};
	const deFocusInput = () => {
		infobox_show = false;
	};
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="HonestWork Profile Page" />
</svelte:head>

<main>
	{#if correct_address}
		<form method="POST" bind:this={myform}>
			<div style="height: 12px" />
			<section class="bar">
				<div class="tabs">
					<p
						class={`tab link semibold ${chosenTab == 'profile' ? 'yellow' : 'light-60'}`}
						on:click={() => toggle('profile')}
						on:keydown
					>
						profile
					</p>
					<p
						class={`tab link semibold ${chosenTab == 'skills' ? 'yellow' : 'light-60'}`}
						on:click={() => toggle('skills')}
						on:keydown
					>
						skills
					</p>
					<p
						class={`tab link semibold ${chosenTab == 'past jobs' ? 'yellow' : 'light-60'}`}
						on:click={() => toggle('past jobs')}
						on:keydown
					>
						past jobs
					</p>
				</div>
				<p class="yellow semibold link">save changes</p>
			</section>
			<div style="height: 12px" />
			{#if chosenTab == 'profile'}
				<section
					class="infobox"
					style={`margin-top:${inputSettings.infobox_distance}px; opacity:${
						infobox_show ? '1' : '0'
					}; `}
				>
					<p
						class="light-60"
						style={`color:${
							!is_owner && inputSettings.title == 'nft_id' && !fetching_image ? 'red' : ''
						}`}
					>
						{inputSettings.infobox_content}
					</p>
				</section>
				<div class="info">
					<section>
						<img src={nft_image} alt="Profile" />
					</section>
					<div style="width: 12px" />
					<div class="input-fields">
						<div class="input-field">
							<div class="placeholder">
								<p class="light-40">username</p>
							</div>
							<input
								class="flex-input"
								type="text"
								bind:value={username}
								placeholder={data.user.username}
								on:focus={() => focusInput('username')}
								on:focusout={() => deFocusInput()}
							/>
						</div>
						<div style="height: 8px" />
						<div class="input-field">
							<div class="placeholder">
								<p class="light-40">title</p>
							</div>
							<input
								class="flex-input"
								type="text"
								bind:value={title}
								placeholder={data.user.title}
								on:focus={() => focusInput('title')}
								on:focusout={() => deFocusInput()}
							/>
						</div>
						<div style="height: 8px" />
						<div class="input-field">
							<div class="placeholder">
								<p class="light-40">email</p>
							</div>
							<input
								class="flex-input"
								type="text"
								bind:value={email}
								placeholder={data.user.email}
								on:focus={() => focusInput('email')}
								on:focusout={() => deFocusInput()}
							/>
						</div>
						<div style="height: 8px" />
						<div class="input-field">
							<div class="placeholder">
								<p class="light-40">nft address</p>
							</div>
							<input
								class="flex-input"
								type="text"
								bind:value={nft_address}
								placeholder={data.user.nft_address}
								on:focus={() => focusInput('nft_address')}
								on:focusout={() => deFocusInput()}
							/>
						</div>
						<div style="height: 8px" />
						<div class="input-field">
							<div class="placeholder">
								<p class="light-40">nft id</p>
							</div>
							<input
								class={`flex-input no-spinner ${
									!fetching_image ? (is_owner ? 'success' : 'error') : ''
								}`}
								type="number"
								bind:value={nft_id}
								placeholder={data.user.nft_id}
								on:input={() => getNft()}
								on:focus={() => focusInput('nft_id')}
								on:focusout={() => deFocusInput()}
							/>
						</div>
					</div>
				</div>
				<div style="height: 16px" />
				{#if data.user.links}
					<div class="links">
						{#each data.user.links as link, i}
							<div class="input-field">
								<div class="placeholder">
									<p class="light-40">link</p>
								</div>
								<input class="flex-input" type="text" placeholder={link} bind:value={links[i]} />
							</div>
							{#if i < data.user.links.length - 1}
								<div style="height: 8px" />
							{/if}
						{/each}
					</div>
				{/if}
				<div style="height: 16px" />
				<div class="bio">
					<textarea
						rows="17"
						size="520"
						maxlength="1000"
						placeholder="enter bio here..."
						bind:value={data.user.bio}
					/>
				</div>
			{:else if chosenTab == 'skills'}
				{#if data.user.skills}
					{#if chosen_skill_slot == -1}
						{#each data.user.skills as skill, i}
							<div on:click={() => (chosen_skill_slot = i)} on:keydown>
								<Skill
									slot={skill.slot}
									title={skill.title}
									description={skill.description}
									image_urls={skill.image_urls}
									minimum_price={skill.minimum_price}
								/>
							</div>
							{#if i < data.user.skills?.length - 1}
								<div style="height: 12px" />
							{/if}
						{/each}
					{:else}
						<p>skill edit</p>
					{/if}
				{/if}
			{/if}
		</form>
	{:else if $userConnected}
		<div style="height: 16px" />
		<section style="width:520px">
			<div class="gm">
				<div class="gm-inner">
					<p class="yellow">wrong account</p>
				</div>
			</div>
			<div class="gm">
				<p>switch to <span class="yellow">{data.user.address}</span> to see this page.</p>
			</div>
		</section>
	{/if}
</main>

<style>
	textarea {
		width: 100%;
		resize: none;
	}
	img {
		width: 188px;
		height: 188px;
	}
	.input-fields {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.input-field {
		display: flex;
		flex-direction: row;
		min-width: 320px;
		flex: 1;
	}
	.placeholder {
		height: 32px;
		display: flex;
		background-color: var(--color-dark);
		border-width: 1px 0px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		padding: 8px;
	}

	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.bar {
		width: 520px;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0px 12px 0px 0px;
	}
	.info {
		width: 520px;
		display: flex;
		flex-direction: row;
	}
	.tabs {
		display: flex;
		flex-direction: row;
	}
	.tab {
		display: flex;
		flex-direction: row;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
	}
	.flex-input {
		height: 32px;
		flex: 1;
	}
	.error {
		border-color: var(--color-error);
	}
	.success:focus {
		border-color: var(--color-success);
	}
	.infobox {
		width: 240px;
		padding: 8px;
		position: absolute;
		margin-left: 532px;
	}
	.gm {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.gm-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
