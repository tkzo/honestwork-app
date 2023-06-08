<script lang="ts">
	import { featureCards } from '$lib/stores/Constants';
	import { base } from '$app/paths';
	import FeatureCard from './FeatureCard.svelte';
	import Offer from './Offer.svelte';
	let chosen_tab: 'employers' | 'freelancers' = 'employers';
</script>

<div class="buttons-container">
	<div class="line" />
	<button
		on:click={() => (chosen_tab = 'employers')}
		class={chosen_tab == 'employers' ? 'selected button' : 'button'}>Employers</button
	>
	<button
		on:click={() => (chosen_tab = 'freelancers')}
		class={chosen_tab != 'employers' ? 'selected button' : 'button'}>Freelancers</button
	>
	<div class="line" />
</div>
<div style="height: 120px;" />
<div class="container" style={`background-image:url(${base}/assets/gridlock.webp)`}>
	{#each featureCards as card, index}
		{#if chosen_tab == card.type}
			<div style="width:80%">
				<FeatureCard {card} {index} />
			</div>
		{/if}
	{/each}
	<div style="height:120px" />
	<Offer />
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
		width: 100vw;
		max-width: 960px;
		padding-bottom: 120px;
		background-size: contain;
		background-position: top;
		background-position-y: 120px;
		background-repeat: no-repeat;
	}
	@media (max-width: 600px) {
		.container {
			background-size: cover;
			background-position-y: 0px;
		}
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
