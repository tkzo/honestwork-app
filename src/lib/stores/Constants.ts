export let placeholder_image = 'assets/xcopy.gif';

export const chains = [
	{
		name: 'polygon',
		id: 137,
		tokens: [
			{
				name: 'matic',
				symbol: 'matic',
				address: '0x0000000000000000000000000000000000000000',
				max_allowed: 1000000
			},
			{
				name: 'usdc',
				symbol: 'usdc',
				address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
				max_allowed: 1000000
			},
			{
				name: 'usdt',
				symbol: 'usdt',
				address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
				max_allowed: 1000000
			},
			{
				name: 'wrapped eth',
				symbol: 'weth',
				address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
				max_allowed: 1000000
			},
			{
				name: 'fakeUSD',
				symbol: 'fUSD',
				address: '0x6bf83F1af0350407c6766Af32818603E9c08E182',
				max_allowed: 1000000
			}
		]
	}
];

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
