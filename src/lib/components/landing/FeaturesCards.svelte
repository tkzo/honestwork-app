<script lang="ts">
	import { featureCards } from '$lib/stores/Constants';
	import { base } from '$app/paths';
	import FeatureCard from './FeatureCard.svelte';
	let chosen_tab: 'employers' | 'freelancers' = 'employers';
	const mint = async () => {
		// mint
		// 1) deploy
		// 2) get abi
		// 3) chain approve and pay
		// 4) do states for the button
		// 5) redirect after mint
	};
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
<div style="height: 100px;" />
<div class="container" style={`background-image:url(${base}/assets/gridlock.webp)`}>
	{#each featureCards as card, index}
		{#if chosen_tab == card.type}
			<FeatureCard {card} {index} />
		{/if}
	{/each}
	<!-- <div style="height:20px" /> -->
	<!-- <div class="calltoarms"> -->
	<!-- 	<div class="tag">LIMITED TIME OFFER</div> -->
	<!-- 	<h2 class="yellow">try it out with starter nft</h2> -->
	<!-- 	<div style="height:4px" /> -->
	<!-- 	<div class="body-text"> -->
	<!-- 		Post a skill for free and see if there's any demand for it. Once you validate for yourself, go -->
	<!-- 		for the full membership. -->
	<!-- 	</div> -->
	<!-- 	<div style="height:36px" /> -->
	<!-- 	<div class="cta" on:click={mint} on:keydown>Mint a Free Membership NFT</div> -->
	<!-- </div> -->
</div>

<style>
	.tag {
		position: absolute;
		top: -16px;
		border: 1px solid var(--color-primary);
		background-color: var(--color-dark);
		color: var(--color-primary);
		padding: 4px 8px;
	}
	.calltoarms .body-text,
	h2 {
		width: 480px;
		max-width: 90%;
	}
	.cta:hover {
		border: 1px solid var(--color-primary);
	}
	.cta {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 8px 20px;
		gap: 10px;
		border: 1px solid var(--color-light-20);
		box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.1);
		cursor: pointer;
		color: var(--color-primary);
		transition: border 0.2s ease-in 0s;
	}
	.calltoarms {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 90%;
		max-width: 600px;
		text-align: center;
		padding: 48px;
		border: 1px solid var(--color-primary);
		box-shadow: 0px 0px 250px rgba(255, 211, 105, 0.18);
	}
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
