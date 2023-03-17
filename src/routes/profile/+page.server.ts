import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

const apiUrl =
	parseInt(env.PRODUCTION_ENV) == 1 ? env.PRIVATE_HONESTWORK_API : env.PRIVATE_LOCAL_HONESTWORK_API;

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('honestwork_address');
	const userSignature = cookies.get('honestwork_signature');

	if (userAddress && userSignature) {
		const callUrl = `${apiUrl}/verify/${userAddress}/${userSignature}`;
		let callResponse = await fetch(callUrl, {
			headers: new Headers({
				Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
				'Content-Type': 'application/json'
			})
		});
		let calldata = await callResponse.json();
		if (calldata == 'success') {
			let user = await getUser(userAddress);
			let skills = await getSkills(userAddress);
			let jobs = await getJobs(userAddress);
			user.address = userAddress;
			return { user: user, skills: skills, jobs: jobs };
		} else {
			throw redirect(301, '/auth');
		}
	}
};

const getUser = async (address: string) => {
	const url = `${apiUrl}/users/${address}`;
	let response = await fetch(url, {
		headers: new Headers({
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		})
	});
	if (response.ok) {
		let json = await response.json();
		return json;
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};

const getSkills = async (address: string) => {
	const url = `${apiUrl}/skills/${address}`;
	let response = await fetch(url, {
		headers: new Headers({
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		})
	});
	if (response.ok) {
		let json = await response.json();
		return { json: json };
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};

const getJobs = async (address: string) => {
	const url = `${apiUrl}/jobs/${address}`;
	let response = await fetch(url, {
		headers: new Headers({
			Authorization: 'Basic ' + btoa(`${env.PRIVATE_CLIENT_KEY}:${env.PRIVATE_CLIENT_PASSWORD}`),
			'Content-Type': 'application/json'
		})
	});
	if (response.ok) {
		let json = await response.json();
		return { json };
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};
