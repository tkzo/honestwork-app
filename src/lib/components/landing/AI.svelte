<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { shortcut } from '$lib/stores/Shortcut';
	import SvelteMarkdown from 'svelte-markdown';

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
			thinking = false;
		}
	};
</script>

<main>
	<h2 class="yellow">ask hnst-4 anything</h2>
	<input bind:value type="text" placeholder="Type your question here and press enter" />
	<button use:shortcut={{ code: 'Enter' }} hidden type="submit" class="yellow" on:click={ask}
		>Submit</button
	>
	<div style="height:24px" />
	<div class="answer">
		<SvelteMarkdown {source} />
		<p />
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

	input {
		width: 720px;
		border: 0.5px solid var(--color-primary);
		font-size: 16px;
		color: var(--color-primary);
		height: 48px;
		padding: 20px;
	}
	.answer {
		width: 720px;
	}
	:global(.answer p, li, table, th, td) {
		font-family: 'DM Mono', monospace;
		font-size: 14px;
		line-height: 24px;
	}
	:global(.answer li::marker) {
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
</style>
