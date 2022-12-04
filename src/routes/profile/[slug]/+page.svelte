<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="description" content="HonestWork Profile Page" />
</svelte:head>

<p>{data}</p>
