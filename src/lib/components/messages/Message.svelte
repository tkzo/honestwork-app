<svelte:options immutable={true} />

<script lang="ts">
	import { userAddress } from '$lib/stores/Network';
	export let message: any;
	export let index: number;
	export let array_length: number;
</script>

<div style="height:12px" />
{#if message.senderAddress == $userAddress}
	<div class="self-message">
		<div class="date" />
		<div class="message-contents yellow-line">
			<div class="body-text light-80">{message.content}</div>
		</div>
	</div>
{:else}
	<div class="peer-message">
		<div class="date" />
		<div class="message-contents gray-line">
			<div class="body-text light-80">{message.content}</div>
		</div>
	</div>
{/if}
{#if index == array_length - 1}
	<div style="height:12px" />
{/if}

<style>
	.self-message {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.peer-message {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.message-contents {
		background-color: var(--color-light-2);
		padding: 12px 16px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-self: flex-end;
		width: max-content;
		max-width: 352px;
	}
	.yellow-line {
		border-style: solid;
		border-width: 0px 0px 0px 1px;
		border-color: var(--color-primary);
	}
	.gray-line {
		border-style: solid;
		border-width: 1px 1px 1px 0px;
		border-color: var(--color-light-20);
	}
</style>
