<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { shortcut } from '$lib/stores/Shortcut';
	import SvelteMarkdown from 'svelte-markdown';
	import { Jumper } from 'svelte-loading-spinners';

	let value: string = '';
	let thinking: boolean = false;
	let source: string;
	const ask = async () => {
		if (!thinking) {
			thinking = true;
			source = '';
			const res = await fetch('https://api.markprompt.com/v1/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: value,
					iDontKnowMessage: "I don't know",
					projectKey: env.PUBLIC_MARKPROMPT_PRODUCTION_KEY,
					model: 'gpt-4'
				})
			});
			console.log('result:', res);
			if (!res.ok || !res.body) {
				console.error('Error:', await res.text());
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let response = '';

			thinking = false;
			while (true) {
				const { value, done } = await reader.read();
				const chunk = decoder.decode(value);
				response = response + chunk;
				const parts = response.split('___START_RESPONSE_STREAM___');
				source = parts[1];
				if (done) {
					break;
				}
			}
		}
	};
</script>

<main>
	<h2 class="yellow">ask hnst-4</h2>
	<div style="height:12px" />
	<p class="body-text light-80" style="font-size:14px">
		Have questions about HonestWork? Ask HNST-4 anything.
	</p>
	<div style="height:24px" />
	<form>
		<input bind:value type="text" placeholder="Type your question here and press enter" />
		<button use:shortcut={{ code: '13' }} hidden type="button" class="yellow" on:click={ask}
			>Submit</button
		>
	</form>
	<div style="height:24px" />
	<div class="answer">
		{#if thinking}
			<div class="jumper-centered">
				<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
			</div>
		{:else}
			<SvelteMarkdown {source} />
		{/if}
	</div>
</main>

<style>
	main {
		width: 90%;
		max-width: 720px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.jumper-centered {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	h2 {
		margin: 0px;
	}

	input {
		width: 720px;
		border: 0.5px solid var(--color-primary);
		font-size: 16px;
		color: var(--color-light);
		height: 48px;
		padding: 20px;
	}
	input::placeholder {
		color: var(--color-light-40);
	}
	.answer {
		width: 720px;
	}
	:global(.answer p, .answer li, .answer table, .answer th, .answer td) {
		font-family: 'DM Mono', monospace;
		font-size: 14px;
		line-height: 24px;
		color: var(--color-light-80);
		background-color: #111111;
	}
	:global(.answer p, .answer h1, .answer h2, .answer h3, .answer h4, .answer h5) {
		padding: 8px;
	}
	:global(.answer img) {
		display: none;
	}
	:global(.answer li::marker) {
		color: var(--color-primary);
	}
	:global(.answer a:link, a:visited, a:hover, a:active) {
		color: var(--color-primary);
	}
	:global(.answer th, td) {
		border-width: 0px 1px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 4px 8px;
	}
	:global(.answer th) {
		color: var(--color-primary);
	}
	:global(.answer table) {
		border-width: 1px 0px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		margin: 12px;
	}
	@media (max-width: 720px) {
		input {
			width: 80vw;
		}
		.answer {
			width: 80vw;
		}
	}
</style>
