<script lang="ts">
    let freelancer = false;

    // $: freelancer;
</script>

<div class="container">
    <button on:click={() => freelancer = false} class="button">Employer</button>
    <button on:click={() => freelancer = true} class="button">Freelancer</button>
    {#if !freelancer}
    <div class="features-card">
        <div class="info">
            <h3 class="title">Post a job without a hassle</h3>
            <div class="description-container">
                <div class="description">
                    <img src="icons/landing/dinosaur.svg" alt="Dinosaur icon" class="icon">
                    <p class="feature">Create a job listing for an unlimited duration</p>
                </div>
                <div class="description">
                    <img src="icons/landing/script-text.svg" alt="Script text icon" class="icon">
                    <p class="feature">Start conversations with the best applicants through embedded messaging</p>
                </div>
            </div>
            <a href="/" class="button">Post a Job</a>
        </div>
        <img src="assets/landing/profile.png" alt="Profile" class="featured-image">
    </div>

    <div class="features-card reverse">
        <div class="info">
            <h3 class="title">Find the best talents</h3>
            <div class="description-container">
                <div class="description">
                    <img src="icons/landing/dinosaur.svg" alt="Dinosaur icon" class="icon">
                    <p class="feature">Create a job listing for an unlimited duration</p>
                </div>
                <div class="description">
                    <img src="icons/landing/script-text.svg" alt="Script text icon" class="icon">
                    <p class="feature">Start conversations with the best applicants through embedded messaging</p>
                </div>
            </div>
            <a href="/" class="button">Post a Job</a>
        </div>
        <img src="assets/landing/profile.png" alt="Profile" class="featured-image">
    </div>

    <div class="features-card">
        <div class="info">
            <h3 class="title">Safe on-chain payments</h3>
            <div class="description-container">
                <div class="description">
                    <img src="icons/landing/dinosaur.svg" alt="Dinosaur icon" class="icon">
                    <p class="feature">Create a job listing for an unlimited duration</p>
                </div>
                <div class="description">
                    <img src="icons/landing/script-text.svg" alt="Script text icon" class="icon">
                    <p class="feature">Start conversations with the best applicants through embedded messaging</p>
                </div>
            </div>
            <a href="/" class="button">Post a Job</a>
        </div>
        <img src="assets/landing/profile.png" alt="Profile" class="featured-image">
    </div>
    {:else}
    <div class="features-card">
        <div class="info">
            <h3 class="title">On-chain reputation</h3>
            <div class="description-container">
                <div class="description">
                    <img src="icons/landing/dinosaur.svg" alt="Dinosaur icon" class="icon">
                    <p class="feature">Create a job listing for an unlimited duration</p>
                </div>
                <div class="description">
                    <img src="icons/landing/script-text.svg" alt="Script text icon" class="icon">
                    <p class="feature">Start conversations with the best applicants through embedded messaging</p>
                </div>
            </div>
            <a href="/" class="button">Post a Job</a>
        </div>
        <img src="assets/landing/profile.png" alt="Profile" class="featured-image">
    </div>

    <div class="features-card reverse">
        <div class="info">
            <h3 class="title">Get paid in crypto</h3>
            <div class="description-container">
                <div class="description">
                    <img src="icons/landing/dinosaur.svg" alt="Dinosaur icon" class="icon">
                    <p class="feature">Create a job listing for an unlimited duration</p>
                </div>
                <div class="description">
                    <img src="icons/landing/script-text.svg" alt="Script text icon" class="icon">
                    <p class="feature">Start conversations with the best applicants through embedded messaging</p>
                </div>
            </div>
            <a href="/" class="button">Post a Job</a>
        </div>
        <img src="assets/landing/profile.png" alt="Profile" class="featured-image">
    </div>

    <div class="features-card">
        <div class="info">
            <h3 class="title">Find premium web3 freelance jobs</h3>
            <div class="description-container">
                <div class="description">
                    <img src="icons/landing/dinosaur.svg" alt="Dinosaur icon" class="icon">
                    <p class="feature">Create a job listing for an unlimited duration</p>
                </div>
                <div class="description">
                    <img src="icons/landing/script-text.svg" alt="Script text icon" class="icon">
                    <p class="feature">Start conversations with the best applicants through embedded messaging</p>
                </div>
            </div>
            <a href="/" class="button">Post a Job</a>
        </div>
        <img src="assets/landing/profile.png" alt="Profile" class="featured-image">
    </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 120px;
        width: 100%;
    }
    .features-card {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 57px;
        background: var(--color-dark);
        width:100%;
        max-width: 879px;
    }
    .reverse {
        flex-direction: row-reverse;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 40px;
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
        /* or 171% */
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