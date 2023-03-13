<script lang="ts">
	import {
		networkProvider,
		networkSigner,
		userConnected,
		connectWallet,
		userAddress
	} from '$lib/stores/Network';
	import { JobInput } from '$lib/stores/Validation';
	import type { JobType, Network } from '$lib/stores/Types';
	import { chains } from '$lib/stores/Constants';
	import { erc20_abi } from '$lib/stores/ABI';
	import { placeholder_image, sticky_data } from '$lib/stores/Constants';
	import { chosen_job_slot } from '$lib/stores/State';
	import { shortcut } from '$lib/stores/Shortcut';
	import { ethers } from 'ethers';
	import Skeleton from '$lib/components/common/Skeleton.svelte';
	import { env } from '$env/dynamic/public';
	import { listing_abi } from '$lib/stores/ABI';
	import { form_limitations } from '$lib/stores/Constants';
	import { Svrollbar } from 'svrollbar';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { assets } from '$app/paths';
	import Tiptap from '$lib/components/common/Tiptap.svelte';
	import { parseContent } from '$lib/stores/Parser';

	// todo: upgrade tags when api is rdy
	// add autosuggest from redis

	type TokenSelection = {
		address: string;
	};
	type NetworkSelection = {
		id: number;
		tokens: TokenSelection[];
	};

	let network_selection_array: NetworkSelection[] = [];
	export let viewport: Element;
	export let contents: Element;

	let feedHeight = 0;
	let file_url: string;
	let service_fee = 10; // in $
	let jobForm: HTMLFormElement;
	let image_url: string | undefined = undefined;
	let upload_url: Response;
	let show_ens: boolean = false;
	let show_sticky_menu: boolean = false;
	let show_token_menu: boolean = false;
	let sticky_duration: number = 7;
	let links: string[] = [];
	let tags: string[] = [];
	let chosen_network: Network = chains[0]!;
	let arbitrumTokens = chains.find((chain) => chain.id == 42161)?.tokens!;
	let chosen_payment_token = arbitrumTokens[0];
	let paymentTokenBalance = 0;
	let userPaying = false;
	let userSigned = false;
	let tag_input: HTMLInputElement;
	let userPaid: boolean = false;
	let username_length = 0;
	let username_element: HTMLInputElement;
	let title_length = 0;
	let title_element: HTMLInputElement;
	let tx_hash = '';
	let timezone: number;
	let userPublishing = false;
	let userPublished = false;
	let parsed_filename: string;
	let user_allowance: string; // bignumber
	let approveMax = false;
	let userApproved = false;
	let salt: string;
	let content: string;
	let signature: string;
	let total_chars = 0;

	$: sticky_item = sticky_data.find((n) => n.duration == sticky_duration) ?? sticky_data[0];
	$: if (browser) {
		feedHeight = window.innerHeight - 112;
	}
	$: if (chosen_payment_token && $userConnected) {
		getAllowance();
	}

	const getAllowance = async () => {
		let ERC20 = new ethers.Contract(chosen_payment_token.address, erc20_abi, $networkProvider);
		let allowance = await ERC20.allowance($userAddress, env.PUBLIC_LISTING_ADDRESS!);
    let decimals = await ERC20.decimals();
		user_allowance = ethers.utils.formatUnits(allowance, decimals);
	};
	// todo: refactor with a single form reference
	const handleSubmit = async (e: any) => {
		if (e.submitter?.id != 'job_post') {
			return;
		}

		const input: JobInput = {
			username: username_element.value,
			user_address: $userAddress,
			title: title_element.value,
			token_paid: chosen_payment_token.address,
			description: parseContent(content),
			tags: tags,
			links: links,
			budget: jobForm.budget.value,
			sticky_duration: sticky_duration,
			timezone: 'UTC+3',
			tokens_accepted: network_selection_array
		};
		let parsed = JobInput.safeParse(input);
		if (!parsed.success) {
			for (let i = 0; i < parsed.error.errors.length; i++) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>${parsed.error.errors[i].path}: </span>${parsed.error.errors[i].message}</p>`
				);
			}
			return;
		}

		userPublishing = true;
		const salt_res = await fetch(`/api/auth/login/${$userAddress}`, {
			method: 'POST'
		});
		salt = await salt_res.json();
		jobForm.signature.value = await $networkSigner.signMessage(salt);

		const formData = new FormData(e.target! as HTMLFormElement);
		let formObj: JobType = {} as JobType;
		formObj = Object.fromEntries(formData.entries()) as unknown as JobType;
		formObj.tokens_accepted = network_selection_array;
		formObj.links = links;
		formObj.tags = tags;
		formObj.sticky_duration = sticky_duration.toString();
		formObj.timezone = timezone >= 0 ? `UTC+${timezone}` : `UTC${timezone}`;

		uploadImage(e);
		formObj.image_url = parsed_filename;
		let stringified = JSON.stringify(formObj);
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
		if (data == 'success') {
			userPublished = true;
			toast.push(
				`<p class="light-60"><span style='color:var(--color-success)'>success: </span>Job listing posted</p>`
			);
			userPublishing = false;
			goto(`/job/${$userAddress}`);
		} else {
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>error: </span>${data}</p>`
			);
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
				toast.push(
					`<p class="light-60"><span style='color:var(--color-success)'>success: </span>uploaded image</p>`
				);
			} else {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>error: </span>failed to upload image</p>`
				);
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

		const res = await fetch(`/api/upload-job-url/${e.target.files[0].name}/${$userAddress}`);
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
		let i = network_selection_array.findIndex((network) => network.id == chosen_network.id);
		if (i != -1 && !getTokenState(address)) {
			network_selection_array[i].tokens.push({ address: address });
		} else if (i == -1 && !getTokenState(address)) {
			network_selection_array.push({ id: chosen_network.id, tokens: [{ address: address }] });
		} else {
			network_selection_array[i].tokens = network_selection_array[i].tokens.filter(
				(n) => n.address != address
			);
		}
		network_selection_array = network_selection_array;
	};
	const getTokenName = (address: string) => {
		let chain = chains.find((chain) => chain.id == chosen_network.id);
		let tokenName = chain?.tokens.find((token) => token.address == address)?.name;
		return tokenName;
	};
	const getTokenState = (address: string) => {
		if (network_selection_array.length == 0) return false;
		let network_selection = network_selection_array.find((n) => n.id == chosen_network.id);
		if (!network_selection) return false;
		let t = network_selection?.tokens.find((n) => n.address == address);
		return t ? true : false;
	};
	const getTokenBalance = async (token_address: string) => {
		// todo: add decimal prop to tokens
		if ($userConnected) {
			try {
				const ERC20 = new ethers.Contract(token_address, erc20_abi, $networkProvider);
				return parseFloat(ethers.utils.formatUnits(await ERC20.balanceOf($userAddress), 6));
			} catch (e) {
				console.log(e);
			}
		}
	};
	const handlePaymentTokenUpdate = (token: any) => {
		chosen_payment_token = token;
		show_token_menu = false;
	};
	const pay = async () => {
		// todo: add decimal prop to tokens
		const input: JobInput = {
			username: username_element.value,
			user_address: $userAddress,
			title: title_element.value,
			token_paid: chosen_payment_token.address,
			description: parseContent(content),
			tags: tags,
			links: links,
			budget: jobForm.budget.value,
			sticky_duration: sticky_duration,
			timezone: 'UTC+3',
			tokens_accepted: network_selection_array
		};
		let parsed = JobInput.safeParse(input);
		if (!parsed.success) {
			for (let i = 0; i < parsed.error.errors.length; i++) {
				toast.push(
					`<p class="light-60"><span style='color:var(--color-error)'>${parsed.error.errors[i].path}: </span>${parsed.error.errors[i].message}</p>`
				);
			}
			return;
		}
		if ($userConnected) {
			userPaying = true;
			let amount_to_pay = sticky_item.price + service_fee;
			let price = ethers.utils.parseUnits(amount_to_pay.toString(), 6);
			try {
				if (parseFloat(user_allowance) < amount_to_pay) {
					const erc20 = new ethers.Contract(
						chosen_payment_token.address,
						erc20_abi,
						$networkSigner
					);
					let approveAmt = approveMax ? ethers.constants.MaxUint256 : price;
					let approveTx = await erc20.approve(env.PUBLIC_LISTING_ADDRESS, approveAmt);
					let receipt = await approveTx.wait();
					if (receipt.status == 1) {
						toast.push(`<p class="light-60">Approval successful!</p>`);
					}
					userApproved = true;
				}
				const joblistingContract = new ethers.Contract(
					env.PUBLIC_LISTING_ADDRESS,
					listing_abi,
					$networkSigner
				);
				let tx = await joblistingContract.payForListing(chosen_payment_token.address, price._hex);
				tx_hash = tx.hash;
				let receipt = await tx.wait();
				if (receipt.status == 1) {
					toast.push(`<p class="light-60">Payment successful!</p>`);
				}
				userPaid = true;
			} catch (e: any) {
				toast.push(
					`<p class="light-60"><span style="color:var(--color-error)">error: </span>${e.reason}</p>`
				);
			}
			userPaying = false;
		}
	};
	const handleContentInput = (e: any) => {
    console.log("Parsing...")
		content = JSON.stringify(e.detail.content);
		total_chars = parseContent(content).length;
	};
</script>

<main class="wrapper">
	<div class="viewport" bind:this={viewport} style={`height:${feedHeight.toString() + 'px'}`}>
		<div class="contents" bind:this={contents}>
			<div style="height:16px" />
			{#if $userConnected}
				<form
					method="POST"
					on:submit|preventDefault={handleSubmit}
					bind:this={jobForm}
					autocomplete="off"
				>
					<input hidden type="number" name="job_slot" bind:value={$chosen_job_slot} />
					<input hidden type="text" name="user_address" bind:value={$userAddress} />
					<input hidden type="text" name="signature" bind:value={signature} />
					<input hidden type="text" name="sticky_duration" bind:value={sticky_duration} />
					<input hidden type="text" name="tx_hash" bind:value={tx_hash} />
					<input hidden type="text" name="token_paid" bind:value={chosen_payment_token.address} />
					<input hidden type="text" name="file_url" bind:value={file_url} />
		      <input hidden type="text" name="description" bind:value={content} />
					<div class="image-section">
						<div
							class="image-card"
							style={`background-image:url(${
								image_url && image_url != '' ? image_url : placeholder_image
							})`}
						>
							<div class="image-tint" />
							<div class="upload-button">
								<img src={`${assets}/icons/upload.svg`} alt="Upload" />
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
								/>
								<div class="limit">
									<p class="light-60">
										<span class="yellow">{username_length}</span>/{form_limitations.job.username
											.max}
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
									src={show_ens ? `${assets}/icons/checked.svg` : `${assets}/icons/unchecked.svg`}
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
								/>
								<div class="limit">
									<p class="light-60">
										<span class="yellow">{title_length}</span>/{form_limitations.job.title.max}
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
									{sticky_item?.duration} days<span class="light-60">(${sticky_item?.price})</span>
								</p>
								<img
									src={show_sticky_menu
										? `${assets}/icons/chevron_active.svg`
										: `${assets}/icons/chevron_passive.svg`}
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
						<Tiptap on:content={handleContentInput} />
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
								<p class={chosen_network == network ? 'yellow' : 'light-60'}>{network.name}</p>
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
							{#key network_selection_array}
								{#each chosen_network.tokens as token, i}
									<div class="token" on:click={() => handleTokenUpdate(token.address)} on:keydown>
										<div class="token-left">
											{#if getTokenState(token.address)}
												<img src={`${assets}/icons/checked.svg`} alt="Check" />
											{:else}
												<img src={`${assets}/icons/unchecked_passive.svg`} alt="Plus" />
											{/if}
											<div style="width:4px" />
											<p class={getTokenState(token.address) ? '' : 'light-60'}>
												{getTokenName(token.address)}
											</p>
										</div>
										<p class={getTokenState(token.address) ? '' : 'light-60'}>
											{token.address}
										</p>
									</div>
									{#if i < chosen_network.tokens.length - 1}
										<div style="height:8px" />
									{/if}
								{/each}
							{/key}
						</div>
					</div>
					<div style="height:8px" />
					<div class="payment-section">
						<div class="receipt">
							<div class="receipt-item">
								<p class="light-40">service fee</p>
								<p>+$10</p>
							</div>
							<div style="height:8px" />

							<div class="receipt-item">
								<p class="light-40">sticky fee</p>
								<p>+${sticky_item?.price}</p>
							</div>
							<div style="height:12px" />
							<div class="receipt-item receipt-total">
								<p class="light-60">total</p>
								<p class="yellow">${sticky_item.price + 10}</p>
							</div>
						</div>
						<div class="payment-module">
							<div class="token-selector input-field">
								<div class="placeholder">
									<p class="light-60">token</p>
								</div>
								<div class="sticky">
									<div
										class="sticky-chosen"
										on:click={() => (show_token_menu = !show_token_menu)}
										on:keydown
									>
										<p>
											{chosen_payment_token?.symbol ? chosen_payment_token.symbol : 'choose token'}
										</p>
										<img
											src={show_token_menu
												? `${assets}/icons/chevron_active.svg`
												: `${assets}/icons/chevron_passive.svg`}
											alt="Check"
											style="width: 10px; "
										/>
									</div>
									{#if show_token_menu}
										<div class="sticky-menu">
											{#if arbitrumTokens}
												{#each arbitrumTokens as token}
													<div
														class="sticky-item"
														on:click={() => handlePaymentTokenUpdate(token)}
														on:keydown
													>
														<p>{token.symbol}</p>
													</div>
												{/each}
											{/if}
										</div>
									{/if}
								</div>
							</div>
							<div style="height:8px" />
							<div class="balance receipt-item">
								<p class="light-40">your balance</p>
								{#if chosen_payment_token}
									{#await getTokenBalance(chosen_payment_token.address)}
										<Skeleton height="16px" width="100px" />
									{:then balance}
										<p>{balance?.toFixed(2)}</p>
									{/await}
								{/if}
							</div>
							<div style="height:12px" />
							{#if userPaying}
								{#if userApproved}
									<div class="payment-button">
										<img src={`${assets}/icons/loader.svg`} alt="loading" class="rotating" />
										<div style="width:8px" />
										<p class="yellow">payment in progress...</p>
									</div>
								{:else}
									<div class="payment-button">
										<img src={`${assets}/icons/loader.svg`} alt="loading" class="rotating" />
										<div style="width:8px" />
										<p class="yellow">approval in progress...</p>
									</div>
								{/if}
							{:else if userPublishing}
								<div class="payment-button">
									<img src={`${assets}/icons/loader.svg`} alt="loading" class="rotating" />
									<div style="width:8px" />
									<p class="yellow">publishing job listing...</p>
								</div>
							{:else if userPaid && !userPublished}
								<div class="payment-button">
									<button type="submit" id="job_post"><p>publish job listing</p></button>
								</div>
							{:else}
								<div class="payment-button payment-button-hover link" on:click={pay} on:keydown>
									<p class="yellow link">approve and pay</p>
								</div>
							{/if}
						</div>
					</div>
				</form>
				<div style="height:128px" />
			{:else}
				<section>
					<div class="gm">
						<div class="gm-inner">
							<img src={`${assets}/icons/heart.svg`} alt="Heart" />
							<div style="width:8px" />
							<p>gm fren</p>
						</div>
					</div>
					<div class="gm">
						<div class="body-text light-80">
							To be able to create a profile or create job listings; you need to connect your
							wallet.
						</div>
					</div>
					<div class="gm link yellow" on:click={connectWallet} on:keydown>
						<p>connect wallet</p>
					</div>
				</section>
			{/if}
		</div>
	</div>
	<Svrollbar alwaysVisible {viewport} {contents} />
</main>

<style>
	main {
		width: 100%;
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
		background-color: var(--color-dark);
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
		z-index: 9999;
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
	.payment-section {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
	.receipt {
		width: 256px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 12px;
	}
	.receipt-item {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.receipt-total {
		border-width: 1px 0px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 8px 0px 0px 0px;
	}
	.payment-module {
		width: 256px;
		display: flex;
		flex-direction: column;
	}
	.sticky {
		width: 100%;
	}
	.payment-button {
		width: 100%;
		padding: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-primary);
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.payment-button-hover:hover > p {
		color: var(--color-dark);
	}
	button {
		color: var(--color-primary);
	}
	.limit {
		position: absolute;
		right: 12px;
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
		width: 100%;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
	.contents {
		width: 520px;
	}
</style>
