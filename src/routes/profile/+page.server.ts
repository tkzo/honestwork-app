import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ cookies }) => {
	const userAddress = cookies.get('address')!;
	const userSignature = cookies.get('signature');
	const userSalt = cookies.get('salt');

	if (userSignature && userSalt && userAddress) {
		let user = await getUser(userAddress);
		let skills = await getSkills(userAddress);
		user.address = userAddress;
		return { user: user, skills: skills };
	} else {
		throw redirect(301, '/create_account');
	}
};

const getUser = async (address: string) => {
	const url = `${env.PRIVATE_HONESTWORK_API}users/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		return json;
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};

const getSkills = async (address: string) => {
	const url = `${env.PRIVATE_HONESTWORK_API}skills/${address}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		return { json: json };
	} else {
		console.log('HTTP-Error: ' + response.status);
		return response.status;
	}
};

export const actions: Actions = {
	profile: async ({ cookies, request }) => {
		const userAddress = cookies.get('address');
		const userSignature = cookies.get('signature');
		const userSalt = cookies.get('salt');
		const data = await request.formData();
		let cloud_url;
		if (data.get('file_url') != '') {
			cloud_url = env.PRIVATE_SPACES_URL + '/' + userAddress + '/' + data.get('file_url');
		}
		const body = {
			username: data.get('username'),
			show_ens: data.get('show_ens') == 'on' ? true : false,
			title: data.get('title'),
			email: data.get('email'),
			bio: data.get('bio'),
			image_url: cloud_url,
			nft_address: data.get('nft_address'),
			nft_id: data.get('nft_id'),
			show_nft: data.get('show_nft') == 'on' ? true : false,
			timezone: '',
			links: [data.get('link-0'), data.get('link-1'), data.get('link-2')]
		};

		console.log('Body:', body);

		const url = `${env.PRIVATE_HONESTWORK_API}users/${userAddress}/${userSalt}/${userSignature}`;
		let response = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const json = await response.json();
			console.log(json);
		}
	},
	skills: async ({ cookies, request }) => {
		const userAddress = cookies.get('address');
		const userSignature = cookies.get('signature');
		const userSalt = cookies.get('salt');
		const data = await request.formData();
		let cloud_url_0 = '';
		let cloud_url_1 = '';
		let cloud_url_2 = '';
		let cloud_url_3 = '';
		let cloud_url_4 = '';
		let cloud_url_5 = '';
		let cloud_url_6 = '';
		let cloud_url_7 = '';

		if (data.get('file_url_0') != '') {
			cloud_url_0 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_0'
			)}/${data.get('file_url_0')}`;
		}
		if (data.get('file_url_1') != '') {
			cloud_url_1 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_1'
			)}/${data.get('file_url_1')}`;
		}
		if (data.get('file_url_2') != '') {
			cloud_url_2 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_2'
			)}/${data.get('file_url_2')}`;
		}
		if (data.get('file_url_3') != '') {
			cloud_url_3 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_3'
			)}/${data.get('file_url_3')}`;
		}
		if (data.get('file_url_4') != '') {
			cloud_url_4 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_4'
			)}/${data.get('file_url_4')}`;
		}
		if (data.get('file_url_5') != '') {
			cloud_url_5 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_5'
			)}/${data.get('file_url_5')}`;
		}
		if (data.get('file_url_6') != '') {
			cloud_url_6 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_6'
			)}/${data.get('file_url_6')}`;
		}
		if (data.get('file_url_7') != '') {
			cloud_url_7 = `${env.PRIVATE_SPACES_URL}/${userAddress}/${data.get('skill_slot')}/${data.get(
				'image_slot_7'
			)}/${data.get('file_url_7')}`;
		}

		const body = {
			slot: data.get('skill_slot'),
			title: data.get('title'),
			minimum_price: parseInt(data.get('minimum_price')!.toString()),
			links: [data.get('link-0'), data.get('link-1'), data.get('link-2')],
			image_urls: [
				cloud_url_0,
				cloud_url_1,
				cloud_url_2,
				cloud_url_3,
				cloud_url_4,
				cloud_url_5,
				cloud_url_6,
				cloud_url_7
			],
			description: data.get('description'),
			publish: data.get('publish') == 'on' ? true : false,
			created_at: Math.floor(new Date().getTime() / 1000)
		};

		if (data.get('skill_method') == 'add') {
			const url = `${env.PRIVATE_HONESTWORK_API}skills/${userAddress}/${userSalt}/${userSignature}`;
			let response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const json = await response.json();
				console.log(json);
			}
		} else {
			const url = `${
				env.PRIVATE_HONESTWORK_API
			}skills/${userAddress}/${userSalt}/${userSignature}/${data.get('skill_slot')}`;
			let response = await fetch(url, {
				method: 'PATCH',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const json = await response.json();
				console.log(json);
			}
		}
	}
};
