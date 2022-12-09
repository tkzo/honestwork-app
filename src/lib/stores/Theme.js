import { writable } from 'svelte/store';

// get from locals / unsafe cookies
export const theme = writable('light');
