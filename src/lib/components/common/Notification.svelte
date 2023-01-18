<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let notification: { bodytext: string; cta: string; icon: string };

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<main>
	<div class="bar">
		<p class="light-80">{notification.bodytext}</p>
		<div style="width:8px" />
		<div class="post-link" on:click={handleClick} on:keydown>
			<p class="yellow link underlined">{notification.cta}</p>
			<div style="width:8px" />
			<img src={notification.icon} alt={notification.cta} />
		</div>
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
