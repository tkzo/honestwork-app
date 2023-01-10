<script lang="ts">
	import { each } from "svelte/internal";



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

{#each FAQCards as card}
    <div class="question">{card.question}</div>
    <div class="answer">{card.answer}</div>  
{/each} 