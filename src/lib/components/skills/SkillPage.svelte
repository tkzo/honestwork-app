<script lang="ts">
	import type { SkillType, User } from '$lib/stores/Types';
	import { Svrollbar } from 'svrollbar';
	import Skeleton from '$lib/components/common/Skeleton.svelte';
	import { browser } from '$app/environment';
	import { base, assets } from '$app/paths';
	import { placeholder_image } from '$lib/stores/Constants';
	import Tiptap from '$lib/components/common/Tiptap.svelte';

	export let skill: SkillType;

	let image_component: HTMLImageElement;
	let loading_gallery_image = true;
	let viewport: Element;
	let contents: Element;
	let user: User;
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
	$: trimmed_images = skill.imageurls.filter((url: string) => url !== '');
	$: if (image_component?.complete) loading_gallery_image = false;
	$: username_trimmed =
		user?.username.length > 16 ? user?.username.slice(0, 16) + '...' : user?.username;

	const fetchUser = async () => {
		const res = await fetch(`${base}/api/user/${skill.useraddress}`);
		user = await res.json();
		ens_name = user.showens ? user.ensname : user.username;
		await getNft();
	};
	const nextImage = () => {
		if (trimmed_images.length > 1) {
			loading_gallery_image = true;
			if (chosen_image < trimmed_images.length - 1) {
				chosen_image++;
			} else {
				chosen_image = 0;
			}
		}
	};
	const previousImage = () => {
		if (trimmed_images.length > 1) {
			loading_gallery_image = true;
			if (chosen_image > 0) {
				chosen_image--;
			} else {
				chosen_image = trimmed_images.length - 1;
			}
		}
	};
	const resetState = () => {
		chosen_image = 0;
		ens_name = '';
		nft_image = '';
	};
	const getNft = async () => {
		if (user.nftaddress && user.nftid) {
			try {
				const response = await fetch(`${base}/api/alchemy/${user.nftaddress}/${user.nftid}`);
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
	<a class="profile-bar" href={`${base}/creator/${skill.useraddress}`}>
		<div class="left-section">
			<img
				class="pfp"
				src={user?.shownft
					? nft_image && nft_image != ''
						? nft_image
						: placeholder_image
					: user?.imageurl && user.imageurl != ''
					? user.imageurl + '?tr=h-80,w-80'
					: placeholder_image}
				alt=""
			/>
			<div style="width:8px;" />
			{#if user?.showens && ens_name && ens_name != ''}
				<p class="yellow">{ens_name}</p>
			{:else if user?.username && user.username != ''}
				<p class="yellow">{username_trimmed}</p>
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
					{#key trimmed_images[chosen_image]}
						<img
							class="gallery-images"
							src={trimmed_images[chosen_image] + '?tr=h-776,w-1036'}
							alt="Gallery"
							bind:this={image_component}
							on:load={() => {
								loading_gallery_image = false;
							}}
						/>
					{/key}
					{#if loading_gallery_image}
						<div class="skeleton-container">
							<Skeleton width="518px" height="389px" />
						</div>
					{/if}
					<div class="gallery-buttons">
						<div class="left-gallery-button link" on:click={previousImage} on:keydown>
							<p class="light-60">PREVIOUS</p>
						</div>
						<p class="light-60">
							<span class="yellow">{chosen_image + 1}</span>/{trimmed_images.length}
						</p>
						<div class="right-gallery-button link" on:click={nextImage} on:keydown>
							<p class="light-60">NEXT</p>
						</div>
					</div>
				</div>
				<div style="height:12px;" />
				{#key skill.description}
					<Tiptap content={JSON.parse(skill.description)} editable={false} />
				{/key}
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
	.right-gallery-button:hover p {
		color: var(--color-dark);
	}
	.left-gallery-button:hover p {
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
	.skeleton-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
