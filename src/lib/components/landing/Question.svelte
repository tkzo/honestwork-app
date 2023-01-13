<script lang="ts">
    import { gsap } from "gsap";
    let open = false;
    export let card: any;

    const setOpen = () => {
    if (!open) {
      gsap.to(`.chevron-${card.id}`, { rotation: -180, duration: 0.5 });
    } else {
      gsap.to(`.chevron-${card.id}`, { rotation: 0, duration: 0.5 });
    }
    open = !open;
  };


</script>

    <div on:click={setOpen} on:keydown={setOpen} style="cursor:pointer;" class="faq-card">
        <div class="question-box">
            <div class="question">{card.question}</div>
            <img src="icons/landing/chevron.svg" alt="Chevron" class={`chevron-${card.id}`} />
        </div>
            {#if open}
                <div style="height: 24px"></div>
                <div class="answer">{card.answer}</div>  
            {/if}
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