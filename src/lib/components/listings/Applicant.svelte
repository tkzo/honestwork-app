<script lang="ts">
	import type { ApplicantType, UserType } from '$lib/stores/Types';
	import { userConnected, connectNode, nodeProvider, userAddress } from '$lib/stores/Network';
	import { placeholder_image } from '$lib/stores/Constants';
	import { slide } from 'svelte/transition';
	import { elasticOut, cubicOut, expoOut } from 'svelte/easing';

	export let applicant: ApplicantType;

	let user: UserType;

	$: if ($userConnected) {
		setup();
		console.log('hello');
	}

	const setup = async () => {
		await fetchUser();
		setEnsName();
		getNft();
	};

	let fetching_image = false;
	let ens_loading = false;
	let nft_image: string | null = null;
	let ens_name: string | null = null;
	let drawer_open = true;

	const fetchUser = async () => {
		const response = await fetch(`/api/user/${applicant.user_address}`);
		user = await response.json();
	};
	const getNft = async () => {
		fetching_image = true;
		if (user.nft_address && user.nft_id) {
			try {
				const response = await fetch(`api/alchemy/${user.nft_address}/${user.nft_id}`);
				if (response.ok) {
					const data = await response.json();
					nft_image = data.image;
				}
			} catch (err) {
				console.log(err);
			}
		}
		fetching_image = false;
	};
	const setEnsName = async () => {
		ens_loading = true;
		await connectNode();
		ens_name = await $nodeProvider.lookupAddress($userAddress);
		ens_loading = false;
	};
</script>

<main>
	{#if user && user != null}
		<div class="profile-bar">
			<div class="left-section">
				<section>
					<img
						class="pfp"
						src={user.show_nft && nft_image != null
							? nft_image
							: user.image_url ?? placeholder_image}
						alt="Profile"
						placeholder={placeholder_image}
					/>
				</section>
				<div style="width:8px;" />
				<div class="info">
					{#if user.show_ens}
						{#if ens_loading}
							<div class="ens-loader">
								<img
									src="icons/loader.svg"
									alt="loading"
									class="rotating"
									style="height:16px;width:16px;"
								/>
								<div style="width:4px" />
								<p>loading ens...</p>
							</div>
						{:else}
							<p>{ens_name}</p>
						{/if}
					{/if}
					<div style="height:4px;" />
					<p class="yellow">{user.title}</p>
					<div style="height:4px;" />
					<p>4.8<span class="light-60">(377 votes)</span></p>
				</div>
			</div>
			<div class="right-section">
				<div class="button">
					<p class="yellow">send message</p>
				</div>
				<div style="height:8px" />
				<div class="button">
					<p class="light-60">go to profile</p>
				</div>
			</div>
		</div>
		{#if drawer_open}
			<div class="drawer_container" transition:slide={{ duration: 500, easing: expoOut }}>
				<div class="bio">
					<div class="body-text light-80">{user?.bio}</div>
				</div>
				{#each user.links as link, i}
					<a class="item" href={link} target="_blank" rel="noreferrer">
						<p>link #{i + 1} <span class="light-60">{link}</span></p>
						<img src="icons/external.svg" alt="link" />
					</a>
				{/each}
			</div>
		{/if}
		<div class="drawer" on:click={() => (drawer_open = !drawer_open)} on:keydown>
			{#if drawer_open}
				<p class="light-60">hide applicant info</p>
				<div style="width:4px" />
				<img src="icons/corner-right-up_passive.svg" alt="drawer" />
			{:else}
				<img src="icons/corner-left-down_active.svg" alt="drawer" />
				<div style="width:4px" />
				<p class="light-60">show applicant info</p>
			{/if}
		</div>
	{/if}
</main>

<style>
	main {
		width: 100%;
	}
	.profile-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		cursor: pointer;
		padding: 12px;
	}
	.left-section {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
	.pfp {
		width: 60px;
		height: 60px;
	}
	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.ens-loader {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 4px 8px;
		cursor: pointer;
	}
	.button:hover {
		background-color: var(--color-primary);
	}
	.button:hover p {
		color: var(--color-dark);
	}
	.drawer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		cursor: pointer;
		padding: 8px;
		background-color: var(--color-light-2);
	}
	.bio {
		padding: 12px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.item {
		padding: 8px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.item:hover {
		background-color: var(--color-light-2);
	}
</style>
