<script lang="ts">
	import { goto } from '$app/navigation';
	import { connectWallet } from '$lib/stores/Network';
	import { Svrollbar } from 'svrollbar';
	import { assets } from '$app/paths';
	// import { userConnected, xmtpConnected, userState } from '$lib/stores/Network';
	import FeaturesCards from '$lib/components/landing/FeaturesCards.svelte';
	import BenefitsCards from '$lib/components/landing/BenefitsCards.svelte';
	import Faq from '$lib/components/landing/Faq.svelte';

	let viewport: Element;
	let contents: Element;

	const handleConnect = async () => {
		await connectWallet();
		goto('/skills');
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
				<div style="height: 32px;"></div>
				<div class="nav">
					<div class="logo">
						<img src={`${assets}/icons/landing/logo.svg`} alt="HonestWork Logo" class="icon" />
						<div class="text">H0NESTW0RK</div>
					</div>
					<div class="login" on:click={handleConnect} on:keydown>LOGIN TO APP</div>
				</div>
				<div style="height: 100px;"></div>
				<div class="header">
					<h1>A platform for all your web3 freelancing needs</h1>
					<p class="about">HonestWork connects clients with top-rated blockchain experts, including copywriters, developers, and designers.</p>
					<div class="explore" on:click={() => goto('/skills')} on:keydown>START EXPLORING</div>
					<div class="socials">
						<!-- icons -->
					</div>
				</div>
			</div>
			<div style="height: 120px;"></div>
			<FeaturesCards />
			<div style="height: 120px;"></div>
			<BenefitsCards />
			<div style="height: 120px;"></div>
			<Faq />
			<div style="height: 120px;"></div>
		</div>
	</div>
	<Svrollbar alwaysVisible {viewport} {contents} />
</div>

<style>
	.wrapper {
		/* width: 80vw; */
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
	}
	.hero {
		background: linear-gradient(180deg, #16181C 0%, var(--color-dark) 100%);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-light-10);
		width: 80vw;
		padding: 12px;
	}
	.logo{
		display: flex;
		flex-direction: row;
		gap:8px;
		align-items: center;

	}
	.icon {
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
	.header {
		display: flex;
		flex-direction: column;
		gap:16px;
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
		font-family: 'Ubuntu Mono';
		font-size: 16px;
		line-height: 24px;
		margin: 0 0 20px;
		max-width: 496px;
	}
	.explore {
		padding: 12px;
		background: #101112;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.2);
		cursor: pointer;
		font-weight: 600;
		color: var(--color-primary);
	}
	.socials {

	}
</style>
