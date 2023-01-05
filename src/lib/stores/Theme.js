import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';

export const setLocalTheme = () => {
	if (typeof localStorage !== 'undefined' && typeof localStorage.theme !== 'undefined') {
		let stored = localStorage.theme;
		theme.set(stored);
	} else {
		theme.set('dark');
	}
	themeLoaded.set(true);
};
export const theme = writable('');
export const themeLoaded = writable(false);

export const toggleTheme = (mode) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.theme = mode;
		theme.set(mode);
	}
};
