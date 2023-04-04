<script lang="ts">
	import { featureCards } from '$lib/stores/Constants';
	import FeatureCard from './FeatureCard.svelte';
	let chosen_tab: 'clients' | 'freelancers' = 'clients';
</script>

<div class="buttons-container">
	<div class="line" />
	<button
		on:click={() => (chosen_tab = 'clients')}
		class={chosen_tab == 'clients' ? 'selected button' : 'button'}>Employers</button
	>
	<button
		on:click={() => (chosen_tab = 'freelancers')}
		class={chosen_tab != 'clients' ? 'selected button' : 'button'}>Freelancers</button
	>
	<div class="line" />
</div>
<div style="height: 100px;" />
<div class="container">
	{#each featureCards as card, index}
		{#if chosen_tab == card.type}
			<FeatureCard {card} {index} />
		{/if}
	{/each}
</div>

<style>
	.buttons-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 80vw;
		max-width: 960px;
	}
	.line {
		height: 1px;
		background-color: var(--color-light-20);
		width: 100%;
		max-width: 371px;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 120px;
		width: 80vw;
		max-width: 960px;
		padding-bottom: 120px;
		background-image: url('./assets/gridlock.webp');
		background-size: cover;
		background-repeat: none;
	}

	.button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 12px;
		border: 1px solid #ffd369;
		color: var(--color-primary);
		font-weight: 600;
		font-size: 12px;
		line-height: 12px;
	}
	.button:hover,
	.selected {
		background-color: var(--color-primary);
		color: var(--color-dark);
	}
</style>
