<script lang="ts">
	import { userState } from '$lib/stores/Network';
	import { page } from '$app/stores';

	export let bodytext: string;
	export let cta: string;
	export let icon: string;
</script>

<main>
	<div class="bar">
		<p class="light-80">{bodytext}</p>
		<div style="width:8px" />
		<a href="/new_job" class="post-link">
			<p class="link underlined">{cta}</p>
			<div style="width:8px" />
			<img src={icon} alt={cta} />
		</a>
	</div>
</main>

<style>
	main {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.underlined {
		text-decoration: underline;
	}
	.bar {
		width: 100%;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 8px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.post-link {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
