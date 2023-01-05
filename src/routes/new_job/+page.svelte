<script lang="ts">
	import { userAddress, userConnected, connectWallet, xmtpConnected } from '$lib/stores/Network';
</script>

{#if $userConnected && $xmtpConnected}
	{$userAddress}
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

<style>
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
</style>
