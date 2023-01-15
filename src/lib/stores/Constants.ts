import { assets } from '$app/paths';

export let placeholder_image = `${assets}/assets/xcopy.gif`;

export const chains = [
	{
		name: 'binance',
		id: 56,
		tokens: [
			{
				name: 'MockToken',
				symbol: 'MCKT',
				address: '0x6bf83F1af0350407c6766Af32818603E9c08E182',
				max_allowed: 1000000
			}
		]
	}
];

export const notifications = {
	postjob: {
		bodytext: 'looking for awesome people for your project?',
		cta: 'post a job',
		icon: '/icons/post.svg'
	},
	mint: {
		bodytext: 'grab an nft to get airdrop tokens from your activities!',
		cta: 'mint and start accumulating',
		icon: '/icons/trending.svg'
	},
	upgrade: {
		bodytext: 'you can list even more awesome skills by upgrading your nft!',
		cta: 'upgrade now',
		icon: '/icons/zap.svg'
	}
};

export const sticky_data = [
	{ duration: 7, price: 49 },
	{ duration: 14, price: 69 },
	{ duration: 30, price: 99 },
	{ duration: 0, price: 0 }
];

export const form_limitations = {
	job: {
		username: {
			min: 5,
			max: 40
		},
		title: {
			min: 5,
			max: 40
		},
		description: {
			rows: 20,
			min: 100,
			max: 1000
		},
		tags: {
			min: 1,
			max: 3
		},
		links: {
			min: 1,
			max: 3
		},
		budget: {
			min: 1000,
			max: 1000000
		},
		installments: {
			min: 2,
			max: 3
		},
		timezone: {
			min: -12,
			max: 12
		},
		tokens_accepted: {
			min: 1
		}
	}
};
