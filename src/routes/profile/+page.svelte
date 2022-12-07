<script lang="ts">
	import Skill from '$lib/components/cards/Skill.svelte';
	import type { PageServerData } from '../$types';

	// todo: type declaration
	export let data: any;
	let myform: HTMLFormElement;
	let chosenTab = 'profile';
	const toggle = (tab: string) => {
		chosenTab = tab;
	};

	let username: string = data.user.username;
	let title: string = data.user.title;
	let email: string = data.user.email;
	let nft_id: number = data.user.nft_id;
	let nft_address: string = data.user.nft_address;
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="HonestWork Profile Page" />
</svelte:head>

<main>
	<form method="POST" bind:this={myform}>
		<div style="height: 12px" />
		<section class="bar">
			<div class="tabs">
				<p
					class={`tab link ${chosenTab == 'profile' ? 'yellow' : ''}`}
					on:click={() => toggle('profile')}
					on:keydown
				>
					profile
				</p>
				<p
					class={`tab link ${chosenTab == 'skills' ? 'yellow' : ''}`}
					on:click={() => toggle('skills')}
					on:keydown
				>
					skills
				</p>
				<p
					class={`tab link ${chosenTab == 'jobs' ? 'yellow' : ''}`}
					on:click={() => toggle('jobs')}
					on:keydown
				>
					jobs
				</p>
			</div>
			<p class="yellow semibold link">save changes</p>
		</section>
		<div style="height: 12px" />

		{#if chosenTab == 'profile'}
			<div class="info">
				<section>
					<img src={data.user.image_url} alt="Profile" />
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
						/>
					</div>
					<div style="height: 8px" />
					<div class="input-field">
						<div class="placeholder">
							<p class="light-40">nft id</p>
						</div>
						<input
							class="flex-input"
							type="number"
							bind:value={nft_id}
							placeholder={data.user.nft_id}
						/>
					</div>
				</div>
			</div>
			<div style="height: 16px" />
			<div class="links">
				{#each data.user.links as link, i}
					<div class="input-field">
						<div class="placeholder">
							<p class="light-40">link</p>
						</div>
						<input class="flex-input" type="text" placeholder={link} />
					</div>
					{#if i < data.user.links.length - 1}
						<div style="height: 8px" />
					{/if}
				{/each}
			</div>
			<div style="height: 16px" />
			<div class="bio">
				<textarea rows="17" size="520" bind:value={data.user.bio} />
			</div>
		{:else if chosenTab == 'skills'}
			{#each data.user.skills as skill, i}
				<Skill
					slot={skill.slot}
					title={skill.title}
					description={skill.description}
					image_urls={skill.image_urls}
					minimum_price={skill.minimum_price}
				/>
				{#if i < data.user.skills.length - 1}
					<div style="height: 12px" />
				{/if}
			{/each}
		{/if}
	</form>
</main>

<style>
	textarea {
		width: 100%;
	}
	img {
		width: 188px;
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
		border-color: rgba(255, 255, 255, 0.2);
		box-sizing: border-box;
	}
	.flex-input {
		height: 32px;
		flex: 1;
	}
</style>
