import { writable } from 'svelte/store';

export let chosen_skill_slot = writable(-1);
export let skill_upload_urls = writable([[new Response()]]);
