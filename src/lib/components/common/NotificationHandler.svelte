<script lang="ts">
	import Notification from '$lib/components/common/Notification.svelte';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/Constants';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	$: trimmedRoute = $page.route.id?.split('/')[1];
</script>

{#if $page.route.id == '/'}
	<a href="https://twitter.com/HonestWorkDAO" target="_blank" rel="noreferrer"
		><Notification notification={notifications.launch} /></a
	>
{:else if $page.route.id == '/jobs' || $page.route.id == '/skills' || $page.route.id == '/listings'}
	<Notification notification={notifications.mint} on:click={() => goto('/mint')} />
	<div style="height:16px;" />
{:else if $page.route.id == '/new_job' || $page.route.id == '/messages' || $page.route.id == '/auth' || trimmedRoute == 'job' || trimmedRoute == 'creator'}
	<a href={`${base}/mint`}>
		<Notification notification={notifications.mint} />
	</a>
	<div style="height:16px;" />
{:else if $page.route.id == '/profile'}
	<a href={`${base}/mint`}>
		<Notification notification={notifications.upgrade} />
	</a>
	<div style="height:16px;" />
{:else if $page.route.id == '/mint'}
	<a href="https://forms.gle/T1ngCzLwtYHx1ZGt9" target="_blank" rel="noreferrer">
		<Notification notification={notifications.invitation} />
	</a>
	<div style="height:16px;" />
{/if}
