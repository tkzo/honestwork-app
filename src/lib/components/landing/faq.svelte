<script lang="ts">
    import { gsap } from "gsap";
    let open = false;

    const setOpen = () => {
    if (!open) {
      gsap.to(`.chevron-${card.question}`, { rotation: 90, duration: 0.3 });
    } else {
      gsap.to(`.chevron-${card.question}`, { rotation: 0, duration: 0.3 });
    }
    open = !open;
  };


    type FAQCard = {
        question: string;
        answer: string
    }
    let FAQCards: FAQCard[] = [
        {
            question:'How to create a profile in HonestWork?',
            answer: 'To create a freelancer profile, you need an HonestWork NFT. Then simply connect with your crypto wallet and fill in your profile information.'
        },
        {
            question:'Why do I need HonestWork NFT?',
            answer: 'With HonestWork NFT, you can create a freelancer profile and apply for jobs. Additionally, HonestWork NFT is your work experience record on-chain. Ratings and finished projects are saved inside your HonestWork NFT, and they are yours to keep even when you stop using our platform.'
        },
        {
            question:'How to get HonestWork NFT?',
            answer: 'You can mint HonestWork NFT in the HonestWork app or buy it on NFT marketplace (e.g. OpenSea) if available.'
        }
    ]
</script>

<div class="container">
    {#each FAQCards as card, index}
    <div on:click={setOpen} on:keydown={setOpen} style="cursor:pointer;" class="faq-card">
        <div class="question-box">
            <div class="question">{card.question}</div>
            <img src="icons/landing/chevron.svg" alt="Chevron" class={`chevron-{${card.question}}`} />
        </div>
            {#if open}
                <div style="height: 24px"></div>
                <div class="answer">{card.answer}</div>  
            {/if}
    </div>
    {/each} 
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 961px;
    }
    .faq-card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: 1px solid var(--color-light-20);
        padding: 14px 20px;
    }
    .question-box{
        width: 100%;
        justify-content: space-between;
        display: flex;
        align-items: center;
    }
    .question {
        font-family: 'Proto Mono';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
    }
    .answer {
        font-family: 'Ubuntu Mono';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--color-light-60);
    }
</style>