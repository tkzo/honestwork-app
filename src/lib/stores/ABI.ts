export const joblisting_abi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_registry',
				type: 'address'
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
				name: 'previousOwner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'OwnershipTransferred',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_token',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'PaymentAdded',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'PaymentAddedETH',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address'
			}
		],
		name: 'getLatestPayment',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'listingDate',
						type: 'uint256'
					}
				],
				internalType: 'struct JobListing.Payment',
				name: '',
				type: 'tuple'
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
		name: 'getPaymentsOf',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'token',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'listingDate',
						type: 'uint256'
					}
				],
				internalType: 'struct JobListing.Payment[]',
				name: '',
				type: 'tuple[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'owner',
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
				name: '_token',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'payForListing',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'payForListingEth',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'registry',
		outputs: [
			{
				internalType: 'contract IHWRegistry',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_token',
				type: 'address'
			}
		],
		name: 'withdrawAllEarnings',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'withdrawAllEarningsEth',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'withdrawAllTokens',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_token',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'withdrawEarnings',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
