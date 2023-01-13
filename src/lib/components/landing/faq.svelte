<script lang="ts">
	import Question from "$lib/components/landing/Question.svelte";

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
            question:'How to get HonestWork NFT?',
            answer: 'You can mint HonestWork NFT in the HonestWork app or buy it on the NFT marketplace (e.g. OpenSea) if available.'
        },
        {
            id:3,
            question:'How to get a freelance job in HonestWork?',
            answer: 'You can apply to the existing jobs on the “Jobs” page or receive offers based on the skills listed on your profile.'
        },
        {
            id:4,
            question:'How will I receive payment for the delivered project?',
            answer: 'After the employer accepts the delivered project, you can claim the payment by clicking the “Claim” button in the chat. You’ll receive the payment in your crypto wallet.'        },
        {
            id:5,
            question:'How to post a job in HonestWork?',
            answer: 'You can post a job by clicking the “Post a Job” button on the Jobs page. After filling out the job listing form, you’ll be asked to connect with your crypto wallet and approve the transaction for the service fee. After a successful transaction, your job listing will appear on the Jobs page.'
        },
        {
            id:6,
            question:'How to pay for work?',
            answer: 'When you make a deal with a freelancer, you’ll be prompted to create a smart contract that solidifies the deal. To create the smart contract, you’ll need to pay the agreed-upon amount and success fee. Payment will be safely stored in the Escrow Contract until you unlock it so the freelancer can claim it.'
        }
    ]
</script>

<div class="container">
    <h2>FAQ</h2>
    {#each FAQCards as card}
        <Question card={card} />
        be normal pls
    {/each} 
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 80vw;
    }
    h2 {
        font-family: 'Proto Mono';
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 28px;
        color: var(--color-primary);
        text-align: center;
        margin: 0 0 24px;
        padding: 0 0 12px;
        border-bottom: 1px solid var(--color-light-20);
        text-shadow: 0px 0px 50px rgba(255, 211, 105, 0.5);
    }
</style>