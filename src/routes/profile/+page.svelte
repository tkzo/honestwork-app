<script lang="ts">
	import type { PageServerData } from '../$types';
	export let data: PageServerData;
	let myform: HTMLFormElement;
	let chosenTab = 'profile'; // 'profile' or 'skills'
	const toggle = (tab: string) => {
		chosenTab = tab;
	};
	let username: string;
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="HonestWork Profile Page" />
</svelte:head>

<main>
	<!-- username {data.username}
	show_ens {data.show_ens}
	title {data.title}
	image_url {data.image_url}
	show_nft {data.show_nft}
	nft_address {data.nft_address}
	nft_id {data.nft_id} -->
	<!-- {data.user.username} -->
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
		</div>
		<p class="yellow semibold link">save changes</p>
	</section>
	<div style="height: 12px" />
	<div class="info">
		<section>
			<img src={data.user.image_url} alt="Profile" />
		</section>
		<div style="width: 12px" />
		<div class="placeholder">
			<p class="light-40">username</p>
		</div>
		<input class="username" type="text" bind:value={username} placeholder={data.user.username} />
	</div>
	<div style="height: 12px" />
</main>

<style>
	img {
		width: 188px;
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
	section {
		display: flex;
		background-color: var(--color-dark);
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
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
	.username {
		height: 32px;
		width: 320px;
	}
</style>
