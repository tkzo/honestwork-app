<svelte:options immutable={true} />

<script lang="ts">
	export let title: string;
	export let description: string;
	export let image_urls: Array<string>;
	export let minimum_price: number;

	let tags = [
		{
			key: 'member',
			value: 'tier 3'
		},
		{
			key: 'jobs delivered',
			value: '666'
		},
		{
			key: 'min. budget',
			value: '$' + minimum_price.toString().slice(0, 6)
		}
	];

	$: trimmed_description =
		description.length > 120 ? description.slice(0, 120) + '...' : description;
	let placeholder_image = 'assets/xcopy.gif';
</script>

<section>
	<div class="contents">
		<div class="thumbnail">
			<img src={image_urls[0] ?? placeholder_image} alt="gallery" class="preview-image" />
		</div>
		<div class="content">
			<div>
				<p>{title}</p>
				<div style="height:12px" />
				<div class="body-text light-60">{trimmed_description}</div>
			</div>
			<div class="sub">
				<p class="yellow">takez0_o</p>
				<p>4.9<span class="light-60">(366)</span></p>
			</div>
		</div>
	</div>
	<div class="tag-bar">
		<div class="tags">
			{#each tags as tag}
				<div class="tag">
					<p class="link">{tag.value} <span class="light-40">{tag.key}</span></p>
				</div>
				{#if tag != tags[tags.length - 1]}
					<div style="width: 4px" />
				{/if}
			{/each}
		</div>
		<div class="actions">
			<div class="action">
				<img src="icons/message.svg" alt="message" />
			</div>
			<div class="action">
				<img src="icons/heart.svg" alt="heart" />
			</div>
		</div>
	</div>
</section>
<div style="height: 12px" />

<style>
	section {
		width: 520px;
		flex-direction: column;
		cursor: pointer;
		border-width: 1px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	section:hover {
		background-color: var(--color-light-2);
	}
	.contents {
		display: flex;
		flex-direction: row;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.thumbnail {
		height: 180px;
		width: 240px;
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 8px;
		justify-content: space-between;
		width: 278px;
	}
	.sub {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.preview-image {
		height: 180px;
		width: 240px;
	}
	.tag-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.tags {
		display: flex;
		flex-direction: row;
	}
	.tag {
		padding: 8px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.tag:hover {
		background-color: var(--color-primary);
	}
	.actions {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.action {
		height: 16px;
		padding: 8px;
		border-width: 0px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
</style>
