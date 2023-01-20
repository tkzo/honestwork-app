<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { xmtpConnected } from '$lib/stores/Network';

	setInterval(() => {
		if (!$xmtpConnected)
			toast.push(
				`<p class="light-60"><span style='color:var(--color-error)'>warning: </span>xmtp connection is not active.</p>`
			);
	}, 30000);
</script>
