<script lang="ts">
	import Navigation from '$lib/components/common/Navigation.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
</script>

<main>
	<Navigation />
	<div class="content">
		<slot />
	</div>
	<Footer />
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
