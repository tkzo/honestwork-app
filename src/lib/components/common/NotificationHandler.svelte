<script lang="ts">
	import Notification from '$lib/components/common/Notification.svelte';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/Constants';
	import { goto } from '$app/navigation';

	$: trimmedRoute = $page.route.id?.split('/')[1];
</script>

{#if $page.route.id == '/'}
	<Notification notification={notifications.mint} />
{:else if $page.route.id == '/jobs' || $page.route.id == '/skills' || $page.route.id == '/listings'}
	<Notification notification={notifications.postjob} on:click={() => goto('/new_job')} />
	<div style="height:16px;" />
{:else if $page.route.id == '/new_job' || trimmedRoute == ('job' || 'creator')}
	<Notification notification={notifications.mint} />
	<div style="height:16px;" />
{:else if $page.route.id == '/profile'}
	<Notification notification={notifications.upgrade} />
	<div style="height:16px;" />
{/if}
