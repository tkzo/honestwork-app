export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12')];

export const server_loads = [];

export const dictionary = {
	"/": [2],
	"/(subpages)/connect_wallet": [~3],
	"/(subpages)/create_account": [~4],
	"/jobs": [~7],
	"/job/[address]/[slot]": [~6],
	"/listings": [~8],
	"/messages": [~9],
	"/(subpages)/mint": [5],
	"/new_job": [10],
	"/profile": [~11],
	"/skills": [~12]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};