<script>
	const track = async () => {
		if (typeof window !== 'undefined' && window) {
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag('event', 'push_me', {
				event_category: 'test_event',
				event_label: 'push_me'
			});
		}
	};
</script>

<svelte:head>
	<title>HonestWork</title>
	<meta name="description" content="HonestWork" />
</svelte:head>
<div on:click={track} on:keydown>PUSH ME</div>
