<script lang="ts">
	import Question from "./Question.svelte";

    type FAQCard = {
        id:number;
        question: string;
        answer: string
    }
    let FAQCards: FAQCard[] = [
        {
            id:1,
            question:'How to create a profile in HonestWork?',
            answer: 'To create a freelancer profile, you need an HonestWork NFT. Then simply connect with your crypto wallet and fill in your profile information.'
        },
        {
            id:2,
            question:'Why do I need HonestWork NFT?',
            answer: 'With HonestWork NFT, you can create a freelancer profile and apply for jobs. Additionally, HonestWork NFT is your work experience record on-chain. Ratings and finished projects are saved inside your HonestWork NFT, and they are yours to keep even when you stop using our platform.'
        },
        {
            id:3,
            question:'How to get HonestWork NFT?',
            answer: 'You can mint HonestWork NFT in the HonestWork app or buy it on NFT marketplace (e.g. OpenSea) if available.'
        }
    ]
</script>

<div class="container">
    {#each FAQCards as card, index}
        <Question card={card} />
    {/each} 
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 961px;
    }
</style>