import { writable } from 'svelte/store';

export let tokens = writable([Array<string>]);
