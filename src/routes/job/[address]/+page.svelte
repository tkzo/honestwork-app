<script lang="ts">
	import type { PageData } from './$types';
	import JobPage from '$lib/components/jobs/JobPage.svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>HW | Job Listing</title>
	<meta name="description" content="HonestWork Job Page" />
</svelte:head>

<div style="height:16px" />
<JobPage job={data.job} show_tags={true} />
