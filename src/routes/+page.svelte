<script lang="ts">
	import { goto } from '$app/navigation';
	import { base, assets } from '$app/paths';
	import { connectWallet, connecting } from '$lib/stores/Network';
	import { Svrollbar } from 'svrollbar';
	import FeaturesCards from '$lib/components/landing/FeaturesCards.svelte';
	import BenefitsCards from '$lib/components/landing/BenefitsCards.svelte';
	import AI from '$lib/components/landing/AI.svelte';

	let viewport: Element;
	let contents: Element;

	// todo: find other way to preload
	let preload_images = [
		`${assets}/assets/landing/employer_1.webp`,
		`${assets}/assets/landing/employer_2.webp`,
		`${assets}/assets/landing/employer_3.webp`,
		`${assets}/assets/landing/freelancer_1.webp`,
		`${assets}/assets/landing/freelancer_2.webp`,
		`${assets}/assets/landing/freelancer_3.webp`
	];

	const handleConnect = async () => {
		await connectWallet();
		goto('/jobs');
	};
</script>

<svelte:head>
	<title>HonestWorkDAO</title>
	<meta name="description" content="HonestWork" />
	{#each preload_images as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

<div class="wrapper">
	<div class="viewport" bind:this={viewport}>
		<div class="contents" bind:this={contents}>
			<div class="hero" style={`background-image: url(${assets}/assets/landing/radial_grid.png)`}>
				<div class="nav">
					<div class="logo">
						<!-- <img src={`${assets}/icons/landing/logo.svg`} alt="HonestWork Logo" /> -->
						<div class="text yellow"><p class="yellow">H0NESTW0RK</p></div>
					</div>
					<div class="login">
						<div style="width: 12px;" />
						<a href="https://docs.honestwork.app" target="_blank" rel="noopener noreferrer">
							<p class="light-60 link">DOCS</p>
						</a>
						<div style="width: 12px;" />
						<p class="link" on:click={handleConnect} on:keydown>LOGIN</p>
						<div style="width: 4px;" />
						{#if $connecting}
							<img src={`${assets}/icons/loader.svg`} alt="loading" class="rotating" />
						{/if}
					</div>
				</div>
				<div style="height: 120px;" />
				<div class="header">
					<h1>A platform for all your web3 freelancing needs</h1>
					<p class="about">
						HonestWork helps you find the best Web3 freelance job offers and hire quality talents
						for your Web3 projects.
					</p>
					<div style="height: 12px;" />
					<div class="button-container">
						<a class="explore" href={`${base}/jobs`}>explore now</a>
						<a class="mint-nft-button" href={`${base}/mint`}>mint genesis nft</a>
					</div>
					<div style="height: 4px;" />
					<div class="socials">
						<a href="https://twitter.com/HonestWorkDAO" target="_blank" rel="noopener noreferrer">
							<img src={`${assets}/icons/landing/twitter.svg`} alt="Twitter" class="icon" />
						</a>
						<a href="https://discord.gg/jbU72fTfTd" target="_blank" rel="noopener noreferrer">
							<img src={`${assets}/icons/landing/discord.svg`} alt="Discord" class="icon" />
						</a>
						<a href="https://github.com/honestworkdao" target="_blank" rel="noopener noreferrer">
							<img src={`${assets}/icons/landing/github.svg`} alt="Github" class="icon" />
						</a>
						<a
							href="https://www.linkedin.com/company/honestworkdao/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={`${assets}/icons/landing/linkedin.svg`} alt="LinkedIn" class="icon" />
						</a>
					</div>
					<div style="height: 120px;" />
				</div>
				<div class="iframe-wrapper">
					<div class="desktop-iframe">
						<iframe
							class="myframe"
							width="100%"
							loading="lazy"
							src="https://www.youtube.com/embed/re8Ac9jpup0?controls=0"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
						/>
					</div>
				</div>
			</div>
			<div style="height: 120px;" />
			<FeaturesCards />
			<div style="height: 120px;" />
			<BenefitsCards />
			<div style="height: 160px;" />
			<div class="faq">
				<AI />
			</div>
			<div style="height: 480px;" />
			<img src="{`${assets}/assets/laser-grid.png`} " alt="HonestWork" class="bg" />
		</div>
	</div>
	<Svrollbar {viewport} {contents} />
</div>

<style>
	.iframe-wrapper {
		max-width: 960px;
		width: 90%;
		filter: drop-shadow(0px 0px 30px rgba(255, 211, 105, 0.1));
	}
	.faq {
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 42;
	}
	.bg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		/* z-index: -1; */
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
		background-color: var(--color-dark);
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
		height: 100vh;
	}
	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
	.contents {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.hero {
		background-size: initial;
		background-position: right 0px top 0px;
		background-repeat: no-repeat;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.5px solid var(--color-light-10);
		width: 80vw;
		max-width: 960px;
		padding: 16px;
	}
	.socials {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}
	.socials a {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.logo {
		display: flex;
		flex-direction: row;
		gap: 8px;
		align-items: center;
	}
	.text {
		font-family: 'Proto Mono';
		font-style: normal;
		font-weight: 600;
		font-size: 13px;
		line-height: 12px;
		letter-spacing: 0.05em;
		color: var(--color-light);
	}
	.login {
		font-family: 'Proto Mono';
		font-style: normal;
		font-weight: 600;
		font-size: 13px;
		line-height: 16px;
		text-align: center;
		color: var(--color-primary);
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.link:hover {
		color: var(--color-dark);
	}
	.header {
		display: flex;
		flex-direction: column;
		gap: 16px;
		justify-content: center;
		align-items: center;
		width: 100%;
		text-align: center;
		max-width: 720px;
	}
	h1 {
		font-family: 'Proto Mono';
		font-style: normal;
		font-weight: 600;
		font-size: 40px;
		line-height: 52px;
		color: var(--color-primary);
		margin: 0px;

		/* text-shadow: 0px 0px 50px rgba(255, 211, 105, 0.2); */
	}
	.about {
		font-family: 'DM Mono';
		font-size: 16px;
		line-height: 24px;
		margin: 0 0 20px;
		max-width: 560px;
		color: var(--color-light);
	}
	.button-container {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}
	@media (max-width: 720px) {
		.button-container {
			flex-direction: column;
		}
	}
	.explore {
		padding: 8px 12px;
		background: var(--color-primary);
		border: 1px solid rgba(255, 255, 255, 0.2);
		/* box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.2); */
		cursor: pointer;
		font-weight: 600;
		color: var(--color-dark);
		transition: border 0.2s ease-in 0s;
	}
	.explore:hover {
		border: 1px solid var(--color-primary);
	}
	.mint-nft-button {
		padding: 8px 12px;
		background: #101112;
		border: 1px solid rgba(255, 255, 255, 0.2);
		/* box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.2); */
		cursor: pointer;
		font-weight: 600;
		color: var(--color-primary);
		transition: border 0.2s ease-in 0s;
	}
	.mint-nft-button:hover {
		border: 1px solid var(--color-primary);
	}
	.icon {
		cursor: pointer;
		opacity: 0.2;
		height: 20px;
		width: 20px;
	}
	.icon:hover {
		opacity: 1;
	}
	@media (max-width: 720px) {
		.header {
			max-width: 80vw;
		}
		h1 {
			font-size: 32px;
			line-height: 40px;
		}
	}
	@media (max-width: 550px) {
		h1 {
			font-size: 24px;
		}
		.about {
			font-size: 14px;
		}
	}
	.desktop-iframe {
		position: relative;
		overflow: hidden;
		padding-top: 56.25%;
		width: 100%;
		max-width: 960px;
	}
	.myframe {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
</style>
