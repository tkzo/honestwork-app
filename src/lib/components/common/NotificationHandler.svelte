<script lang="ts">
	import Notification from '$lib/components/common/Notification.svelte';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/Constants';
	import { goto } from '$app/navigation';

	$: trimmedRoute = $page.route.id?.split('/')[1];
	let relief_on = true;
</script>

{#if $page.route.id == '/'}
	{#if relief_on}
		<a href="https://twitter.com/TurkeyReliefDAO" target="_blank" rel="noreferrer">
			<Notification notification={notifications.relief} cta_class="red" />
		</a>
	{:else}
		<a href="https://twitter.com/HonestWorkDAO" target="_blank" rel="noreferrer"
			><Notification notification={notifications.launch} /></a
		>
	{/if}
{:else if $page.route.id == '/jobs' || $page.route.id == '/skills' || $page.route.id == '/listings'}
	<Notification notification={notifications.postjob} on:click={() => goto('/new_job')} />
	<div style="height:16px;" />
{:else if $page.route.id == '/new_job' || $page.route.id == '/messages' || $page.route.id == '/auth' || trimmedRoute == 'job' || trimmedRoute == 'creator'}
	<Notification notification={notifications.mint} />
	<div style="height:16px;" />
{:else if $page.route.id == '/profile'}
	<Notification notification={notifications.upgrade} />
	<div style="height:16px;" />
{/if}
