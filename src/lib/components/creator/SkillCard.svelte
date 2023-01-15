<script lang="ts">
	import type { SkillType } from '$lib/stores/Types';
	import { Svrollbar } from 'svrollbar';
	import { browser } from '$app/environment';

	export let skill: SkillType;

	let faketags = ['tag #1', 'tag #2', 'tag #3'];

	let viewport: Element;
	let contents: Element;
	let chosen_image: number = 0;

	let feedHeight = 0;
	$: if (browser) feedHeight = window.innerHeight - 136;
	$: if (skill && browser) {
		resetState();
	}
	$: trimmed_images = skill.image_urls.filter((url: string) => url !== '');

	const nextImage = () => {
		if (chosen_image < trimmed_images.length - 1) {
			chosen_image++;
		}
	};
	const previousImage = () => {
		if (chosen_image > 0) {
			chosen_image--;
		}
	};
	const resetState = () => {
		chosen_image = 0;
	};
</script>

<main>
	<div class="wrapper">
		<div bind:this={viewport} class="viewport" style={`height:${feedHeight.toString() + 'px'}`}>
			<div bind:this={contents} class="contents">
				<div class="gallery">
					<img class="gallery-images" src={trimmed_images[chosen_image]} alt="Gallery" />
					<div class="gallery-buttons">
						<div class="left-gallery-button" on:click={previousImage} on:keydown>
							<p class="light-40">PREVIOUS</p>
						</div>
						<p>{chosen_image + 1}/{trimmed_images.length}</p>
						<div class="right-gallery-button" on:click={nextImage} on:keydown>
							<p class="light-40">NEXT</p>
						</div>
					</div>
				</div>
				<div class="tags">
					{#each faketags as tag}
						<div class="tag link">
							<p>{tag}</p>
						</div>
					{/each}
				</div>
				<div class="description">
					<div class="body-text light-80">
						{skill.description}
					</div>
				</div>
				<div style="height:12px;" />
				<div class="links">
					{#each skill.links as link}
						<div class="link-container">
							<p class="placeholder light-40">link</p>
							<div style="width:8px;" />
							<a href={link}>
								<p class="light-80">{link}</p>
							</a>
						</div>
						{#if link !== skill.links[skill.links.length - 1]}
							<div style="height:8px;" />
						{/if}
					{/each}
				</div>
				<div style="height:32px;" />
			</div>
		</div>
		<Svrollbar alwaysVisible {viewport} {contents} />
	</div>
</main>

<style>
	main {
		width: 520px;
		display: flex;
		flex-direction: column;
	}
	.gallery {
		width: 100%;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		display: flex;
		flex-direction: column;
	}
	.gallery-images {
		width: 100%;
		height: 388px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.gallery-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.left-gallery-button {
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 8px 12px;
	}
	.right-gallery-button {
		border-width: 0px 0px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 8px 12px;
	}
	.right-gallery-button:hover {
		background-color: var(--color-primary);
	}
	.right-gallery-button:hover p {
		color: var(--color-dark);
	}
	.description {
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 12px;
	}
	.link-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.placeholder {
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
	.tags {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 12px;
	}
	.tag {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 8px 12px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
</style>
