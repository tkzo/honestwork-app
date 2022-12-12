<script lang="ts">
	import { onMount } from 'svelte';

	export let skill: any;
	let description_chars = 1000;
	let description_text = skill.description;
	let text_length = 0;
	let file_url: string;
	let myTextarea: HTMLTextAreaElement;
	let image_url: string;
	let upload_response: Response;
	const uploadPhoto = async (e: any) => {
		const file = e.target.files[0]!;
		if (file == null) return;
		const reader = new FileReader();
		reader.onload = function () {
			if (typeof reader.result == 'string') image_url = reader.result;
		};
		reader.readAsDataURL(file);
		const res = await fetch(`/api/upload-url/${e.target.files[0].name}`);
		upload_response = res;
	};
	const updateDescription = () => {
		text_length = myTextarea.value.length;
	};
	onMount(() => {
		updateDescription();
	});
</script>

<section class="gallery">
	{#each new Array(8) as image_url, i}
		<div
			class="image-card"
			style={`background-image:url(${skill.image_urls[i] ?? 'assets/xcopy.gif'})`}
		>
			<div class="image-tint" />
			<div class="upload-button">
				<img src="icons/upload.svg" alt="Upload" />
				<div style="height:4px;" />
				<p class="yellow">UPLOAD IMAGE</p>
			</div>
			<input
				name="file_url"
				class="file-input"
				type="file"
				accept="image/png, image/jpeg"
				on:change={uploadPhoto}
				bind:value={file_url}
			/>
			<input hidden type="text" name="image_url" bind:value={image_url} />
		</div>
	{/each}
</section>
<div style="height:16px;" />
<div class="input-fields">
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">title</p>
		</div>
		<input name="title" class="flex-input" type="text" />
	</div>
	<div style="height:8px;" />
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">minimum budget</p>
		</div>
		<input name="minimum" class="flex-input" type="text" />
	</div>
</div>
<div style="height:16px;" />
<div class="input-fields">
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">link</p>
		</div>
		<input name={`link-0`} class="flex-input" type="text" />
	</div>
	<div style="height:8px;" />
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">link</p>
		</div>
		<input name={`link-1`} class="flex-input" type="text" />
	</div>
	<div style="height:8px;" />
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">link</p>
		</div>
		<input name={`link-2`} class="flex-input" type="text" />
	</div>
</div>
<div style="height:16px;" />

<div class="description">
	<div class="description-bar">
		<section class="description-title"><p class="light-40">description</p></section>
		<p class="chars light-60"><span class="yellow">{text_length}</span>/{description_chars}</p>
	</div>
	<textarea
		name="description"
		size="520"
		rows="20"
		maxlength="1000"
		placeholder="enter skill description..."
		bind:this={myTextarea}
		bind:value={description_text}
		on:keyup={updateDescription}
	/>
</div>

<style>
	.gallery {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 7px;
		width: 520px;
		flex-wrap: wrap;
		gap: 8px;
	}
	.image-card {
		height: 90px;
		width: 120px;
		background-size: cover;
		background-repeat: no-repeat;
		cursor: pointer;
		position: relative;
		border: solid 1px var(--color-light-20);
		box-sizing: border-box;
	}
	.image-tint {
		position: absolute;
		height: 90px;
		width: 120px;
		background-color: rgba(0, 0, 0, 0.9);
		display: none;
	}
	.image-card:hover .image-tint {
		display: block;
	}
	.upload-button {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		display: none;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.image-card:hover .upload-button {
		display: flex;
	}
	.image-card:hover {
		border: none;
	}
	.file-input {
		opacity: 0;
		width: 120px;
		height: 90px;
		cursor: pointer;
	}
	.input-fields {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.input-field {
		display: flex;
		flex-direction: row;
		min-width: 320px;
		justify-content: flex-start;
		height: 32px;
	}
	.flex-input {
		flex: 1;
	}
	.placeholder {
		height: 32px;
		display: flex;
		background-color: var(--color-dark);
		border-width: 1px 0px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		padding: 8px;
	}
	textarea {
		width: 100%;
		resize: none;
	}
	.description {
		position: relative;
	}
	.description-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 13px;
		line-height: 16px;
		align-items: center;
	}
	.description-title {
		padding: 8px;
		border-width: 1px 1px 0px 1px;
	}
</style>
