<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import { inview } from 'svelte-inview';
	import type { FeatureCard } from '$lib/stores/Types';

	export let card: FeatureCard;
	export let index: number;

	const letters = 'abcdefghijklmnopqrstuvwxyz';

	let interval: any = null;
	let iteration = 0;
	let isInView;

	$: _index = card.type === 'employer' ? index : index - 3;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
		(isInView = detail.inView);
	const runx = (event: any) => {
		iteration = 0;
		if (event.target.innerText === event.target.getAttribute('data-text')) {
			clearInterval(interval);
		} else {
			interval = setInterval(() => {
				event.target.innerText = event.target.innerText
					.split('')
					.map((letter: number, index: number) => {
						if (index < iteration) {
							return event.target.dataset.text[index];
						}
						return letters[Math.floor(Math.random() * 26)];
					})
					.join('');

				if (iteration >= event.target.getAttribute('data-text').length + 15) {
					clearInterval(interval);
				}
				iteration += 1 / 2;
			}, 30);
		}
	};
</script>

<main
	class={`${index % 2 == 0 ? 'img-right' : 'img-left'}`}
	in:fly={{ y: 80, delay: 50 + _index * 150, duration: 1000, easing: quintOut }}
	out:fade={{ duration: 50 }}
>
	<div class="info">
		<h3
			class="title"
			data-text={card.title}
			use:inview
			on:change={() => {
				handleChange;
			}}
			on:enter={(event) => {
				const { inView } = event.detail;
				isInView = inView;
				runx(event);
			}}
		>
			{card.title}
		</h3>
		<div class="description-container">
			<div class="description">
				<img src={card.icon1} alt={card.icon1alt} class="icon" />
				<p class="feature">{card.feature1}</p>
			</div>
			<div class="description">
				<img src={card.icon2} alt={card.icon2alt} class="icon" />
				<p class="feature">{card.feature2}</p>
			</div>
		</div>
		<!-- <div style="height:12px" />
		<a href="/jobs" class="cta">{card.buttontext}</a> -->
	</div>
	<div class="img-container">
		<img src={card.imgsrc} alt={card.imgalt} class="featured-image" />
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		gap: 57px;
		/* background: var(--color-dark); */
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
	}
	.title {
		max-width: 320px;
		max-height: 64px;
		text-transform: uppercase;
		color: var(--color-primary);
		margin: 0;
		font-family: 'Proto Mono';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		inline-size: 320px;
		overflow-wrap: break-word;
		overflow-x: hidden;
	}
	.img-container {
		width: 420px;
	}
	.button:hover,
	.selected {
		background-color: var(--color-primary);
		color: var(--color-dark);
	}
	.cta:hover {
		border: 1px solid var(--color-primary);
	}
	.featured-image {
		width: 100%;
		max-width: 420px;
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
		border-bottom: 1px solid var(--color-light-20);
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
		inline-size: 320px;
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
		font-size: 14px;
		line-height: 20px;
		color: var(--color-light-80);
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
		main {
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
