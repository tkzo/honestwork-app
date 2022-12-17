import { writable } from 'svelte/store';

export let chosen_skill_slot = writable(-1);
export let skill_upload_urls = writable([Array<Response>]);
export let skill_add = writable(false);
export let changes_made = writable(false);
