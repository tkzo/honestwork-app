<script lang="ts">
	import type { SkillType, UserType } from '$lib/types/Types';
	import { onMount } from 'svelte';

	export let skill: SkillType;

	let user: UserType;
	let chosen_image: number = 0;

	// onMount(async () => {
	// 	await fetchUser();
	// 	user = user;
	// });

	$: if (skill) {
		fetchUser();
		// user = user;
		// console.log('User: ', user);
	}

	const fetchUser = async () => {
		const res = await fetch(`/api/user/${skill.user_address}`);
		user = await res.json();
	};
</script>

<main>
	<div class="profile-bar">
		<div class="left-section">
			<img class="pfp" src={user?.image_url} alt="" />
			<div style="width:8px;" />
			<p class="yellow">{user?.username}</p>
			<div style="width:8px;" />
			<p class="light-60">{user?.title}</p>
		</div>
		<img src="icons/external.svg" alt="External Link" style="margin-right:8px;" />
	</div>
	<div class="gallery">
		<img class="gallery-images" src={skill.image_urls[chosen_image]} alt="Gallery" />
		<div class="gallery-buttons">
			<div class="left-gallery-button">
				<p class="light-40">PREVIOUS</p>
			</div>
			<p>1/10</p>
			<div class="right-gallery-button">
				<p class="light-40">NEXT</p>
			</div>
		</div>
	</div>
	<div style="height:12px;" />
	<div class="description">
		<div class="body-text">
			{skill.description}
		</div>
	</div>
	<div style="height:12px;" />
	<div class="links">
		{#each skill.links as link}
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
	.description {
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 12px;
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
</style>
