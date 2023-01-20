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
	() => import('./nodes/12'),
	() => import('./nodes/13')];

export const server_loads = [0];

export const dictionary = {
	"/": [2],
	"/(subpages)/auth": [~3],
	"/creator/[address]": [~5],
	"/jobs": [~8],
	"/job/[address]": [~6],
	"/job/[address]/[slot]": [~7],
	"/listings": [~9],
	"/messages": [~10],
	"/(subpages)/mint": [4],
	"/new_job": [11],
	"/profile": [~12],
	"/skills": [~13]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};