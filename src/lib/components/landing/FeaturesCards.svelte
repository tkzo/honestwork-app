<script lang="ts">
	import { quintOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
    import { employersFeatureCards, freelancersFeatureCards} from '$lib/stores/Constants';

    let employer = true;
</script>

<div class="buttons-container">
    <div class="line"></div>
    <button on:click={() => employer = true} class="{employer ? 'selected button' : 'button'}">Employers</button>
    <button on:click={() => employer = false} class="{!employer ? 'selected button' : 'button'}">Freelancers</button>
    <div class="line"></div>
</div>
<div style="height: 100px;"></div>
<div class="container">
    {#if employer}
        {#each employersFeatureCards as card, index}
            <div class="features-card {index % 2 == 0 ? 'img-right' : 'img-left'}"
            in:fly="{{ y: 200, delay:200, duration: 2000, easing: quintOut}}"
            out:fade="{{duration:400, delay:100}}" >
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
                    <a href="/jobs" class="cta">{card.buttontext}</a>
                </div>
                <div class="img-container">
                    <img src={card.imgsrc} alt={card.imgalt} class="featured-image">
                </div>            
            </div>
        {/each}
    {:else}
        {#each freelancersFeatureCards as card, index}
            <div class="features-card {index % 2 == 0 ? 'img-right' : 'img-left'}"
            in:fly="{{ y: 200, delay:200, duration: 2000, easing: quintOut}}"
            out:fade="{{duration:400, delay:100}}">
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
                    <a href="/jobs" class="cta">{card.buttontext}</a>
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
        width: 80vw;
        max-width: 960px;
    }
    .line {
        height: 1px;
        background-color: var(--color-light-10);
        width: 100%;
        max-width: 371px;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 120px;
        width: 80vw;
        max-width: 960px;
        padding-bottom: 120px;;
        border-bottom: 1px solid var(--color-light-10);
    }
    .features-card {
        display: flex;
        align-items: center;
        gap: 57px;
        background: var(--color-dark);
        width:100%;
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
        font-family: 'Proto Mono';
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 40px;
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
    .cta {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px;
        gap: 10px;
        border: 1px solid var(--color-light-10);
		box-shadow: 0px 0px 50px rgba(255, 211, 105, 0.1);
        cursor: pointer;
        color: var(--color-primary);
        width: 247px;
        transition: background-color 0.12s linear 0s
    }
    .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 12px;
        border: 1px solid #FFD369;
        color:var(--color-primary);
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        transition: background-color 0.12s linear 0s
    }
    .cta:hover,
    .button:hover,
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

    @media (max-width:870px) {
        .title {
            font-size: 20px;
            line-height: 32px;
        }
        .feature {
            font-size: 14px;
            line-height: 20px;
        }
    }
    @media (max-width:754px) {
        .features-card {
            flex-direction: column;
        }
        .feature {
            max-width: 500px;
        }
        .info {
            justify-content: center;
            align-items: center;
        }
        .info,
        .img-container {
            width: 100%;
        }
        .featured-image {
            display: block;
            margin: 0 auto;
        }
    }
</style>