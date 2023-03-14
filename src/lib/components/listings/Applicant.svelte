<script lang="ts">
	import type { ApplicantType, UserType } from '$lib/stores/Types';
	import { userConnected } from '$lib/stores/Network';
	import { placeholder_image } from '$lib/stores/Constants';
	import { base, assets } from '$app/paths';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import { new_conversation_metadata } from '$lib/stores/State';
	import { browser } from '$app/environment';
	import Tiptap from '$lib/components/common/Tiptap.svelte';

	export let applicant: ApplicantType;

	let user: UserType;

	$: if ($userConnected) {
		setup();
	}

	const setup = async () => {
		await fetchUser();
		if (user.show_nft) getNft();
	};

	let nft_image: string | null = null;
	let drawer_open = false;

	const fetchUser = async () => {
		const response = await fetch(`/api/user/${applicant.user_address}`);
		user = await response.json();
	};
	const getNft = async () => {
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
	};
	const getRating = async () => {
		if (browser) {
			try {
				const url = `${base}/api/rating/${applicant.user_address}`;
				const response = await fetch(url);
				const data = await response.json();
				return data;
			} catch (e) {
				console.log(e);
			}
		}
	};
	const handleNewConversation = async () => {
		try {
			const url = `${base}/api/conversation_add/${applicant.user_address}`;
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: applicant.job_id
				})
			});
			const data = await response.json();
			if (data == 'success') {
				new_conversation_metadata.set({
					address: applicant.user_address,
					title: applicant.job_id
				});
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Created new conversation</p>`
				);
				goto('/messages');
			} else {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${data}</p>`
				);
			}
		} catch (err: any) {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>${err.Error()}</p>`
			);
		}
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
							: user.image_url != ''
							? user.image_url + "?tr=h-120,w-120"
							: placeholder_image}
						alt="Profile"
						placeholder={placeholder_image}
					/>
				</section>
				<div style="width:8px;" />
				<div class="info">
					{#if user.show_ens}
						<p>{user.ens_name}</p>
					{:else}
						<p>{user.username}</p>
					{/if}
					<div style="height:4px;" />
					<p class="yellow">{user.title}</p>
					<div style="height:4px;" />
					{#await getRating()}
						<img
							src={`${assets}/icons/loader.svg`}
							alt="loading"
							class="rotating"
							style="height:16px;width:16px;"
						/>
					{:then rating}
						<p><span class="light-60">rating:</span>{rating}/10</p>
					{/await}
				</div>
			</div>
			<div class="right-section">
				<div class="button" on:click={handleNewConversation} on:keydown>
					<p class="yellow">send message</p>
				</div>
				<div style="height:8px" />
				<a class="button" href={`${base}/creator/${applicant.user_address}`}>
					<p class="light-60">go to profile</p>
				</a>
			</div>
		</div>
		{#if drawer_open}
			<div class="drawer_container">
				<div class="bio">
					<div class="body-text light-80">
						<Tiptap content={JSON.parse(applicant.cover_letter)} editable={false} />
					</div>
				</div>
				{#each user.links as link, i}
					<a class="item" href={link} target="_blank" rel="noreferrer">
						<p>link #{i + 1} <span class="light-60">{link}</span></p>
						<img src={`${assets}/icons/external.svg`} alt="link" />
					</a>
				{/each}
			</div>
		{/if}
		<div class="drawer" on:click={() => (drawer_open = !drawer_open)} on:keydown>
			{#if drawer_open}
				<p class="light-60">hide applicant info</p>
				<div style="width:4px" />
				<img src={`${assets}/icons/corner-right-up_passive.svg`} alt="drawer" />
			{:else}
				<img src={`${assets}/icons/corner-left-down_active.svg`} alt="drawer" />
				<div style="width:4px" />
				<p class="light-60">show applicant info</p>
			{/if}
		</div>
	{/if}
</main>

<style>
	main {
		width: 518px;
	}
	.profile-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
		cursor: pointer;
		padding: 8px;
		background-color: var(--color-light-2);
	}
	.bio {
		padding: 12px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.item {
		padding: 8px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
