<script lang="ts">
	import Skeleton from './Skeleton.svelte';
	export let src: string;
	export let alt: string;
	export let width: string;
	export let height: string;
	export let loading = false;
</script>

<div class="container" style={`width:${width};height:${height}`}>
	<img
		{src}
		{alt}
		on:load={() => {
			loading = false;
		}}
	/>
	{#if loading}
		<Skeleton {width} {height} />
	{/if}
</div>

<style>
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
