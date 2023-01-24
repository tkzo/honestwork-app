<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor, EditorContent, BubbleMenu, createEditor, FloatingMenu } from 'svelte-tiptap';
	import { createEventDispatcher } from 'svelte';

	let editor: Readable<Editor>;

	const dispatch = createEventDispatcher();

	export let content = `<h4>Example Heading</h4>
          <p>Hey, try to select some text here. There will popup a menu for selecting some inline styles.
             Remember: you have full control about content and styling of this menu..</p><ul><p>Some list item..</p></ul>
        `;

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit],
			content: content
		});
	});
	$: if ($editor && $editor.contentElement) emitInput();

	const emitInput = () => {
		if ($editor && $editor.contentElement) {
			dispatch('content', {
				content: $editor.contentElement.innerHTML
			});
		}
	};
	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};
	const toggleItalic = () => {
		$editor.chain().focus().toggleItalic().run();
	};
	const toggleH1 = () => {
		$editor.chain().focus().toggleHeading({ level: 4 }).run();
	};
	const toggleList = () => {
		$editor.chain().focus().toggleBulletList().run();
	};
</script>

<svelte:head>
	<title>Bubble Menu | Tiptap Svelte</title>
</svelte:head>

{#if editor}
	<div>
		<BubbleMenu editor={$editor}>
			<div class="flex">
				<button class="button" on:click={toggleBold}><p>b</p></button>
				<button class="button" on:click={toggleItalic}><p>i</p></button>
			</div>
		</BubbleMenu>
		<FloatingMenu editor={$editor}>
			<div class="flex">
				<button class="button" on:click={toggleH1}><p>h1</p></button>
				<button class="button" on:click={toggleList}><p>list</p></button>
			</div>
		</FloatingMenu>
	</div>
{/if}

<EditorContent editor={$editor} />

<style>
	.flex {
		display: flex;
		flex-direction: row;
		gap: 2px;
	}
	.button {
		background: var(--color-dark);
		color: var(--color-primary);
		cursor: pointer;
		display: inline-block;
		font-size: 14px;
		padding: 4px 8px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
	}
	.button:hover {
		background: var(--color-primary);
		color: var(--color-dark);
	}
</style>
