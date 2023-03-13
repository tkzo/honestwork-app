import { writable } from 'svelte/store';
import type { WatchlistType, FavoriteType } from '$lib/stores/Types';

type Metadata = {
	address: string;
	title: string;
};
let metadata: Metadata = { title: '', address: '' };

export let chosen_skill_slot = writable(-1);
export let chosen_job_slot = writable(-1);
export let skill_upload_urls = writable([Array<Response>]);
export let skill_add = writable(false);
export let changes_made = writable(false);
export let submitting = writable(false);
export let new_conversation_metadata = writable(metadata);
export let job_add = writable(false);
export let job_updated = writable(false);
export let user_watchlist = writable(Array<WatchlistType>());
export let user_favorites = writable(Array<FavoriteType>());
export let user_signed_in = writable(false);
