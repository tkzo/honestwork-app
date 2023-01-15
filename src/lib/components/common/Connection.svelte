<script lang="ts">
	import { Jumper } from 'svelte-loading-spinners';
	export let text: string;
</script>

<div class="spinster">
	<Jumper size="60" color="var(--color-primary)" unit="px" duration="1s" />
	<div style="height: 12px;" />
	<p class="light-80" style="animation: blinking 2s linear infinite;">{text}</p>
</div>

<style>
	.spinster {
		width: 256px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
	}
	.spinster p {
		text-align: center;
	}
</style>
