<script lang="ts">
	import Notification from '$lib/components/common/Notification.svelte';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/Constants';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	$: trimmedRoute = $page.route.id?.split('/')[1];
</script>

{#if $page.route.id == '/'}
	<a href={`${base}/new_job`}><Notification notification={notifications.postjob} /></a>
{:else if $page.route.id == '/skills' || $page.route.id == '/listings'}
	<Notification notification={notifications.mint} on:click={() => goto('/mint')} />
{:else if $page.route.id == '/jobs'}
	<a href={`${base}/new_job`}>
		<Notification notification={notifications.postjob} />
	</a>
{:else if $page.route.id == '/new_job' || $page.route.id == '/messages' || $page.route.id == '/auth' || trimmedRoute == 'job' || trimmedRoute == 'creator' || trimmedRoute == 'skill'}
	<a href={`${base}/mint`}>
		<Notification notification={notifications.mint} />
	</a>
{:else if $page.route.id?.startsWith('/profile')}
	<a href={`${base}/mint`}>
		<Notification notification={notifications.upgrade} />
	</a>
{:else if $page.route.id == '/mint'}
	<a
		href="https://docs.google.com/forms/d/e/1FAIpQLSdAkkkZ-nwVfUErIdqh6ZLLLJCFoB0A9eR3bsUm_jxhqY4X_Q/viewform"
	>
		<Notification notification={notifications.invitation} />
	</a>
{/if}
