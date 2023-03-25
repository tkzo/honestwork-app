<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { connectWallet } from '$lib/stores/Network';
	import { Svrollbar } from 'svrollbar';
	import { assets } from '$app/paths';
	import FeaturesCards from '$lib/components/landing/FeaturesCards.svelte';
	import BenefitsCards from '$lib/components/landing/BenefitsCards.svelte';
	import Faq from '$lib/components/landing/Faq.svelte';
	let viewport: Element;
	let contents: Element;
	const handleConnect = async () => {
		await connectWallet();
		goto('/jobs');
	};
</script>

<svelte:head>
	<title>HonestWorkDAO</title>
	<meta name="description" content="HonestWork" />
</svelte:head>

<div class="wrapper">
	<div class="viewport" bind:this={viewport}>
		<div class="contents" bind:this={contents}>
			<div class="hero">
				<!-- <div class="nav"> -->
				<!-- 	<div class="logo"> -->
				<!-- 		<img src={`${assets}/icons/landing/logo.svg`} alt="HonestWork Logo" /> -->
				<!-- 		<div class="text">H0NESTW0RK</div> -->
				<!-- 	</div> -->
				<!-- 	<div class="login link" on:click={handleConnect} on:keydown>LOGIN TO APP</div> -->
				<!-- </div> -->
				<div style="height: 100px;" />
				<div class="header">
					<h1>A platform for all your web3 freelancing needs</h1>
					<p class="about">
						HonestWork helps you find the best Web3 freelance job offers and hire quality talents for your Web3 projects. 
						<span class="yellow">Launching soon.</span>
					</p>
					<a
						class="explore"
						href={`https://docs.google.com/forms/d/e/1FAIpQLSfcaBQtSa8s36fF3q69KoXT-uFYG4ebZNId5HbpJggGByUbmQ/viewform`}
						>join the waitlist</a
					>
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
					<div style="height: 64px;" />
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
			<div style="height: 120px;" />
			<div class="faq">
				<Faq />
			</div>
			<div style="height: 120px;" />
			<img src="{`${assets}/assets/laser-grid.png`} " alt="HonestWork" class="bg" />
		</div>
	</div>
	<Svrollbar {viewport} {contents} />
</div>

<style>
	.iframe-wrapper {
		max-width: 960px;
		width: 90%;
	}
	.faq {
		z-index: 10;
	}
	.bg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
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
		background: linear-gradient(180deg, #16181c 0%, var(--color-dark) 100%);
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
		border-bottom: 1px solid var(--color-light-20);
		width: 80vw;
		max-width: 960px;
		padding: 12px;
	}
	.socials {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
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
		font-size: 48px;
		line-height: 60px;
		color: var(--color-primary);
		text-shadow: 0px 0px 50px rgba(255, 211, 105, 0.2);
		margin: 0 0 36px;
	}
	.about {
		font-family: 'DM Mono';
		font-size: 16px;
		line-height: 24px;
		margin: 0 0 20px;
		max-width: 560px;
	}
	.explore {
		padding: 8px 12px;
		background: #101112;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.2);
		cursor: pointer;
		font-weight: 600;
		color: var(--color-primary);
		transition: border 0.2s ease-in 0s;
	}
	.explore:hover {
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
