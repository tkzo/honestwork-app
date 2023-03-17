<script lang="ts">
	/// <reference types="aws-sdk" />
	import Skills from '$lib/components/profile/Skills.svelte';
	import {
		userAddress,
		userState,
		userConnected,
		getFavorites,
		getWatchlist
	} from '$lib/stores/Network';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { changes_made, submitting } from '$lib/stores/State';
	import { Svrollbar } from 'svrollbar';
	import { browser } from '$app/environment';
	import { assets } from '$app/paths';
	import Watchlist from '$lib/components/profile/Watchlist.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import Favorites from '$lib/components/profile/Favorites.svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import Tiptap from '$lib/components/common/Tiptap.svelte';
	import { parseContent } from '$lib/stores/Parser';
	import Applications from '$lib/components/profile/Applications.svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { ProfileInput } from '$lib/stores/Validation';
	import { env } from '$env/dynamic/public';

	//todo: add non-gateway image resolver for alchemy fetch
	//todo: type declaration of data

	export let data: any;
	export let viewport: Element;
	export let contents: Element;

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
	let link_0: string = data.user.links != null ? data.user.links[0] : '';
	let link_1: string = data.user.links != null ? data.user.links[1] : '';
	let link_2: string = data.user.links != null ? data.user.links[2] : '';
	let image_url: string = data.user.image_url;
	let file_component: HTMLInputElement;
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
	let dms_open: boolean = data.user.dms_open;
	let fetching_image = true;
	let infobox_show: boolean = false;
	let infobox_previous_content: string;
	let upload_url: Response;
	let ens_name: string;
	let show_ens: boolean = data.user.show_ens;
	let ens_loading: boolean = false;
	let file_url: string = data.user.image_url;
	let local_file_url: string = data.user.image_url;
	let username_input_element: HTMLInputElement;
	let username_input_length: number = 0;
	let username_input_limit = 50;
	let title_input_element: HTMLInputElement;
	let title_input_length: number = 0;
	let title_input_limit = 50;
	let bio_limit = 2000;
	let infobox_marginleft = '532px';
	let feedHeight = 0;
	let content: string;
	let total_chars = 0;

	onMount(async () => {
		changes_made.set(false);
		await getNft();
		getWatchlist();
		getFavorites();
		updateInputLengths();
	});

	$: if (browser) {
		feedHeight = window.innerHeight - 96;
	}
	$: if ($userConnected && show_ens) {
		setEnsName();
	}
	$: if (fetching_image) {
		nft_image = placeholder_image;
	}
	$: if (
		username != data.user.username ||
		title != data.user.title ||
		email != data.user.email ||
		nft_id != data.user.nft_id ||
		nft_address != data.user.nft_address ||
		link_0 != (data.user.links ? data.user.links[0] : '') ||
		link_1 != (data.user.links ? data.user.links[1] : '') ||
		link_2 != (data.user.links ? data.user.links[2] : '') ||
		bio != data.user.bio ||
		image_url != data.user.image_url ||
		show_nft != data.user.show_nft ||
		show_ens != data.user.show_ens ||
		dms_open != data.user.dms_open
	) {
		changes_made.set(true);
	} else {
		changes_made.set(false);
	}

	const setEnsName = async () => {
		ens_loading = true;
		let res = await fetch(`${base}/api/ens/${$userAddress}`);
		let ens = await res.text();
		if (ens != 'error') {
			ens_name = ens;
		} else {
			show_ens = false;
		}
		ens_loading = false;
	};
	const blink = tweened(1, {
		duration: 100
	});
	const toggle = (tab: string) => {
		chosenTab = tab;
	};
	const getNft = async () => {
		fetching_image = true;
		infobox_show = false;
		let fetching_address = nft_address;
		let fetching_id = nft_id;
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
		if (fetching_address != nft_address || fetching_id != nft_id) {
			await getNft();
		}
	};
	// todo: get distance values dynamically
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
					infobox_distance: 64,
					infobox_content: 'your title will be used to identify you on the platform.'
				};
				break;
			case 'email':
				inputSettings = {
					title: 'email',
					infobox_distance: 104,
					infobox_content:
						'your email is only visible to you and will only be used to protocol level notifications.'
				};
				break;
			case 'nft_address':
				inputSettings = {
					title: 'nft_address',
					infobox_distance: 144,
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
				inputSettings.infobox_distance = 184;
				break;
			case 'image':
				inputSettings = {
					title: 'image',
					infobox_distance: 190,
					infobox_content: 'your image should be square and less than 5mb.'
				};
		}
	};
	const deFocusInput = () => {
		infobox_show = false;
	};
	//todo: update spaces cors policy with domain
	const uploadProfileImage = async (e: any) => {
		const file = e.target.files[0]!;
		if (file == null) return;
		const reader = new FileReader();
		reader.onload = function () {
			if (reader.result && typeof reader.result == 'string') image_url = reader.result;
		};
		reader.readAsDataURL(file);

		const res = await fetch(`/api/upload-url/${e.target.files[0].name}`);
		file_url = e.target.files[0].name;
		upload_url = res;
	};
	const submitProfile = async () => {
		submitting.set(true);
		let cloud_url =
			file_component.files && file_component.files[0]
				? env.PUBLIC_IMAGEKIT_URL + '/' + $userAddress + '/profile/' + file_component.files[0].name
				: '';
		const input: ProfileInput = {
			username: username,
			show_ens: show_ens,
			ens_name: ens_name,
			title: title,
			email: email,
			bio: content,
			image_url: cloud_url,
			file_url: file_url,
			nft_address: nft_address,
			nft_id: nft_id.toString(),
			show_nft: show_nft,
			dms_open: dms_open,
			timezone: 'UTC+3',
			links: [link_0, link_1, link_2]
		};
		let parsed = ProfileInput.safeParse(input);
		if (!parsed.success) {
			for (let i = 0; i < parsed.error.errors.length; i++) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>${parsed.error.errors[i].path}: </span>${parsed.error.errors[i].message}</p>`
				);
			}
			return;
		}
		if (show_nft && !is_owner) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>Error: </span>You're not the nft owner</p>`
			);
			return;
		}

		if (file_component.files && file_component.files.length > 0) {
			const file = file_component.files[0];
			const { url, fields } = await upload_url.json();
			const formData = new FormData();
			Object.entries({ ...fields, file }).forEach(([key, value]) => {
				formData.append(key, value as string);
			});
			const upload = await fetch(url, {
				method: 'POST',
				body: formData
			});
			if (upload.ok) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Uploaded file</p>`
				);
			} else {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>Upload failed</p>`
				);
				return;
			}
		}
		const url = `${base}/api/profile_update`;
		let response = await fetch(url, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(input)
		});
		if (response.ok) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Profile updated</p>`
			);
		} else {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${response.status}</p>`
			);
		}
		submitting.set(false);
	};
	const updateInputLengths = () => {
		username_input_length = !show_ens
			? username_input_element?.value.length ?? data.user.username.length
			: data.user.username.length;

		title_input_length = title_input_element?.value.length ?? data.user.title.length;
	};
	const handleContentInput = (e: any) => {
		content = JSON.stringify(e.detail.content);
		total_chars = parseContent(content).length;
	};
</script>

<svelte:head>
	<title>HW | Profile</title>
	<meta name="description" content="HonestWork Profile Page" />
</svelte:head>

<main class="wrapper">
	<div
		bind:this={viewport}
		class="viewport"
		style={`width:100%; height:${feedHeight.toString() + 'px'}`}
	>
		<div bind:this={contents} class="contents">
			<div style="height:16px" />
			{#if $userAddress.toLowerCase() == data.user.address.toLowerCase() && $userState > 0}
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
							class={`tab link semibold ${chosenTab == 'watchlist' ? 'yellow' : 'light-60'}`}
							on:click={() => toggle('watchlist')}
							on:keydown
						>
							watchlist
						</p>
						<p
							class={`tab link semibold ${chosenTab == 'favorites' ? 'yellow' : 'light-60'}`}
							on:click={() => toggle('favorites')}
							on:keydown
						>
							favorites
						</p>
						<p
							class={`tab link semibold ${chosenTab == 'applications' ? 'yellow' : 'light-60'}`}
							on:click={() => toggle('applications')}
							on:keydown
						>
							applications
						</p>
					</div>
				</section>
				<div style="height: 16px" />
				{#if chosenTab == 'profile'}
					<div class="save-changes">
						<a href={`${base}/creator/${$userAddress}`} class="external-page">
							<p class="yellow">view creator page</p>
							<div style="width:4px" />
							<img src={`${assets}/icons/external.svg`} alt="Creator Page" />
						</a>
						<div class="external-page">
							{#if $submitting}
								<img
									src={`${assets}/icons/loader.svg`}
									alt="loading"
									class="rotating"
									style="height:16px;width:16px;"
								/>
								<div style="width:4px;" />
							{/if}
							<div style="width:4px" />
							<p
								on:click={submitProfile}
								on:keydown
								class={`semibold link ${$changes_made ? 'yellow' : 'light-60'}`}
							>
								save changes
							</p>
						</div>
					</div>
					<form method="POST" on:submit|preventDefault={submitProfile} action="?/profile">
						<input hidden name="ens_name" bind:value={ens_name} />
						<input hidden name="bio" bind:value={content} />

						<div style="height: 16px" />
						<section
							class="infobox"
							style={`margin-top:${inputSettings.infobox_distance}px; opacity:${
								infobox_show ? '1' : '0'
							}; margin-left:${infobox_marginleft}`}
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
							<div class="left-section">
								<section>
									<img
										src={show_nft
											? nft_image
											: file_url == data.user.image_url
											? file_url + '?tr=h-188,w-188'
											: image_url}
										alt="Profile"
										placeholder={placeholder_image}
									/>
								</section>
								<div class="input-field file-input-container">
									<input
										name="file_url"
										class="file-input"
										type="file"
										accept="image/png, image/jpeg"
										on:change={uploadProfileImage}
										bind:value={local_file_url}
										bind:this={file_component}
										on:mouseover={() => {
											focusInput('image');
											infobox_marginleft = '-252px';
										}}
										on:focus
										on:mouseleave={() => {
											deFocusInput();
											infobox_marginleft = '532px';
										}}
									/>
									<div class="pseudo-file-input-container">
										<p class="pseudo-file-input">UPLOAD FILE</p>
									</div>
								</div>
								<div
									class="input-field file-input-container nft-checkbox"
									on:click={() => (show_nft = !show_nft)}
									on:keydown
									style="cursor:pointer; padding:8px;"
								>
									<div style="display:flex;flex-direction:row;">
										<input hidden type="checkbox" name="show_nft" bind:checked={show_nft} />
										{#if show_nft}
											<img src="icons/checked.svg" alt="Checked" style="height:16px;width:16px;" />
											<div style="width:8px" />
											<p class="yellow">use nft image</p>
										{:else}
											<img
												src={`${assets}/icons/unchecked.svg`}
												alt="Checked"
												style="height:16px;width:16px;"
											/>
											<div style="width:8px" />
											<p class="light-60">use nft image</p>
										{/if}
									</div>
								</div>
							</div>

							<div style="width: 12px" />
							<div class="input-fields">
								<div class="input-field">
									<div class="placeholder">
										<p class="light-40">username</p>
									</div>
									{#if show_ens}
										{#if ens_loading}
											<div class="input-like">
												<img
													src={`${assets}/icons/loader.svg`}
													alt="loading"
													class="rotating"
													style="height:16px;width:16px;"
												/>
												<div style="width:4px" />
												<p>loading ens...</p>
											</div>
										{:else}
											<div class="input-like">
												{ens_name}
											</div>
										{/if}
									{/if}
									<input
										name="username"
										class="flex-input"
										type="text"
										hidden={show_ens}
										placeholder={data.user.username}
										maxlength={username_input_limit}
										bind:value={username}
										bind:this={username_input_element}
										on:focus={() => focusInput('username')}
										on:focusout={() => deFocusInput()}
										on:keyup={updateInputLengths}
									/>
									{#if !show_ens}
										<div style="width:8px" />
										<div class="limit">
											<p class="light-60">
												<span class="yellow">{username_input_length}</span>/{username_input_limit}
											</p>
										</div>
									{/if}
								</div>
								<div style="height: 8px" />
								<div
									class="input-field"
									on:click={() => (show_ens = !show_ens)}
									on:keydown
									style="cursor:pointer;"
								>
									<input hidden type="checkbox" name="show_ens" bind:checked={show_ens} />
									<img
										src={show_ens ? `${assets}/icons/checked.svg` : `${assets}/icons/unchecked.svg`}
										alt="Checked"
										style="height:16px;width:16px;"
									/>
									<div style="width:4px" />
									<p class={show_ens ? 'yellow' : 'light-60'}>use ens name</p>
								</div>
								<div style="height: 12px" />
								<div class="input-field">
									<div class="placeholder">
										<p class="light-40">title</p>
									</div>
									<input
										name="title"
										class="flex-input"
										type="text"
										placeholder={data.user.title}
										maxlength={title_input_limit}
										bind:value={title}
										bind:this={title_input_element}
										on:focus={() => focusInput('title')}
										on:focusout={() => deFocusInput()}
										on:keyup={updateInputLengths}
									/>
									<div style="width:8px" />
									<div class="limit">
										<p class="light-60">
											<span class="yellow">{title_input_length}</span>/{title_input_limit}
										</p>
									</div>
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
								<div style="height:12px" />
								<div
									class="input-field"
									on:click={() => (dms_open = !dms_open)}
									on:keydown
									style="cursor:pointer;"
								>
									<input hidden type="checkbox" name="dms_open" bind:checked={dms_open} />
									<img
										src={dms_open ? `${assets}/icons/checked.svg` : `${assets}/icons/unchecked.svg`}
										alt="Checked"
										style="height:16px;width:16px;"
									/>
									<div style="width:4px" />
									<p class={dms_open ? 'yellow' : 'light-60'}>receive private messages</p>
								</div>
								<div style="height:8px" />
							</div>
						</div>
						<div style="height: 16px" />
						<div class="links">
							<div class="input-field">
								<div class="placeholder">
									<p class="light-40">link</p>
								</div>
								<input
									name={`link-0`}
									class="flex-input"
									type="text"
									placeholder={link_0}
									bind:value={link_0}
								/>
							</div>
							<div style="height: 8px" />
							<div class="input-field">
								<div class="placeholder">
									<p class="light-40">link</p>
								</div>
								<input
									name={`link-1`}
									class="flex-input"
									type="text"
									placeholder={link_1}
									bind:value={link_1}
								/>
							</div>
							<div style="height: 8px" />
							<div class="input-field">
								<div class="placeholder">
									<p class="light-40">link</p>
								</div>
								<input
									name={`link-2`}
									class="flex-input"
									type="text"
									placeholder={link_2}
									bind:value={link_2}
								/>
							</div>
						</div>
						<div style="height: 16px" />
						<div class="description-bar">
							<section class="description-title"><p class="light-40">bio</p></section>
							<p class="chars light-60"><span class="yellow">{total_chars}</span>/{bio_limit}</p>
						</div>
						<div class="bio">
							<Tiptap
								on:content={handleContentInput}
								content={data.user.bio != '' ? JSON.parse(data.user.bio) : ''}
							/>
						</div>
					</form>
				{:else if chosenTab == 'skills'}
					<Skills {data} />
				{:else if chosenTab == 'watchlist'}
					<Watchlist />
				{:else if chosenTab == 'favorites'}
					<Favorites />
				{:else if chosenTab == 'applications'}
					<Applications user={data.user} />
				{/if}
			{:else if $userConnected && $userAddress.toLowerCase() != data.user.address.toLowerCase()}
				<div style="height: 16px" />
				<section style="display:flex; flex-direction:column;">
					<div class="gm">
						<p>
							switch to <span class="light-60"
								>{data.user.address.substring(0, 6) +
									'...' +
									data.user.address.substring(data.user.address.length - 4)}</span
							> to see this page.
						</p>
					</div>
					<div class="gm link" on:click={() => goto(`${base}/auth`)} on:keydown>
						<p>
							or login with <span
								>{$userAddress.substring(0, 6) +
									'...' +
									$userAddress.substring($userAddress.length - 4)}</span
							>
						</p>
					</div>
				</section>
			{:else}
				<div class="loader-container">
					<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
				</div>
			{/if}
			<div style="height: 64px" />
		</div>
	</div>
	<Svrollbar {viewport} {contents} />
</main>

<style>
	.bio {
		width: 100%;
		height: 100%;
	}
	img {
		width: 188px;
		height: 188px;
	}
	.input-fields {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 1;
	}
	.input-field {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		position: relative;
		background-color: var(--color-dark);
		align-items: center;
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
		background: var(--color-light-2);
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
		background-color: var(--color-dark);
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
		width: 188px;
		height: 32px;
		cursor: pointer;
	}
	.file-input-container {
		position: relative;
		border-width: 0px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		cursor: pointer;
	}

	.pseudo-file-input {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
	.input-like {
		background-color: var(--color-dark);
		font-family: 'Proto Mono', monospace;
		color: var(--color-light);
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		font-size: 13px;
		line-height: 16px;
		box-sizing: border-box;
		flex: 1;
		height: 32px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.limit {
		position: relative;
	}
	.description-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 13px;
		line-height: 16px;
		align-items: center;
	}
	.description-title {
		padding: 8px;
		border-width: 1px 1px 0px 1px;
	}
	.nft-checkbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.save-changes {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}

	.contents {
		width: 520px;
	}

	.loader-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.external-page {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.external-page img {
		height: 16px;
		width: 16px;
	}
</style>
