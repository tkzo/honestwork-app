<script lang="ts">
	import Question from '$lib/components/landing/Question.svelte';
	import { FAQCards } from '$lib/stores/Constants';
</script>

<div class="container">
	<h2>FAQ</h2>
	{#each FAQCards as card}
		<Question {card} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 80vw;
		max-width: 960px;
		background-color: var(--color-dark);
	}
	h2 {
		font-family: 'Proto Mono';
		font-style: normal;
		font-weight: 600;
		font-size: 28px;
		line-height: 28px;
		color: var(--color-primary);
		text-align: center;
		margin: 0 0 24px;
		padding: 0 0 12px;
		border-bottom: 1px solid var(--color-light-20);
		text-shadow: 0px 0px 50px rgba(255, 211, 105, 0.5);
	}
</style>
