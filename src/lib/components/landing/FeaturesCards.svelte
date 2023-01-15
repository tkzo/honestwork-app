<script lang="ts">
    let employer = true;
    let isSelected: boolean;

    type FeatureCard = {
        title: string;
        icon1: string;
        icon1alt: string;
        feature1: string;
        icon2: string;
        icon2alt: string;
        feature2: string;
        buttontext: string;
        imgsrc: string;
        imgalt:string;
    }
    let employersFeatureCards: FeatureCard[] = [
        {
        title: 'Post a job without a hassle',
        icon1: 'icons/landing/dinosaur.svg',
        icon1alt: 'Dinosaur icon',
        feature1: 'Create a job listing for an unlimited duration',
        icon2: 'icons/landing/script-text.svg',
        icon2alt: 'Script text icon',
        feature2: 'Start conversations with the best applicants through embedded messaging',
        buttontext: 'Post a Job',
        imgsrc: 'assets/landing/profile.png',
        imgalt:'Profile',
        },
        {
        title: 'Find the best talents',
        icon1: 'icons/landing/dinosaur.svg',
        icon1alt: 'Dinosaur icon',
        feature1: 'Browse an extensive library of skills to find exactly what you need',
        icon2: 'icons/landing/script-text.svg',
        icon2alt: 'Script text icon',
        feature2: 'Easily view previous work history and ratings on freelancers’ profile',
        buttontext: 'Post a Job',
        imgsrc: 'assets/landing/profile.png',
        imgalt:'Profile',
        },
        {
        title: 'Safe on-chain payments',
        icon1: 'icons/landing/dinosaur.svg',
        icon1alt: 'Dinosaur icon',
        feature1: 'Pay with any on-chain token, including custom DAO tokens',
        icon2: 'icons/landing/script-text.svg',
        icon2alt: 'Script text icon',
        feature2: 'Safe payments through a customized Escrow Contract',
        buttontext: 'Post a Job',
        imgsrc: 'assets/landing/profile.png',
        imgalt:'Profile',
        }
    ]
    let freelancersFeatureCards: FeatureCard[] = [
        {
        title: 'On-chain reputation',
        icon1: 'icons/landing/dinosaur.svg',
        icon1alt: 'Dinosaur icon',
        feature1: 'Create unique profiles with ENS names and NFTs',
        icon2: 'icons/landing/script-text.svg',
        icon2alt: 'Script text icon',
        feature2: 'HonestWork NFT stores your ratings and completed projects on-chain',
        buttontext: 'Explore Jobs',
        imgsrc: 'assets/landing/profile.png',
        imgalt:'Profile',
        },
        {
        title: 'Get paid in crypto',
        icon1: 'icons/landing/dinosaur.svg',
        icon1alt: 'Dinosaur icon',
        feature1: 'Job payment is safely kept in an Escrow Contract while you are working on the task',
        icon2: 'icons/landing/script-text.svg',
        icon2alt: 'Script text icon',
        feature2: 'Get paid straight to your crypto wallet after successfully completing a task',
        buttontext: 'Explore Jobs',
        imgsrc: 'assets/landing/profile.png',
        imgalt:'Profile',
        },
        {
        title: 'Find premium web3 freelance jobs',
        icon1: 'icons/landing/dinosaur.svg',
        icon1alt: 'Dinosaur icon',
        feature1: 'Choose from the wide library of jobs listings',
        icon2: 'icons/landing/script-text.svg',
        icon2alt: 'Script text icon',
        feature2: 'List your skills and get noticed for what you do best',
        buttontext: 'Explore Jobs',
        imgsrc: 'assets/landing/profile.png',
        imgalt:'Profile',
        }
    ]
</script>

<div class="buttons-container">
    <button on:click={() => employer = true} class="{employer ? 'selected button' : 'button'}">Employers</button>
    <button on:click={() => employer = false} class="{!employer ? 'selected button' : 'button'}">Freelancers</button>
</div>
<div style="height: 100px;"></div>
<div class="container">
    {#if employer}
        {#each employersFeatureCards as card, index}
            <div class="features-card {index % 2 == 0 ? 'img-right' : 'img-left'}">
                <div class="info">
                    <h3 class="title">{card.title}</h3>
                    <div class="description-container">
                        <div class="description">
                            <img src={card.icon1} alt={card.icon1alt} class="icon">
                            <p class="feature">{card.feature1}</p>
                        </div>
                        <div class="description">
                            <img src={card.icon2} alt={card.icon2alt} class="icon">
                            <p class="feature">{card.feature2}</p>
                        </div>
                    </div>
                    <a href="/jobs" class="button">{card.buttontext}</a>
                </div>
                <div class="img-container">
                    <img src={card.imgsrc} alt={card.imgalt} class="featured-image">
                </div>            
            </div>
        {/each}
    {:else}
        {#each freelancersFeatureCards as card, index}
            <div class="features-card {index % 2 == 0 ? 'img-right' : 'img-left'}">
                <div class="info">
                    <h3 class="title">{card.title}</h3>
                    <div class="description-container">
                        <div class="description">
                            <img src={card.icon1} alt={card.icon1alt} class="icon">
                            <p class="feature">{card.feature1}</p>
                        </div>
                        <div class="description">
                            <img src={card.icon2} alt={card.icon2alt} class="icon">
                            <p class="feature">{card.feature2}</p>
                        </div>
                    </div>
                    <a href="/jobs" class="button">{card.buttontext}</a>
                </div>
                <div class="img-container">
                    <img src={card.imgsrc} alt={card.imgalt} class="featured-image">
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>
    .buttons-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 120px;
        width: 100%;
    }
    .features-card {
        display: flex;
        align-items: center;
        gap: 57px;
        background: var(--color-dark);
        width:100%;
        max-width: 879px;
        justify-content: space-between;
    }
    .img-right {
        flex-direction: row;
    }
    .img-left {
        flex-direction: row-reverse;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 50%;
    }
    .icon {
        height: 32px;
        width: 32px;
    }
    .title {
        text-transform: uppercase;
        color: var(--color-primary);
        margin: 0;
    }
    .description-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
        justify-content: flex-start;
        width: 100%;
    }
    .description {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap:24px;
    }
    .feature {
        font-family: 'Ubuntu Mono';
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--color-light);
        text-transform: none;
        width: 100%;
        max-width: 300px;
    }
    .button {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px;
        gap: 10px;
        border: 1px solid var(--color-light-10);
        filter: drop-shadow(0px 0px 50px var(--color-primary));
        cursor: pointer;
        color: var(--color-primary);
    }
    .selected {
        background-color: var(--color-primary);
        color: var(--color-dark);
    }
    .img-container{
        width: 50%;
    }
    .featured-image {
        width: 100%;
        max-width: 420px;
    }

    /* @media (max-width:754px) {
        .container {
            flex-direction: column;
        }
    }
    @media (max-width:550px) {
        .features-card {
            max-width: 280px;
        }
    } */
</style>