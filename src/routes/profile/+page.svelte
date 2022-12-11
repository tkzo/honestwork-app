<script lang="ts">
	/// <reference types="aws-sdk" />
	import Skill from '$lib/components/cards/Skill.svelte';
	import {
		connectWallet,
		userAddress,
		userState,
		token_abi,
		token_address,
		networkSigner,
		networkProvider,
		chainID
	} from '$lib/stores/Network';
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import { goto } from '$app/navigation';
	import { Jumper } from 'svelte-loading-spinners';
	import { tweened } from 'svelte/motion';

	//todo: add non-gateway image resolver for alchemy fetch
	//todo: type declaration of data
	//todo: page loads twice -fix

	export let data: any;

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

	let placeholder_image = 'assets/xcopy.gif';
	let correct_address: boolean;
	let changes_made: boolean = false;
	let file_uploaded: string;
	let links: string[] = data.user.links ? data.user.links : new Array(3).fill('');
	let initial_links: string[] = data.user.links ? data.user.links : new Array(3).fill('');
	let image_url: string = data.user.image_url;
	let uploaded_image_url: string;
	let myform: HTMLFormElement;
	let chosenTab = 'profile';
	let nft_image: string = placeholder_image;
	let is_owner: boolean;
	let username: string = data.user.username;
	let show_nft: boolean = data.user.show_nft;
	let title: string = data.user.title;
	let email: string = data.user.email;
	let nft_id: number = data.user.nft_id;
	let nft_address: string = data.user.nft_address;
	let bio: string = data.user.bio;
	let fetching_image = true;
	let infobox_show: boolean = false;
	let infobox_previous_content: string;
	let chosen_skill_slot: number = -1;
	let upload_url: Response;
	let myfile: File;
	let ens_name: string;

	$: if (
		username != data.user.username ||
		title != data.user.title ||
		email != data.user.email ||
		nft_id != data.user.nft_id ||
		nft_address != data.user.nft_address ||
		initial_links[0] != links[0] ||
		initial_links[1] != links[1] ||
		initial_links[2] != links[2] ||
		bio != data.user.bio ||
		image_url != data.user.image_url ||
		show_nft != data.user.show_nft
	) {
		changes_made = true;
	} else {
		changes_made = false;
	}

	onMount(async () => {
		await connectWallet();
		await getNft();
		//todo: move to layout
		correct_address = $userAddress.toLowerCase() == data.user.address.toLowerCase();
	});

	$: if (fetching_image) {
		nft_image = placeholder_image;
	}

	const blink = tweened(1, {
		duration: 100
	});
	const toggle = (tab: string) => {
		if (!changes_made) {
			chosenTab = tab;
		} else if (chosenTab != tab) {
			$blink = 0;
			setTimeout(() => {
				$blink = 1;
			}, 100);
			setTimeout(() => {
				$blink = 0;
			}, 200);
			setTimeout(() => {
				$blink = 1;
			}, 300);
		}
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
	const soulbind = async () => {
		if ($userState == 1) {
			try {
				const contract = new ethers.Contract(token_address, token_abi, $networkSigner);
				const tx = await contract.bind();
				const receipt = await tx.wait();
				if (receipt.status == 1) {
					console.log(receipt.status);
					goto('/profile');
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	//todo: update spaces cors policy with domain
	const uploadPhoto = async (e: any) => {
		const file = e.target.files[0]!;
		if (file == null) return; // If user cancels file selection
		const reader = new FileReader();
		reader.onload = function () {
			if (typeof reader.result == 'string') image_url = reader.result;
		};
		reader.readAsDataURL(file);
		const res = await fetch(`/api/upload-url/${e.target.files[0].name}`);
		upload_url = res;
	};
	const submit = async (e: any) => {
		//todo: refactor into order agnostic
		console.log(e);
		if (e.target[6].files.length != 0) {
			const file = e.target[6].files[0]!;
			const { url, fields } = await upload_url.json();
			const formData = new FormData();
			Object.entries({ ...fields, file }).forEach(([key, value]) => {
				formData.append(key, value as string);
			});
			const upload = await fetch(url, {
				method: 'POST',
				body: formData
			});
			//todo: stop exec if not ok
			if (upload.ok) {
				console.log('Uploaded successfully!');
			} else {
				console.error('Upload failed.');
			}
		}
		myform.submit();
	};
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="HonestWork Profile Page" />
</svelte:head>

<main>
	{#if correct_address && $userState > 1}
		<form method="POST" bind:this={myform} on:submit|preventDefault={submit}>
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
				<button
					class={` semibold link ${changes_made ? 'yellow' : 'light-60'}`}
					style={`opacity: ${$blink}`}>update profile</button
				>
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
					<section style="height: 100%">
						<img
							src={show_nft ? nft_image : image_url ? image_url : placeholder_image}
							alt="Profile"
							placeholder={placeholder_image}
						/>
					</section>
					<div style="width: 12px" />
					<div class="input-fields">
						<div class="input-field">
							<div class="placeholder">
								<p class="light-40">username</p>
							</div>
							<input
								name="username"
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
								name="title"
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
								name="email"
								class="flex-input"
								type="email"
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
								name="nft_address"
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
								name="nft_id"
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

						<div style="height:8px" />
						<div class="input-field file-input-container">
							<input
								class="file-input"
								type="file"
								accept="image/png, image/jpeg"
								on:change={uploadPhoto}
								bind:value={file_uploaded}
							/>
							<input hidden type="text" name="image_url" bind:value={image_url} />
							<div class="pseudo-file-input-container">
								<p class="pseudo-file-input">UPLOAD FILE</p>
							</div>
						</div>
						<div style="height: 8px" />
						<div
							class="input-field"
							on:click={() => (show_nft = !show_nft)}
							on:keydown
							style="cursor:pointer;"
						>
							<input hidden type="checkbox" name="show_nft" bind:checked={show_nft} />
							{#if show_nft}
								<img src="icons/checked.svg" alt="Checked" style="height:16px;width:16px;" />
								<div style="width:8px" />
								<p class="yellow">use nft image</p>
							{:else}
								<img src="icons/unchecked.svg" alt="Checked" style="height:16px;width:16px;" />
								<div style="width:8px" />
								<p class="light-60">use nft image</p>
							{/if}
						</div>
					</div>
				</div>
				<div style="height: 16px" />
				<div class="links">
					{#each links as link, i}
						<div class="input-field">
							<div class="placeholder">
								<p class="light-40">link</p>
							</div>
							<input
								name={`link-${i}`}
								class="flex-input"
								type="text"
								placeholder={link}
								bind:value={links[i]}
							/>
						</div>
						{#if i < links.length - 1}
							<div style="height: 8px" />
						{/if}
					{/each}
				</div>
				<div style="height: 16px" />
				<div class="bio">
					<textarea
						name="bio"
						rows="17"
						size="520"
						maxlength="1000"
						placeholder="enter bio here..."
						bind:value={bio}
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
	{:else if correct_address && $userState == 1}
		<section>
			<div class="gm">
				<div class="gm-inner">
					<p>gm fren</p>
				</div>
			</div>
			<div class="gm" on:click={soulbind} on:keydown>
				<p class="yellow link">bind your nft</p>
			</div>
		</section>
	{:else if correct_address != null}
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
	{:else}
		<div class="spinner">
			<div style="height: 36px;" />
			<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
		</div>
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
		justify-content: flex-start;
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
	.file-input {
		opacity: 0;
		width: 320px;
		height: 32px;
		cursor: pointer;
	}
	.file-input-container {
		position: relative;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.pseudo-file-input {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
</style>
