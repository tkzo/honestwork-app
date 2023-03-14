<script lang="ts">
	import Skeleton from '$lib/components/common/Skeleton.svelte';
	import type { SkillType } from '$lib/stores/Types';
	import { browser } from '$app/environment';
	import { parseContent } from '$lib/stores/Parser';

	export let skill: SkillType;

	let chosen_image: number = 0;
	let loading_gallery_image = false;

	$: if (skill && browser) {
		resetState();
	}
	$: trimmed_images = skill.image_urls.filter((url: string) => url !== '');

	const nextImage = () => {
		if (chosen_image < trimmed_images.length - 1) {
		  loading_gallery_image = true;
			chosen_image++;
		} else {
		  loading_gallery_image = true;
      chosen_image = 0;
    }
	};
	const previousImage = () => {
		if (chosen_image > 0) {
		  loading_gallery_image = true;
			chosen_image--;
		} else {
		  loading_gallery_image = true;
      chosen_image = trimmed_images.length - 1;
    }
	};
	const resetState = () => {
		chosen_image = 0;
	};
</script>

<main>
	<div class="gallery">
    {#key trimmed_images[chosen_image]}
		  <img 
        class="gallery-images" 
        src={trimmed_images[chosen_image] + "?tr=h-776,w-1036"} 
        alt="Gallery" 
        on:load={() => { loading_gallery_image = false }}
      />
    {/key}
		{#if loading_gallery_image}
			<div class="skeleton-container">
				<Skeleton width="518px" height="389px" />
			</div>
		{/if}
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
		{#each skill.tags as tag}
			<div class="tag link">
				<p>{tag}</p>
			</div>
			{#if tag !== skill.tags[skill.tags.length - 1]}
				<div style="width:8px;" />
			{/if}
		{/each}
	</div>
	<div class="description">
		<div class="body-text light-60">
			{parseContent(skill.description)}
		</div>
	</div>
	<div style="height:12px;" />
	<div class="links">
		{#each skill.links as link, i}
			{#if link != ''}
				<div class="link-container">
					<p class="placeholder light-40">link</p>
					<div style="width:8px;" />
					<a href={link}>
						<p class="light-80">{link}</p>
					</a>
				</div>
				<div style="height:8px;" />
			{/if}
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
	.gallery {
    position: relative;
		width: 100%;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		display: flex;
		flex-direction: column;
	}
	.gallery-images {
		width: 100%;
		height: 388px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
		padding: 8px 12px;
	}
	.right-gallery-button {
		border-width: 0px 0px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
		padding: 12px;
	}
	.link-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.placeholder {
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
	}
	.skeleton-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
