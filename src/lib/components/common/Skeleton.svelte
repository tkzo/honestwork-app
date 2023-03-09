<script>
	export let width = '100%';
	export let height = '16px';
	export let borderRadius = '0px';
	export let baseColor = 'rgb(4, 6, 10)';
	export let highlightColor = 'rgb(20, 21, 22)';
	export let animationLength = '1.2s';
</script>

<div
	class="skeleton"
	style="height: {height}; width: {width}; border-radius: {borderRadius}; --baseColor: {baseColor}; --highlightColor: {highlightColor}; --animationLength: {animationLength}"
/>

<style>
	.skeleton {
		background-color: var(--color-dark);
		background-image: linear-gradient(
			90deg,
			var(--color-dark),
			var(--highlightColor),
			var(--color-dark)
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
