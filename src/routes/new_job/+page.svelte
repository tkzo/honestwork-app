<script lang="ts">
	import { userConnected, connectWallet, xmtpConnected, userAddress } from '$lib/stores/Network';
	import { JobInput } from '$lib/stores/Validation';
	import type { JobType, Network } from '$lib/stores/Types';
	import { chains } from '$lib/stores/Constants';
	import { placeholder_image, sticky_data } from '$lib/stores/Constants';
	import { chosen_job_slot } from '$lib/stores/State';

	type TokenSelection = {
		chain_id: number;
		token_address: string;
	};

	let jobForm: HTMLFormElement;
	let tokens_selected: TokenSelection[] = [];
	let image_url: string | undefined = undefined;
	let upload_url: Response;
	let show_ens: boolean = false;
	let show_sticky_menu: boolean = false;
	let sticky_duration: number = 7;
	let links: string[] = [];

	$: sticky_item = sticky_data.find((n) => n.duration == sticky_duration);

	const handleSubmit = async (e: Event) => {
		const formData = new FormData(e.target! as HTMLFormElement);
		let formObj: JobType = {} as JobType;
		formObj = Object.fromEntries(formData.entries()) as unknown as JobType;
		formObj.tokens_accepted = [] as Network[];

		for (let i = 0; i < tokens_selected.length; i++) {
			let chain_id = tokens_selected[i].chain_id;
			let existing = formObj.tokens_accepted?.find((n) => n.id == chain_id);
			if (existing) {
				existing.tokens.push({ address: tokens_selected[i].token_address });
			} else {
				formObj.tokens_accepted.push({
					id: chain_id,
					tokens: [{ address: tokens_selected[i].token_address }]
				});
			}
		}

		formObj.links = links;

		//todo: consume errors and show them to the user
		let parsed = JobInput.safeParse(formObj);
		if (!parsed.success) {
			console.log(parsed.error);
			return;
		} else {
			jobForm.tokens_accepted = JSON.stringify(formObj.tokens_accepted);
			let stringified = JSON.stringify(formObj);

			uploadImage(e);

			const url = '/api/job_submit';
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: stringified
			};
			let res = await fetch(url, options);
			let data = await res.json();
			console.log(data);
		}
	};

	const uploadImage = async (e: any) => {
		let target_file;
		for (let t of e.target) {
			if (t.files) {
				target_file = t;
			}
		}
		if (target_file.files.length != 0) {
			const file = target_file.files[0]!;
			const { url, fields } = await upload_url.json();
			const formData = new FormData();
			Object.entries({ ...fields, file }).forEach(([key, value]) => {
				formData.append(key, value as string);
			});
			const upload = await fetch(url, {
				method: 'POST',
				body: formData
			});
			//todo: stop exec if not ok
			if (upload.ok) {
				console.log('Uploaded successfully!');
			} else {
				console.error('Upload failed.');
			}
		}
	};

	const getUploadResponse = async (e: any) => {
		const file = e.target.files[0]!;
		if (file == null) return;
		const reader = new FileReader();
		reader.onload = function () {
			if (typeof reader.result == 'string') image_url = reader.result;
		};
		reader.readAsDataURL(file);

		const res = await fetch(`/api/upload-url/${e.target.files[0].name}`);
		upload_url = res;
	};
	const setSticky = (duration: number) => {
		show_sticky_menu = !show_sticky_menu;
		sticky_duration = duration;
	};
	const handleLinkUpdate = (e: any, index: number) => {
		links[index] = e.target.value;
	};

	// const handleTokenAdd = (e: any, chain_id: number, token_address: string) => {
	// 	if (e.target?.checked) {
	// 		tokens_selected.push({
	// 			chain_id: chain_id,
	// 			token_address: token_address
	// 		});
	// 	} else {
	// 		tokens_selected = tokens_selected.filter(
	// 			(token) => token.chain_id !== chain_id && token.token_address !== token_address
	// 		);
	// 	}
	// };
</script>

<main>
	{#if $userConnected && $xmtpConnected}
		<form method="POST" on:submit|preventDefault={handleSubmit} bind:this={jobForm}>
			<input hidden type="number" name="job_slot" value={$chosen_job_slot} />
			<input hidden type="text" name="user_address" value={$userAddress} />

			<div class="image-section">
				<div
					class="image-card"
					style={`background-image:url(${
						image_url && image_url != '' ? image_url : placeholder_image
					})`}
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
						on:change={getUploadResponse}
						bind:value={image_url}
					/>
				</div>
				<div style="width:8px;" />
				<div class="image-section-inputs">
					<div class="input-field">
						<div class="placeholder">
							<p class="light-40">name</p>
						</div>
						<input name="username" class="flex-input" type="text" />
					</div>

					<div style="height:8px;" />
					<div
						class="input-field"
						on:click={() => (show_ens = !show_ens)}
						on:keydown
						style="cursor:pointer;"
					>
						<input hidden type="checkbox" name="show_ens" bind:checked={show_ens} />
						<img
							src={show_ens ? 'icons/checked.svg' : 'icons/unchecked.svg'}
							alt="Checked"
							style="height:16px;width:16px;"
						/>
						<div style="width:4px" />
						<p class={show_ens ? 'yellow' : 'light-60'}>use ens name</p>
					</div>
					<div style="height:8px;" />
					<div class="input-field">
						<div class="placeholder">
							<p class="light-40">title</p>
						</div>
						<input name="title" class="flex-input" type="text" />
					</div>
				</div>
			</div>
			<div style="height:8px" />
			<div class="input-field">
				<div class="placeholder">
					<p class="light-40">email</p>
				</div>
				<input name="email" class="flex-input" type="text" />
			</div>
			<div style="height:8px" />
			<div class="input-field">
				<div class="placeholder">
					<p class="light-40">timezone <span class="light-60">(utc)</span></p>
				</div>
				<input name="timezone" class="flex-input" type="number" min="-12" max="12" />
			</div>
			<div style="height:8px" />
			<div class="input-field">
				<div class="placeholder">
					<p class="light-40">budget <span class="light-60">($)</span></p>
				</div>
				<input name="budget" class="flex-input" type="number" min="1000" max="1000000" />
			</div>
			<div style="height:8px" />
			<div class="input-field">
				<div class="placeholder">
					<p class="light-40">installments</p>
				</div>
				<input name="installments" class="flex-input" type="number" min="2" max="5" />
			</div>
			<div style="height:8px" />
			<div class="input-field">
				<div class="placeholder">
					<p class="yellow">stay sticky!</p>
				</div>
				<div class="sticky">
					<div
						class="sticky-chosen"
						on:click={() => (show_sticky_menu = !show_sticky_menu)}
						on:keydown
					>
						<p>
							{sticky_item?.duration} days<span class="light-60">(${sticky_item?.price})</span>
						</p>
						<img src="icons/chevron_active.svg" alt="Dropdown" style="width:10px;" />
					</div>
					{#if show_sticky_menu}
						<div class="sticky-menu">
							<div class="sticky-item" on:click={() => setSticky(7)} on:keydown>
								<p>7 days<span class="light-60">($49)</span></p>
							</div>
							<div class="sticky-item" on:click={() => setSticky(14)} on:keydown>
								<p>14 days<span class="light-60">($69)</span></p>
							</div>
							<div class="sticky-item" on:click={() => setSticky(30)} on:keydown>
								<p>30 days<span class="light-60">($99)</span></p>
							</div>
						</div>
					{/if}
				</div>
			</div>
			<div style="height:24px" />

			<div class="description-bar">
				<div class="description-title"><p class="light-40">bio</p></div>
				<p class="chars light-60"><span class="yellow">0</span>/10</p>
			</div>
			<div class="description">
				<textarea
					name="description"
					rows="20"
					maxlength="1000"
					placeholder="enter description..."
				/>
			</div>
			<div style="height:24px" />
			{#each new Array(3) as _, i}
				<div class="input-field">
					<div class="placeholder">
						<p class="light-40">link</p>
					</div>
					<input class="flex-input" type="text" on:input={(e) => handleLinkUpdate(e, i)} />
				</div>
				{#if i < 2}
					<div style="height:8px" />
				{/if}
			{/each}

			<!-- <input type="text" name="description" placeholder="Enter description" />
			<input
				type="text"
				name="token_paid"
				placeholder="Enter token paid"
				value="0x6bf83F1af0350407c6766Af32818603E9c08E182"
			/>
			<input type="number" name="budget" placeholder="Enter budget" value={0} />
			<input type="number" name="installments" placeholder="Enter installments" />
			<input type="number" name="sticky_duration" placeholder="Enter sticky duration" />
			<input type="number" name="highlight" placeholder="Enter highlit" />
			<button>lets go</button> -->
			<button type="submit"><p>lets go</p></button>
		</form>

		<!-- {#each chains as network}
		<div class="tab">{network.name}</div>
		{#each network.tokens as token}
			<input
				type="checkbox"
				id={`token_name[${token.name}]`}
				on:change={(e) => handleTokenAdd(e, network.id, token.address)}
			/>
			<label for={`token_name[${token.name}]`}>{token.name}</label>
		{/each}
	{/each}
	<div class="payment_module" /> -->
	{:else}
		<section>
			<div class="gm">
				<div class="gm-inner">
					<img src="icons/heart.svg" alt="Heart" />
					<div style="width:8px" />
					<p>gm fren</p>
				</div>
			</div>
			<div class="gm">
				<div class="body-text light-80">
					To be able to create a profile or create job listings; you need to connect your wallet.
				</div>
			</div>
			<div class="gm link yellow" on:click={connectWallet} on:keydown>
				<p>connect wallet</p>
			</div>
		</section>
	{/if}
	<div style="height:64px" />
</main>

<style>
	main {
		width: 520px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	section {
		width: 256px;
		display: flex;
		flex-direction: column;
		background-color: var(--color-dark);
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
	}
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.image-section {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
	.image-section-inputs {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.gm {
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.gm-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.image-card {
		height: 124px;
		width: 124px;
		background-size: cover;
		background-repeat: no-repeat;
		cursor: pointer;
		position: relative;
		border: solid 1px var(--color-light-10);
		box-sizing: border-box;
	}
	.image-tint {
		position: absolute;
		height: 124px;
		width: 124px;
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
		width: 124px;
		height: 124px;
		cursor: pointer;
	}
	.flex-input {
		flex: 1;
		height: 32px;
	}
	.placeholder {
		height: 32px;
		display: flex;
		background-color: var(--color-dark);
		border-width: 1px 0px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		padding: 8px;
	}
	.input-field {
		flex: 1;
		width: 100%;
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.sticky {
		flex: 1;
		width: 100%;
		height: 32px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		position: relative;
	}
	.sticky-chosen {
		flex: 1;
		height: 32px;
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		cursor: pointer;
	}
	.sticky-chosen:hover {
		background-color: var(--color-light-2);
	}
	.sticky-menu {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 32px;
		background-color: var(--color-dark);
		border-width: 0px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		flex: 1;
		width: 100%;
	}
	.sticky-item {
		padding: 8px;
		width: 100%;
		cursor: pointer;
		box-sizing: border-box;
	}
	.sticky:hover .sticky-menu {
		display: flex;
	}
	.sticky-item:hover {
		background-color: var(--color-light-2);
	}
	.description-bar {
		width: 100%;
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
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.description {
		width: 100%;
		height: 100%;
	}
	textarea {
		width: 100%;
		height: 100%;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
		padding: 8px;
		resize: none;
	}
</style>
