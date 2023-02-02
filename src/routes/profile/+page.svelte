<script lang="ts">
	/// <reference types="aws-sdk" />
	import Skills from '$lib/components/profile/Skills.svelte';
	import {
		userAddress,
		userState,
		nodeProvider,
		connectNode,
		userConnected,
		getFavorites,
		getWatchlist,
		connectIfCached
	} from '$lib/stores/Network';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import {
		chosen_skill_slot,
		skill_add,
		skill_upload_urls,
		changes_made,
		submitting
	} from '$lib/stores/State';
	import { Svrollbar } from 'svrollbar';
	import { browser } from '$app/environment';
	import { assets } from '$app/paths';
	import Watchlist from '$lib/components/profile/Watchlist.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import Favorites from '$lib/components/profile/Favorites.svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import Tiptap from '$lib/components/common/Tiptap.svelte';
	import { parseContent } from '$lib/stores/Parser';

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
	let profileForm: HTMLFormElement;
	let skillsForm: HTMLFormElement;
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
	let file_url: string;
	let username_input_element: HTMLInputElement;
	let username_input_length: number;
	let username_input_limit = 50;
	let title_input_element: HTMLInputElement;
	let title_input_length: number;
	let title_input_limit = 50;
	let bio_element: HTMLTextAreaElement;
	let bio_length: number;
	let bio_limit = 2000;
	let infobox_marginleft = '532px';
	let feedHeight = 0;
	let ens_component: HTMLInputElement;
	let content: string;
	let total_chars = 0;
	let tags: string[] = [];

	onMount(async () => {
		connectIfCached();
		changes_made.set(false);
		await getNft();
		getWatchlist();
		getFavorites();
		//todo: move to layout
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
		await connectNode();
		ens_name = await $nodeProvider.lookupAddress($userAddress);
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
			if (typeof reader.result == 'string') image_url = reader.result;
		};
		reader.readAsDataURL(file);

		const res = await fetch(`/api/upload-url/${e.target.files[0].name}`);
		upload_url = res;
	};
	const submitProfile = async (e: any) => {
		if (e.submitter?.id != 'profile_post') {
			return;
		}
		submitting.set(true);
		//todo: proper handling
		if (show_nft && !is_owner) {
			console.log('Nope.');
		} else {
			let target_file;
			for (let t of e.target) {
				if (t.files) {
					target_file = t;
				}
			}
			if (target_file.files.length != 0) {
				const file = target_file.files[0]!;
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
			profileForm.submit();
		}
	};
	const submitSkills = async (e: any) => {
		if (e.submitter?.id != 'profile_post') {
			return;
		}
		submitting.set(true);
		let counter = 0;
		for await (let t of e.target) {
			if (t.files != null) {
				if (t.files != null && t.files.length > 0) {
					const file = t.files[0]!;
					//@ts-expect-error
					let clone_response = $skill_upload_urls[$chosen_skill_slot][counter].clone();
					const { url, fields } = await clone_response.json();
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
				counter++;
			}
		}
		skillsForm.submit();
	};
	const updateInputLengths = () => {
		username_input_length = !show_ens
			? username_input_element?.value.length ?? data.user.username.length
			: data.user.username.length;

		title_input_length = title_input_element?.value.length ?? data.user.title.length;
		bio_length = bio_element?.value.length ?? data.user.bio.length;
	};
	const handleTagsUpdate = (e: any) => {
		tags = e.detail.tags;
	};
	const handleContentInput = (e: any) => {
		content = e.detail.content;
		total_chars = parseContent(e.detail.content).total_chars;
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
		<div bind:this={contents} class="contents" style={`width:520px;`}>
			{#if $userAddress.toLowerCase() == data.user.address.toLowerCase() && $userState > 0}
				{#if chosenTab == 'profile'}
					<form
						method="POST"
						bind:this={profileForm}
						on:submit|preventDefault={submitProfile}
						action="?/profile"
					>
						<input hidden name="ens_name" bind:value={ens_name} bind:this={ens_component} />
						<input hidden name="bio" bind:value={content} />

						<section class="bar">
							<div class="tabs">
								<p class="tab link semibold yellow">profile</p>
								<p class="tab link semibold light-60" on:click={() => toggle('skills')} on:keydown>
									skills
								</p>
								<p
									class="tab link semibold light-60"
									on:click={() => toggle('watchlist')}
									on:keydown
								>
									watchlist
								</p>
								<p
									class="tab link semibold light-60"
									on:click={() => toggle('favorites')}
									on:keydown
								>
									favorites
								</p>
							</div>

							<div class="save-changes">
								{#if $submitting}
									<img
										src={`${assets}/icons/loader.svg`}
										alt="loading"
										class="rotating"
										style="height:16px;width:16px;"
									/>
									<div style="width:4px;" />
								{/if}
								<button
									id="profile_post"
									class={`semibold link ${$changes_made ? 'yellow' : 'light-60'}`}
									>save changes</button
								>
							</div>
						</section>
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
										src={show_nft ? nft_image : image_url ?? placeholder_image}
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
										bind:value={file_url}
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
									<input hidden type="text" name="image_url" bind:value={image_url} />
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
										<div class="limit">
											<p>
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
									<div class="limit">
										<p><span class="yellow">{title_input_length}</span>/{title_input_limit}</p>
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
							<Tiptap on:content={handleContentInput} content={data.user.bio} />
						</div>
					</form>
				{:else if chosenTab == 'skills'}
					<form
						method="POST"
						bind:this={skillsForm}
						on:submit|preventDefault={submitSkills}
						action="?/skills"
					>
						<input hidden name="tags" value={tags} />

						<input hidden name="skill_method" value={$skill_add ? 'add' : 'edit'} />
						{#if $chosen_skill_slot == -1}
							<section class="bar">
								<div class="tabs">
									<p
										class="tab link semibold light-60"
										on:click={() => toggle('profile')}
										on:keydown
									>
										profile
									</p>
									<p class="tab link semibold yellow">skills</p>
									<p
										class="tab link semibold light-60"
										on:click={() => toggle('watchlist')}
										on:keydown
									>
										watchlist
									</p>
									<p
										class="tab link semibold light-60"
										on:click={() => toggle('favorites')}
										on:keydown
									>
										favorites
									</p>
								</div>
							</section>
						{:else}
							<section class="bar">
								<div class="tabs">
									<p
										class="tab link semibold light-60"
										on:click={() => {
											toggle('skills');
											chosen_skill_slot.set(-1);
										}}
										on:keydown
									>
										back to skills
									</p>
								</div>
								<div class="save-changes">
									{#if $submitting}
										<img
											src={`${assets}/icons/loader.svg`}
											alt="loading"
											class="rotating"
											style="height:16px;width:16px;"
										/>
										<div style="width:4px;" />
									{/if}
									<button
										id="profile_post"
										class={`semibold link ${$changes_made ? 'yellow' : 'light-60'}`}
										>save changes</button
									>
								</div>
							</section>
						{/if}
						<div style="height: 16px" />
						<Skills {data} on:tag_update={handleTagsUpdate} />
					</form>
				{:else if chosenTab == 'watchlist'}
					<section class="bar">
						<div class="tabs">
							<p class="tab link semibold light-60" on:click={() => toggle('profile')} on:keydown>
								profile
							</p>
							<p class="tab link semibold light-60" on:click={() => toggle('skills')} on:keydown>
								skills
							</p>
							<p class="tab link semibold yellow">watchlist</p>
							<p class="tab link semibold light-60" on:click={() => toggle('favorites')} on:keydown>
								favorites
							</p>
						</div>
					</section>
					<div style="height: 16px" />
					<Watchlist />
				{:else if chosenTab == 'favorites'}
					<section class="bar">
						<div class="tabs">
							<p class="tab link semibold light-60" on:click={() => toggle('profile')} on:keydown>
								profile
							</p>
							<p class="tab link semibold light-60" on:click={() => toggle('skills')} on:keydown>
								skills
							</p>
							<p class="tab link semibold light-60" on:click={() => toggle('watchlist')} on:keydown>
								watchlist
							</p>
							<p class="tab link semibold yellow">favorites</p>
						</div>
					</section>
					<div style="height: 16px" />
					<Favorites />
				{/if}
			{:else if $userConnected && $userAddress.toLowerCase() != data.user.address.toLowerCase()}
				<div style="height: 16px" />
				<section style="width:400px; display:flex; flex-direction:column;">
					<div class="gm">
						<div class="gm-inner">
							<p class="yellow">wrong account</p>
						</div>
					</div>
					<div class="gm">
						<p>
							switch to <span class="yellow"
								>{data.user.address.substring(0, 6) +
									'...' +
									data.user.address.substring($userAddress.length - 4)}</span
							> to see this page.
						</p>
					</div>
				</section>
			{:else}
				<Jumper />
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
		/* min-width: 320px; */
		justify-content: flex-start;
		position: relative;
	}
	.placeholder {
		height: 32px;
		display: flex;
		background-color: var(--color-dark);
		border-width: 1px 0px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
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
		border-color: var(--color-light-10);
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
		border-color: var(--color-light-10);
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
		border-color: var(--color-light-10);
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
		border-color: var(--color-light-10);
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
		position: absolute;
		right: 12px;
		transform: translateY(50%);
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
		justify-content: flex-end;
		align-items: center;
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
</style>
