import { assets } from '$app/paths';
import type { FAQCard } from '$lib/stores/Types';
import type { FeatureCard } from '$lib/stores/Types';

export let FAQCards: FAQCard[] = [
	{
		id: 1,
		question: 'How to create a profile in HonestWork?',
		answer:
			'To create a freelancer profile, you need an HonestWork NFT. Then simply connect with your crypto wallet and fill in your profile information.'
	},
	{
		id: 2,
		question: 'How to get HonestWork NFT?',
		answer:
			'You can mint HonestWork NFT in the HonestWork app or buy it on the NFT marketplace (e.g. OpenSea) if available.'
	},
	{
		id: 3,
		question: 'How to get a freelance job in HonestWork?',
		answer:
			'You can apply to the existing jobs on the “Jobs” page or receive offers based on the skills listed on your profile.'
	},
	{
		id: 4,
		question: 'How will I receive payment?',
		answer:
			'After the employer accepts the delivered project, you can claim the payment by clicking the “Claim” button in the chat. You’ll receive the payment in your crypto wallet.'
	},
	{
		id: 5,
		question: 'How to post a job in HonestWork?',
		answer:
			'You can post a job by clicking the “Post a Job” button on the Jobs page. After filling out the job listing form, you’ll be asked to connect with your crypto wallet and approve the transaction for the service fee. After a successful transaction, your job listing will appear on the Jobs page.'
	},
	{
		id: 6,
		question: 'How to pay for work?',
		answer:
			'When you make a deal with a freelancer, you’ll be prompted to create a smart contract that solidifies the deal. To create the smart contract, you’ll need to pay the agreed-upon amount and success fee. Payment will be safely stored in the Escrow Contract until you unlock it so the freelancer can claim it.'
	}
];

export let employersFeatureCards: FeatureCard[] = [
	{
		title: 'Post a job without a hassle',
		icon1: 'icons/landing/dinosaur.svg',
		icon1alt: 'Dinosaur icon',
		feature1: 'Create a job listing for an unlimited duration',
		icon2: 'icons/landing/script-text.svg',
		icon2alt: 'Script text icon',
		feature2: 'Start conversations with the best applicants through embedded messaging',
		buttontext: 'Post a Job',
		imgsrc: 'assets/landing/profile.png',
		imgalt: 'Profile'
	},
	{
		title: 'Find the best talents',
		icon1: 'icons/landing/dinosaur.svg',
		icon1alt: 'Dinosaur icon',
		feature1: 'Browse an extensive library of skills to find exactly what you need',
		icon2: 'icons/landing/script-text.svg',
		icon2alt: 'Script text icon',
		feature2: 'Easily view previous work history and ratings on freelancers’ profile',
		buttontext: 'Post a Job',
		imgsrc: 'assets/landing/profile.png',
		imgalt: 'Profile'
	},
	{
		title: 'Safe on-chain payments',
		icon1: 'icons/landing/dinosaur.svg',
		icon1alt: 'Dinosaur icon',
		feature1: 'Pay with any on-chain token, including custom DAO tokens',
		icon2: 'icons/landing/script-text.svg',
		icon2alt: 'Script text icon',
		feature2: 'Safe payments through a customized Escrow Contract',
		buttontext: 'Post a Job',
		imgsrc: 'assets/landing/profile.png',
		imgalt: 'Profile'
	}
];

export const freelancersFeatureCards: FeatureCard[] = [
	{
		title: 'On-chain perks',
		icon1: 'icons/landing/dinosaur.svg',
		icon1alt: 'Dinosaur icon',
		feature1: 'Create unique profiles with ENS names and NFTs',
		icon2: 'icons/landing/script-text.svg',
		icon2alt: 'Script text icon',
		feature2: 'Receive airdrops based on your activity points',
		buttontext: 'Explore Jobs',
		imgsrc: 'assets/landing/profile.png',
		imgalt: 'Profile'
	},
	{
		title: 'Get paid in crypto',
		icon1: 'icons/landing/dinosaur.svg',
		icon1alt: 'Dinosaur icon',
		feature1: 'Job payment is safely kept in an Escrow Contract while you are working on the task',
		icon2: 'icons/landing/script-text.svg',
		icon2alt: 'Script text icon',
		feature2: 'Receive 100% of your earnings with no fees  ',
		buttontext: 'Explore Jobs',
		imgsrc: 'assets/landing/profile.png',
		imgalt: 'Profile'
	},
	{
		title: 'Find premium web3 freelance jobs',
		icon1: 'icons/landing/dinosaur.svg',
		icon1alt: 'Dinosaur icon',
		feature1: 'Choose from the wide library of jobs listings',
		icon2: 'icons/landing/script-text.svg',
		icon2alt: 'Script text icon',
		feature2: 'List your skills and get noticed for what you do best',
		buttontext: 'Explore Jobs',
		imgsrc: 'assets/landing/profile.png',
		imgalt: 'Profile'
	}
];

export let placeholder_image = `${assets}/assets/xcopy.gif`;

export const chains = [
	{
		name: 'binance',
		id: 56,
		tokens: [
			{
				name: 'MockToken',
				symbol: 'MCKT',
				address: '0x0eBd5ED8A9625ac2Cb06F63D7f6D06cE60D2C797',
				max_allowed: 1000000
			}
		],
		explorer: 'https://bscscan.com/address'
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
	},
	xmtp: {
		bodytext: "you're not receiving messages at the moment.",
		cta: 'connect xmtp',
		icon: '/icons/zap.svg'
	},
	launch: {
		bodytext: "HonestWork is launching soon!",
		cta: 'follow our twitter for the updates',
		icon: '/icons/twitter.svg'
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

export const erc20_abi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: 'name_',
				type: 'string'
			},
			{
				internalType: 'string',
				name: 'symbol_',
				type: 'string'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			}
		],
		name: 'allowance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [
			{
				internalType: 'uint8',
				name: '',
				type: 'uint8'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'subtractedValue',
				type: 'uint256'
			}
		],
		name: 'decreaseAllowance',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'spender',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'addedValue',
				type: 'uint256'
			}
		],
		name: 'increaseAllowance',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'transfer',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'transferFrom',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];

export const nft_abi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string'
			},
			{
				internalType: 'string',
				name: '_symbol',
				type: 'string'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'approved',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'operator',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'approved',
				type: 'bool'
			}
		],
		name: 'ApprovalForAll',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'bind',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'getApproved',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address'
			}
		],
		name: 'getUserState',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'operator',
				type: 'address'
			}
		],
		name: 'isApprovedForAll',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'mint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'ownerOf',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes'
			}
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'operator',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'approved',
				type: 'bool'
			}
		],
		name: 'setApprovalForAll',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4'
			}
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'tier',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'tokenURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'transferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
