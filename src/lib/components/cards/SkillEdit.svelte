<script lang="ts">
	import { onMount } from 'svelte';
	import { skill_upload_urls, chosen_skill_slot } from '$lib/stores/State';

	export let skill: any;

	let placeholder_image = 'assets/xcopy.gif';
	let description_chars = 1000;
	let description_text = skill.description;
	let title: string = skill.title;
	let minimum: string = skill.minimum_price;
	let link_0: string = skill.links[0];
	let link_1: string = skill.links[1];
	let link_2: string = skill.links[2];

	let text_length = 0;
	let file_url_0: string;
	let file_url_1: string;
	let file_url_2: string;
	let file_url_3: string;
	let file_url_4: string;
	let file_url_5: string;
	let file_url_6: string;
	let file_url_7: string;
	let myTextarea: HTMLTextAreaElement;
	let image_url: string;
	let image_url_0: string = skill.image_urls[0];
	let image_url_1: string = skill.image_urls[1];
	let image_url_2: string = skill.image_urls[2];
	let image_url_3: string = skill.image_urls[3];
	let image_url_4: string = skill.image_urls[4];
	let image_url_5: string = skill.image_urls[5];
	let image_url_6: string = skill.image_urls[6];
	let image_url_7: string = skill.image_urls[7];
	let comp_0: HTMLInputElement;
	let comp_1: HTMLInputElement;
	let comp_2: HTMLInputElement;
	let comp_3: HTMLInputElement;
	let comp_4: HTMLInputElement;
	let comp_5: HTMLInputElement;
	let comp_6: HTMLInputElement;
	let comp_7: HTMLInputElement;

	const uploadPhoto = async (e: any) => {
		const file = e.target.files[0]!;
		console.log(file);
		if (file == null) return;
		const reader = new FileReader();
		reader.onload = function () {
			if (typeof reader.result == 'string') {
				if (e.srcElement.name == 'file_url_0') image_url_0 = reader.result;
				if (e.srcElement.name == 'file_url_1') image_url_1 = reader.result;
				if (e.srcElement.name == 'file_url_2') image_url_2 = reader.result;
				if (e.srcElement.name == 'file_url_3') image_url_3 = reader.result;
				if (e.srcElement.name == 'file_url_4') image_url_4 = reader.result;
				if (e.srcElement.name == 'file_url_5') image_url_5 = reader.result;
				if (e.srcElement.name == 'file_url_6') image_url_6 = reader.result;
				if (e.srcElement.name == 'file_url_7') image_url_7 = reader.result;
			}
		};
		reader.readAsDataURL(file);
		let urls = $skill_upload_urls;
		console.log('Skill urls;', $skill_upload_urls);

		for (let i = 0; i < 10; i++) {
			urls[i] = Array<Response>;
		}

		for (let i = 0; i < 8; i++) {
			if (e.srcElement.name == `file_url_${i}`) {
				console.log('Chosen skill(client),i:', $chosen_skill_slot, i);
				console.log('urls:', urls);
				// @ts-expect-error
				urls[$chosen_skill_slot][i] = await fetch(
					`/api/upload-skill-url/${$chosen_skill_slot}/${i}/${e.target.files[0].name}`
				);
			}
		}
		skill_upload_urls.set(urls);
		console.log('Skill upload urls after upload:', $skill_upload_urls);
	};
	const updateDescription = () => {
		text_length = myTextarea.value.length;
	};
	onMount(() => {
		updateDescription();
	});
</script>

<section class="gallery">
	<input hidden type="number" name="skill_slot" value={$chosen_skill_slot} />
	<div
		class="image-card"
		style={`background-image:url(${
			image_url_0 && image_url_0 != '' ? image_url_0 : placeholder_image
		})`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_0`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_0}
			bind:this={comp_0}
		/>
		<input hidden type="text" name="image_url_0" bind:value={image_url_0} />
		<input hidden type="number" name="image_slot_0" value="0" />
	</div>
	<div
		class="image-card"
		style={`background-image:url('${
			image_url_1 && image_url_1 != '' ? image_url_1 : placeholder_image
		}')`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_1`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_1}
			bind:this={comp_1}
		/>
		<input hidden type="text" name="image_url_1" bind:value={image_url_1} />
		<input hidden type="number" name="image_slot_1" value="1" />
	</div>
	<div
		class="image-card"
		style={`background-image:url('${
			image_url_2 && image_url_2 != '' ? image_url_2 : placeholder_image
		}')`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_${2}`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_2}
			bind:this={comp_2}
		/>
		<input hidden type="text" name="image_url_2" bind:value={image_url_2} />
		<input hidden type="number" name="image_slot_2" value="2" />
	</div>
	<div
		class="image-card"
		style={`background-image:url('${
			image_url_3 && image_url_3 != '' ? image_url_3 : placeholder_image
		}')`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_${3}`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_3}
			bind:this={comp_3}
		/>
		<input hidden type="text" name="image_url_3" bind:value={image_url_3} />
		<input hidden type="number" name="image_slot_3" value="3" />
	</div>
	<div
		class="image-card"
		style={`background-image:url('${
			image_url_4 && image_url_4 != '' ? image_url_4 : placeholder_image
		}')`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_${4}`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_4}
			bind:this={comp_4}
		/>
		<input hidden type="text" name="image_url_4" bind:value={image_url_4} />
		<input hidden type="number" name="image_slot_4" value="4" />
	</div>
	<div
		class="image-card"
		style={`background-image:url('${
			image_url_5 && image_url_5 != '' ? image_url_5 : placeholder_image
		}')`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_${5}`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_5}
			bind:this={comp_5}
		/>
		<input hidden type="text" name="image_url_5" bind:value={image_url_5} />
		<input hidden type="number" name="image_slot_5" value="5" />
	</div>
	<div
		class="image-card"
		style={`background-image:url('${
			image_url_6 && image_url_6 != '' ? image_url_6 : placeholder_image
		}')`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_${6}`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_6}
			bind:this={comp_6}
		/>
		<input hidden type="text" name="image_url_6" bind:value={image_url_6} />
		<input hidden type="number" name="image_slot_6" value="6" />
	</div>
	<div
		class="image-card"
		style={`background-image:url('${
			image_url_7 && image_url_7 != '' ? image_url_7 : placeholder_image
		}')`}
	>
		<div class="image-tint" />
		<div class="upload-button">
			<img src="icons/upload.svg" alt="Upload" />
			<div style="height:4px;" />
			<p class="yellow">UPLOAD IMAGE</p>
		</div>
		<input
			name={`file_url_${7}`}
			class="file-input"
			type="file"
			accept="image/png, image/jpeg"
			on:change={uploadPhoto}
			bind:value={file_url_7}
			bind:this={comp_7}
		/>
		<input hidden type="text" name="image_url_7" bind:value={image_url_7} />
		<input hidden type="number" name="image_slot_7" value="7" />
	</div>
</section>
<div style="height:16px;" />
<div class="input-fields">
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">title</p>
		</div>
		<input name="title" class="flex-input" type="text" placeholder={title} bind:value={title} />
	</div>
	<div style="height:8px;" />
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">minimum budget</p>
		</div>
		<input
			name="minimum_price"
			class="flex-input"
			type="text"
			placeholder={minimum}
			bind:value={minimum}
		/>
	</div>
</div>
<div style="height:16px;" />
<div class="input-fields">
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">link</p>
		</div>
		<input name={`link-0`} class="flex-input" type="text" bind:value={link_0} />
	</div>
	<div style="height:8px;" />
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">link</p>
		</div>
		<input name={`link-1`} class="flex-input" type="text" bind:value={link_1} />
	</div>
	<div style="height:8px;" />
	<div class="input-field">
		<div class="placeholder">
			<p class="light-40">link</p>
		</div>
		<input name={`link-2`} class="flex-input" type="text" bind:value={link_2} />
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
