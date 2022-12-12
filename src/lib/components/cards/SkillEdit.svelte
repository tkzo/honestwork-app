<script lang="ts">
	let myform;
	export let slot;
	const submit = () => {};
</script>

<form method="POST" bind:this={myform} on:submit|preventDefault={submit} action="?/skills" />
