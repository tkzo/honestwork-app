<script lang="ts">
	import { slide } from 'svelte/transition';
	import { assets } from '$app/paths';

	export let card: any;

	let open = false;

	const setOpen = () => {
		open = !open;
	};
</script>

<div on:click={setOpen} on:keydown={setOpen} style="cursor:pointer;" class="faq-card">
	<div class="question-box">
		<div class="question">{card.question}</div>
		<img
			src={`${assets}/icons/landing/chevron.svg`}
			alt="Chevron"
			class={`chevron-${card.id} ${open ? `rotate-up` : `rotate-down`}`}
		/>
	</div>
	{#if open}
		<div transition:slide={{ duration: 400 }}>
			<div style="height: 24px" />
			<div class="answer">{card.answer}</div>
		</div>
	{/if}
</div>

<style>
	.faq-card {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border: 1px solid var(--color-light-20);
		padding: 14px 20px;
		width: 100%;
		max-width: 961px;
	}
	.question-box {
		width: 100%;
		justify-content: space-between;
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.question {
		font-family: 'Proto Mono';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 16px;
	}
	.rotate-up {
		transform: rotate(-180deg);
		transition: all 0.4s ease-out;
	}
	.rotate-down {
		transform: rotate(0);
		transition: all 0.4s ease-out;
	}
	.answer {
		font-family: 'DM Mono';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--color-light-60);
	}
	@media (max-width: 620px) {
		.question,
		.answer {
			font-size: 14px;
		}
	}
</style>
