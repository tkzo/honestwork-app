<script lang="ts">
	import type { SkillType, UserType } from '$lib/stores/Types';
	import { Svrollbar } from 'svrollbar';
	import Skeleton from '$lib/components/common/Skeleton.svelte';
	import { nodeProvider } from '$lib/stores/Network';
	import { browser } from '$app/environment';
	import { base, assets } from '$app/paths';
	import { placeholder_image } from '$lib/stores/Constants';
	import Tiptap from '$lib/components/common/Tiptap.svelte';

	export let skill: SkillType;

	let viewport: Element;
	let contents: Element;

	let user: UserType;
	let chosen_image: number = 0;
	let nft_image: any;
	let ens_name: string;
	let feedHeight = 0;

	$: if (browser) feedHeight = window.innerHeight - 154;
	$: if (skill && browser) {
		nft_image = '';
		resetState();
		fetchUser();
	}
	$: trimmed_images = skill.image_urls.filter((url: string) => url !== '');

	const fetchUser = async () => {
		const res = await fetch(`${base}/api/user/${skill.user_address}`);
		user = await res.json();
		ens_name = user.ens_name ?? (await $nodeProvider.lookupAddress(skill.user_address));
		await getNft();
	};
	const nextImage = () => {
		if (chosen_image < trimmed_images.length - 1) {
			chosen_image++;
		}
	};
	const previousImage = () => {
		if (chosen_image > 0) {
			chosen_image--;
		}
	};
	const resetState = () => {
		chosen_image = 0;
		ens_name = '';
		nft_image = '';
	};
	const getNft = async () => {
		if (user.nft_address && user.nft_id) {
			try {
				const response = await fetch(`${base}/api/alchemy/${user.nft_address}/${user.nft_id}`);
				if (response.ok) {
					const data = await response.json();
					nft_image = data.image;
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
</script>

<main>
	<a
		class="profile-bar"
		href={`${base}/creator/${skill.user_address}`}
		target="_blank"
		rel="noreferrer"
	>
		<div class="left-section">
			<img
				class="pfp"
				src={user?.show_nft
					? nft_image && nft_image != ''
						? nft_image
						: placeholder_image
					: user?.image_url && user.image_url != ''
					? user.image_url
					: placeholder_image}
				alt=""
			/>
			<div style="width:8px;" />
			{#if user?.show_ens && ens_name && ens_name != ''}
				<p class="yellow">{ens_name}</p>
			{:else if user?.username && user.username != ''}
				<p class="yellow">{user?.username}</p>
			{:else}
				<Skeleton width="100px" height="20px" />
			{/if}
			<div style="width:8px;" />
			<p class="light-60">{user?.title}</p>
		</div>
		<img src={`${assets}/icons/external.svg`} alt="External Link" style="margin-right:8px;" />
	</a>
	<div class="wrapper">
		<div bind:this={viewport} class="viewport" style={`height:${feedHeight.toString() + 'px'}`}>
			<div bind:this={contents} class="contents">
				<div class="gallery">
					<img class="gallery-images" src={trimmed_images[chosen_image]} alt="Gallery" />
					<div class="gallery-buttons">
						<div class="left-gallery-button" on:click={previousImage} on:keydown>
							<p class="light-40">PREVIOUS</p>
						</div>
						<p>{chosen_image + 1}/{trimmed_images.length}</p>
						<div class="right-gallery-button" on:click={nextImage} on:keydown>
							<p class="light-40">NEXT</p>
						</div>
					</div>
				</div>
				<div style="height:12px;" />
				<Tiptap content={JSON.parse(skill.description)} editable={false} />
				<div style="height:12px;" />
				<div class="links">
					{#each skill.links.filter((n) => n != '') as link}
						<div class="link-container">
							<p class="placeholder light-40">link</p>
							<div style="width:8px;" />
							<a href={link}>
								<p class="light-80">{link}</p>
							</a>
						</div>
						{#if link !== skill.links[skill.links.length - 1]}
							<div style="height:8px;" />
						{/if}
					{/each}
				</div>
				<div style="height:32px;" />
			</div>
		</div>
		<Svrollbar alwaysVisible {viewport} {contents} />
	</div>
</main>

<style>
	main {
		width: 520px;
		display: flex;
		flex-direction: column;
	}
	.profile-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-width: 1px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		cursor: pointer;
	}
	.profile-bar:hover {
		background-color: var(--color-light-2);
	}
	.left-section {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.pfp {
		width: 40px;
		height: 40px;
	}
	.gallery {
		width: 518px;
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		display: flex;
		flex-direction: column;
	}
	.gallery-images {
		width: 100%;
		height: 388px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.gallery-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.left-gallery-button {
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 8px 12px;
	}
	.right-gallery-button {
		border-width: 0px 0px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 8px 12px;
	}
	.right-gallery-button:hover {
		background-color: var(--color-primary);
	}
	.right-gallery-button:hover p {
		color: var(--color-dark);
	}
	.link-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.placeholder {
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
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
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
</style>
