<script lang="ts">
	import Notification from '$lib/components/common/Notification.svelte';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/Constants';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	$: trimmedRoute = $page.route.id?.split('/')[1];
</script>

{#if $page.route.id == '/'}
	<a href={`${base}/mint`}><Notification notification={notifications.mint} /></a>
{:else if $page.route.id == '/skills' || $page.route.id == '/listings'}
	<Notification notification={notifications.mint} on:click={() => goto('/mint')} />
{:else if $page.route.id == '/jobs'}
	<a href={`${base}/new_job`}>
		<Notification notification={notifications.postjob} />
	</a>
{:else if $page.route.id == '/new_job' || $page.route.id == '/messages' || $page.route.id == '/auth' || trimmedRoute == 'job' || trimmedRoute == 'creator'}
	<a href={`${base}/mint`}>
		<Notification notification={notifications.mint} />
	</a>
{:else if $page.route.id == '/profile'}
	<a href={`${base}/mint`}>
		<Notification notification={notifications.upgrade} />
	</a>
{:else if $page.route.id == '/mint'}
	<a href="https://forms.gle/T1ngCzLwtYHx1ZGt9" target="_blank" rel="noreferrer">
		<Notification notification={notifications.invitation} />
	</a>
{/if}
