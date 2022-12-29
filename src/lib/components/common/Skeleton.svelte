<script>
	export let width = '100%';
	export let height = '25px';
	export let borderRadius = '0px';
	export let baseColor = 'rgb(4, 6, 10)';
	export let highlightColor = 'rgb(16, 17, 18)';
	export let animationLength = '1.2s';
</script>

<div
	class="skeleton"
	style="height: {height}; width: {width}; border-radius: {borderRadius}; --baseColor: {baseColor}; --highlightColor: {highlightColor}; --animationLength: {animationLength}"
/>

<style>
	.skeleton {
		background-color: var(--baseColor);
		background-image: linear-gradient(
			90deg,
			var(--baseColor),
			var(--highlightColor),
			var(--baseColor)
		);
		background-size: 200px 100%;
		background-repeat: no-repeat;
		display: inline-block;
		width: 100%;
		animation: skeleton var(--animationLength) ease-in-out infinite;
	}

	@keyframes skeleton {
		0% {
			background-position: -200px 0;
		}
		100% {
			background-position: calc(200px + 100%) 0;
		}
	}
</style>
