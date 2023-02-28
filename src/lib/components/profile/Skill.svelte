<script lang="ts">
	import type { SkillType } from '$lib/stores/Types';
	import { placeholder_image } from '$lib/stores/Constants';
	import { parseContent } from '$lib/stores/Parser';

	export let slot: number;
	export let skill: SkillType;
	export let width: number = 520;
</script>

<section style={`width:${width}px;`}>
	<div class="header">
		<p class="light"><span class="light-40">#{slot + 1} </span>{skill.title}</p>
		<p class="yellow">></p>
	</div>
	<div class="gallery">
		{#each skill.image_urls.slice(0, 4) as url}
			<img src={url == '' ? placeholder_image : url} alt="gallery" class="preview-image" />
		{/each}
	</div>
	<div class="description">
		<div class="body-text light-60">
			{parseContent(skill.description).chars.slice(0, 160) + '...'}
		</div>
	</div>
	<div class="tag-bar">
		<div class="tags">
			{#each skill.tags as tag}
				<div class="tag border-all">
					<p class="light-40 link">{tag}</p>
				</div>
				{#if tag != skill.tags[skill.tags.length - 1]}
					<div style="width: 4px" />
				{/if}
			{/each}
		</div>
		<div class="tag border-all">
			<p class="light-40">
				MIN <span class="light">${skill.minimum_price}</span>
			</p>
		</div>
	</div>
</section>

<style>
	section {
		flex-direction: column;
		cursor: pointer;
	}
	section:hover {
		background-color: var(--color-light-2);
	}
	section:hover span {
		color: var(--color-primary);
	}
	.header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px 12px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
	}
	.gallery {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px 12px;
		box-sizing: border-box;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.preview-image {
		height: 115px;
		width: 115px;
	}
	.description {
		padding: 8px 12px;
	}
	.tag-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 4px 12px 12px 12px;
	}
	.tags {
		display: flex;
		flex-direction: row;
	}
	.tag {
		padding: 4px 8px;
	}
	.tag:hover {
		background-color: var(--color-primary);
	}
	.tag:hover p {
		color: var(--color-dark);
	}
	.tag:hover span {
		color: var(--color-dark);
	}
</style>
