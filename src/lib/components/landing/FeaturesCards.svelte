<script lang="ts">
	import { featureCards } from '$lib/stores/Constants';
	import FeatureCard from './FeatureCard.svelte';
	let chosen_tab: 'employer' | 'freelancer' = 'employer';
</script>

<div class="buttons-container">
	<div class="line" />
	<button
		on:click={() => (chosen_tab = 'employer')}
		class={chosen_tab == 'employer' ? 'selected button' : 'button'}>Employers</button
	>
	<button
		on:click={() => (chosen_tab = 'freelancer')}
		class={chosen_tab != 'employer' ? 'selected button' : 'button'}>Freelancers</button
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
		border-bottom: 1px solid var(--color-light-20);
	}
	.features-card {
		display: flex;
		align-items: center;
		gap: 57px;
		background: var(--color-dark);
		width: 100%;
		justify-content: space-between;
	}
	.img-right {
		flex-direction: row;
	}
	.img-left {
		flex-direction: row-reverse;
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 45%;
	}
	.icon {
		height: 32px;
		width: 32px;
		margin-top: 8px;
	}
	.title {
		max-width: 400px;
		text-transform: uppercase;
		color: var(--color-primary);
		margin: 0;
		font-family: 'Proto Mono';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		inline-size: 400px;
		overflow-wrap: break-word;
	}
	.description-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
		justify-content: flex-start;
		width: 100%;
	}
	.description {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 24px;
	}
	.feature {
		font-family: 'DM Mono';
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--color-light);
		text-transform: none;
		width: 100%;
		max-width: 300px;
	}
	.cta {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 8px;
		gap: 10px;
		border: 1px solid var(--color-light-20);
		box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.1);
		cursor: pointer;
		color: var(--color-primary);
		width: 247px;
		transition: border 0.2s ease-in 0s;
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
	.cta:hover {
		border: 1px solid var(--color-primary);
	}
	.img-container {
		width: 50%;
	}
	.featured-image {
		width: 100%;
		max-width: 420px;
	}
	@media (max-width: 870px) {
		.title {
			font-size: 20px;
			line-height: 32px;
		}
		.feature {
			font-size: 14px;
			line-height: 20px;
		}
	}
	@media (max-width: 754px) {
		.features-card {
			flex-direction: column;
		}
		.feature {
			max-width: 500px;
		}
		.info {
			justify-content: center;
			align-items: center;
		}
		.info,
		.img-container {
			width: 100%;
		}
		.featured-image {
			display: block;
			margin: 0 auto;
		}
	}
</style>
