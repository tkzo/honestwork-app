<script lang="ts">
	import Applicant from './Applicant.svelte';
	import { userConnected, connectWallet, userAddress, networkSigner } from '$lib/stores/Network';
	import { JobInput } from '$lib/stores/Validation';
	import type { JobType, Network } from '$lib/stores/Types';
	import { chains } from '$lib/stores/Constants';
	import { placeholder_image, sticky_data } from '$lib/stores/Constants';
	import { chosen_job_slot, changes_made, submitting } from '$lib/stores/State';
	import { shortcut } from '$lib/stores/Shortcut';
	import { form_limitations } from '$lib/stores/Constants';
	import { Svrollbar } from 'svrollbar';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import Tiptap from '$lib/components/common/Tiptap.svelte';
	import { parseContent } from '$lib/stores/Parser';
	import { browser } from '$app/environment';

	export let job: JobType;
	export let feedHeight: number;

	let viewport: Element;
	let contents: Element;
	let chosen_tab: string = 'applicants' || 'edit mode';
	let file_url: string;
	let jobForm: HTMLFormElement;
	let upload_url: Response;
	let show_ens: boolean = false;
	let show_sticky_menu: boolean = false;
	let chosen_network: Network = chains[0];
	let arbitrumTokens = chains.find((chain) => chain.id == 42161)?.tokens!;
	let chosen_payment_token = arbitrumTokens[0];
	let tag_input: HTMLInputElement;
	let username_length = 0;
	let username_element: HTMLInputElement;
	let title_length = 0;
	let title_element: HTMLInputElement;
	let tx_hash = '';
	let parsed_filename: string;
	let content: string;
	let total_chars = 0;
	let signature: string;

	let username = job.username;
	let title = job.title;
	let email = job.email;
	let description = job.description;
	let budget = job.budget;
	let installments = job.installments;
	let sticky_duration = parseInt(job.sticky_duration);
	let links = job.links;
	let tags = job.tags;
	let timezone = job.timezone ? parseInt(job.timezone.replace('UTC', '')) : 0;
	let tokens_selected =
		job.tokens_accepted?.map((n) => {
			return { chain_id: n.id, token_address: n.tokens[0].address };
		}) ?? [];
	let image_url = job.image_url;

	onMount(() => {
		changes_made.set(false);
	});

	$: if (
		username != job.username ||
		title != job.title ||
		email != job.email ||
		description != job.description ||
		image_url != job.image_url ||
		links != job.links ||
		installments != job.installments ||
		budget != job.budget ||
		tags != job.tags ||
		sticky_duration != parseInt(job.sticky_duration) ||
		`UTC${timezone > 0 ? '+' : '-'}${timezone}` != job.timezone
	) {
		changes_made.set(true);
	} else {
		changes_made.set(false);
	}
	$: sticky_item = sticky_data.find((n) => n.duration == sticky_duration) ?? sticky_data[0];

	// todo: refactor with a single form reference
	const handleSubmit = async (e: any) => {
		if ($userConnected) {
			if (e.submitter?.id != 'job_post') {
				return;
			}

			const res = await fetch(`/api/auth/login/${$userAddress}`, {
				method: 'POST'
			});
			let salt = await res.json();
			jobForm.signature.value = await $networkSigner.signMessage(salt);

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
			formObj.tags = tags;
			formObj.sticky_duration = sticky_duration.toString();
			formObj.timezone = timezone >= 0 ? `UTC+${timezone}` : `UTC-${timezone}`;
			formObj.description = content;

			//todo: consume errors and show them to the user
			let parsed = JobInput.safeParse(formObj);
			if (!parsed.success) {
				console.log(parsed.error);
				return;
			} else {
				if (upload_url) {
					uploadImage(e);
					formObj.image_url = parsed_filename;
				}

				jobForm.tokens_accepted = JSON.stringify(formObj.tokens_accepted);
				let stringified = JSON.stringify(formObj);
				const url = '/api/job_update';
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: stringified
				};
				let res = await fetch(url, options);
				let data = await res.json();
				if (data == 'success') {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-success)'>success: </span>job listing updated.</p>`
					);
				} else {
					toast.push(
						`<p class="light-60"><span style='color:var(--color-error)'>error: </span>job listing could not be updated.</p>`
					);
				}
			}
			changes_made.set(false);
			if (browser) window.location.reload();
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
			parsed_filename = file.name;
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

		const res = await fetch(
			`/api/update-job-url/${e.target.files[0].name}/${$userAddress}/${job.slot}`
		);
		upload_url = res;
	};
	const setSticky = (duration: number) => {
		show_sticky_menu = !show_sticky_menu;
		sticky_duration = duration;
	};
	const handleLinkUpdate = (e: any, index: number) => {
		links[index] = e.target.value;
	};
	const handleTagEntry = (e: any) => {
		if (e.target?.value !== '' && e.pointerType != 'mouse') tags.push(e.target?.value);
		tags = tags;
		tag_input.value = '';
	};
	const handleRemoveTag = (index: number) => {
		tags.splice(index, 1);
		tags = tags;
	};
	const handleTokenUpdate = (address: string) => {
		if (!getTokenState(address)) {
			tokens_selected.push({
				chain_id: chosen_network.id,
				token_address: address
			});
		} else {
			tokens_selected = tokens_selected.filter(
				(token) => token.chain_id == chosen_network.id && token.token_address !== address
			);
		}
		tokens_selected = tokens_selected;
	};
	const getTokenName = (address: string) => {
		let chain = chains.find((chain) => chain.id == chosen_network.id);
		let tokenName = chain?.tokens.find((token) => token.address == address)?.name;
		return tokenName;
	};
	const getTokenState = (address: string) => {
		let t = tokens_selected.find(
			(n) => n.chain_id == chosen_network.id && n.token_address == address
		);
		return t ? true : false;
	};
	const handleContentInput = (e: any) => {
		content = JSON.stringify(e.detail.content);
		total_chars = parseContent(content).length;
	};
</script>

<main>
	<form method="PATCH" on:submit|preventDefault={handleSubmit} bind:this={jobForm}>
		<div class="bar">
			<div class="bar-left">
				<div class="bar-item" on:click={() => (chosen_tab = 'applicants')} on:keydown>
					<p class={chosen_tab == 'applicants' ? 'yellow' : 'light-60 link'}>applicants</p>
				</div>
				<div class="bar-item" on:click={() => (chosen_tab = 'edit mode')} on:keydown>
					<p class={chosen_tab == 'edit mode' ? 'yellow' : 'light-60 link'}>edit mode</p>
				</div>
			</div>
			<div class="save-changes" style="margin-left:auto">
				{#if $submitting}
					<img
						src="icons/loader.svg"
						alt="loading"
						class="rotating"
						style="height:16px;width:16px;"
					/>
					<div style="width:4px;" />
				{/if}
				{#if chosen_tab == 'edit mode'}
					<button id="job_post" class={$changes_made ? 'yellow link' : 'light-60'}>
						save changes
					</button>
				{/if}
			</div>
		</div>
		<div class="wrapper">
			<div
				bind:this={viewport}
				class="viewport"
				style={`height:${(feedHeight - 32).toString() + 'px'}`}
			>
				<div bind:this={contents} class="contents">
					{#if chosen_tab == 'applicants'}
						{#if job.application}
							{#each job.application as applicant, i}
								<div style="height:8px;" />
								<Applicant {applicant} />
								{#if i == job.application.length - 1}
									<div style="height:8px;" />
								{/if}
							{/each}
						{/if}
					{:else}
						<div class="edit">
							{#if $userConnected}
								<input hidden type="number" name="job_slot" value={$chosen_job_slot} />
								<input hidden type="text" name="user_address" value={$userAddress} />
								<input hidden type="text" name="tx_hash" value={tx_hash} />
								<input hidden type="text" name="token_paid" value={chosen_payment_token.address} />
								<input hidden type="text" name="file_url" value={file_url} />
								<input hidden type="text" name="signature" bind:value={signature} />
								<div class="image-section">
									<div
										class="image-card"
										style={`background-image:url(${image_url ? image_url + "?tr=h-248,w-248" : placeholder_image})`}
									>
										<div class="image-tint" />
										<div class="upload-button">
											<img src="icons/upload.svg" alt="Upload" />
											<div style="height:4px;" />
											<p class="yellow">UPLOAD IMAGE</p>
										</div>
										<input
											class="file-input"
											type="file"
											accept="image/png, image/jpeg"
											on:change={getUploadResponse}
											bind:value={file_url}
										/>
									</div>
									<div style="width:8px;" />
									<div class="image-section-inputs">
										<div class="input-field">
											<div class="placeholder">
												<p class="light-40">name</p>
											</div>
											<input
												name="username"
												class="flex-input"
												type="text"
												on:keyup={() => (username_length = username_element.value.length)}
												bind:this={username_element}
												minlength={form_limitations.job.username.min}
												maxlength={form_limitations.job.username.max}
												placeholder="Enter company/username"
												bind:value={username}
											/>
											<div class="limit">
												<p class="light-60">
													<span class="yellow">{username_length}</span>/{form_limitations.job
														.username.max}
												</p>
											</div>
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
											<input
												name="title"
												class="flex-input"
												type="text"
												on:keyup={() => (title_length = title_element.value.length)}
												bind:this={title_element}
												minlength={form_limitations.job.title.min}
												maxlength={form_limitations.job.title.max}
												placeholder="Enter a title for you job listing"
												bind:value={title}
											/>
											<div class="limit">
												<p class="light-60">
													<span class="yellow">{title_length}</span>/{form_limitations.job.title
														.max}
												</p>
											</div>
										</div>
									</div>
								</div>
								<div style="height:8px" />
								<div class="input-field">
									<div class="placeholder">
										<p class="light-40">email</p>
									</div>
									<input
										name="email"
										class="flex-input"
										type="text"
										placeholder="Enter email for notifications"
										bind:value={email}
									/>
								</div>
								<div style="height:8px" />
								<div class="input-field">
									<div class="placeholder">
										<p class="light-40">timezone <span class="light-60">(utc)</span></p>
									</div>
									<input
										class="flex-input"
										type="number"
										min={form_limitations.job.timezone.min}
										max={form_limitations.job.timezone.max}
										placeholder="Between -12 and 12"
										bind:value={timezone}
									/>
								</div>
								<div style="height:8px" />
								<div class="input-field">
									<div class="placeholder">
										<p class="light-40">budget <span class="light-60">($)</span></p>
									</div>
									<input
										name="budget"
										class="flex-input"
										type="number"
										min={form_limitations.job.budget.min}
										max={form_limitations.job.budget.max}
										placeholder="Between $1000 and $1,000,000"
										bind:value={budget}
									/>
								</div>
								<div style="height:8px" />
								<div class="input-field">
									<div class="placeholder">
										<p class="light-40">installments</p>
									</div>
									<input
										name="installments"
										class="flex-input"
										type="number"
										min={form_limitations.job.installments.min}
										max={form_limitations.job.installments.max}
										placeholder="Between 2 and 5"
										bind:value={installments}
									/>
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
												{sticky_item?.duration} days<span class="light-60"
													>(${sticky_item?.price})</span
												>
											</p>
											<img
												src={show_sticky_menu
													? 'icons/chevron_active.svg'
													: 'icons/chevron_passive.svg'}
												alt="Dropdown"
												style="width:10px;"
											/>
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
												<div class="sticky-item" on:click={() => setSticky(0)} on:keydown>
													<p>no sticky<span class="light-60">(ngmi)</span></p>
												</div>
											</div>
										{/if}
									</div>
								</div>
								<div style="height:24px" />
								<div class="description-bar">
									<div class="description-title"><p class="light-40">job description</p></div>
									<p class="light-60">
										<span class="yellow">{total_chars}</span>/{form_limitations.job.description.max}
									</p>
								</div>
								<div class="description">
									{#key job.description}
										<Tiptap
											on:content={handleContentInput}
											content={JSON.parse(job.description)}
											editable={true}
										/>
									{/key}
								</div>
								<div style="height:24px" />
								{#each new Array(3) as _, i}
									<div class="input-field">
										<div class="placeholder">
											<p class="light-40">link</p>
										</div>
										<input
											class="flex-input"
											type="text"
											on:input={(e) => handleLinkUpdate(e, i)}
											placeholder="enter at least 1 link"
											value={links[i] ?? ''}
										/>
									</div>
									{#if i < 2}
										<div style="height:8px" />
									{/if}
								{/each}
								<div style="height:24px" />
								<div class="input-field">
									<div class="placeholder">
										<p class="light-40">tags</p>
									</div>
									<input
										class="flex-input"
										type="text"
										use:shortcut={{ code: 'Enter' }}
										on:click={(e) => handleTagEntry(e)}
										bind:this={tag_input}
										placeholder="enter at least 1 tag"
									/>
								</div>
								<div style="height:8px" />
								{#if tags.length > 0}
									<div class="tags">
										{#each tags as tag, i}
											<div class="tag" on:click={() => handleRemoveTag(i)} on:keydown>
												<p class="light-60">{tag}</p>
												<div class="close-icon" />
											</div>
										{/each}
									</div>
								{/if}
								<div style="height:24px" />
								<div class="networks-tab">
									{#each chains as network, i}
										<div class="network" on:click={() => (chosen_network = network)} on:keydown>
											<p class={chosen_network == network ? 'yellow' : 'light-60'}>
												{network.name}
											</p>
										</div>
									{/each}
								</div>

								<div class="tokens-table">
									<div class="tokens-bar">
										<p class="light-40">accept tokens</p>
										<p class="light-40">addresses</p>
									</div>
									<div class="tokens">
										<div style="height:8px" />
										{#each chosen_network.tokens as token, i}
											<div
												class="token"
												on:click={() => handleTokenUpdate(token.address)}
												on:keydown
											>
												<div class="token-left">
													{#if tokens_selected && getTokenState(token.address)}
														<img src="icons/checked.svg" alt="Check" />
													{:else}
														<img src="icons/unchecked_passive.svg" alt="Plus" />
													{/if}
													<div style="width:4px" />
													<p
														class={tokens_selected && getTokenState(token.address)
															? ''
															: 'light-60'}
													>
														{getTokenName(token.address)}
													</p>
												</div>
												<p
													class={tokens_selected && getTokenState(token.address) ? '' : 'light-60'}
												>
													{token.address}
												</p>
											</div>
											{#if i < chosen_network.tokens.length - 1}
												<div style="height:8px" />
											{/if}
										{/each}
									</div>
								</div>
								<div style="height:128px" />
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
											To be able to create a profile or create job listings; you need to connect
											your wallet.
										</div>
									</div>
									<div class="gm link yellow" on:click={connectWallet} on:keydown>
										<p>connect wallet</p>
									</div>
								</section>
							{/if}
						</div>
					{/if}
				</div>
			</div>
			<Svrollbar {viewport} {contents} />
		</div>
	</form>
</main>

<style>
	main {
		width: 100%;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		background-color: var(--color-dark);
	}
	.bar {
		height: 32px;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		padding: 0 12px 0 0;
	}
	.bar-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		cursor: pointer;
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
	.contents {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.bar-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.edit {
		width: 518px;
		padding: 8px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		justify-content: flex-start;
	}
	section {
		width: 256px;
		display: flex;
		flex-direction: column;
		background-color: var(--color-dark);
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
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
		border: solid 1px var(--color-light-20);
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
		border-color: var(--color-light-20);
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
		position: relative;
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
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
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
		border-color: var(--color-light-20);
	}
	.description {
		width: 100%;
		height: 100%;
	}
	.tags {
		width: calc(100% - 100px);
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 8px;
	}
	.tag {
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		background-color: var(--color-dark);
	}
	.tag:hover {
		background-color: var(--color-light-2);
	}
	.tag > p {
		font-size: 11px;
		line-height: 12px;
	}
	.tag:hover .close-icon {
		background: url('icons/close.svg');
	}
	.close-icon {
		height: 16px;
		width: 16px;
		margin-left: 4px;
		background: url('icons/close_passive.svg');
	}
	.networks-tab {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px 1px 0px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		background-color: var(--color-dark);
	}
	.network {
		padding: 8px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
	}
	.tokens {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.token {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
	}
	.token p {
		pointer-events: none;
	}
	.token-left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.tokens-table {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 12px;
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		background-color: var(--color-dark);
	}
	.tokens-bar {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 0px 0px 8px 0px;
	}
	.sticky {
		width: 100%;
	}
	.limit {
		position: absolute;
		right: 12px;
	}
</style>
