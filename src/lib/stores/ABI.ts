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

export const payment_abi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_registry',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_HW721',
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
				name: '_recruiter',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_creator',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: '_totalPayment',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'address',
				name: '_paymentToken',
				type: 'address'
			}
		],
		name: 'OfferCreatedEvent',
		type: 'event'
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_recruiter',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: '_payment',
				type: 'uint256'
			}
		],
		name: 'additionalPaymentEvent',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_newPaymentLimit',
				type: 'uint256'
			}
		],
		name: 'changeExtraPaymentLimitEvent',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_creator',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: '_paymentReceived',
				type: 'uint256'
			}
		],
		name: 'claimPaymentEvent',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: '_collector',
				type: 'address'
			}
		],
		name: 'claimSuccessFeeAllEvent',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'claimSuccessFeeEvent',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_recruiter',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: '_unlockedAmount',
				type: 'uint256'
			}
		],
		name: 'paymentUnlockedEvent',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_newSuccessFee',
				type: 'uint256'
			}
		],
		name: 'successFeeChangedEvent',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'enum HonestPayLock.Status',
				name: 'status',
				type: 'uint8'
			}
		],
		name: 'withdrawPaymentEvent',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_payment',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_recruiterNFT',
				type: 'uint256'
			},
			{
				internalType: 'uint128',
				name: '_rating',
				type: 'uint128'
			}
		],
		name: 'additionalPayment',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'additionalPaymentLimit',
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
		name: 'busd',
		outputs: [
			{
				internalType: 'contract IERC20',
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
				internalType: 'uint256',
				name: '_limit',
				type: 'uint256'
			}
		],
		name: 'changeExtraPaymentLimit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'contract IHWRegistry',
				name: '_registry',
				type: 'address'
			}
		],
		name: 'changeRegistry',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_fee',
				type: 'uint256'
			}
		],
		name: 'changeSuccessFee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_withdrawAmount',
				type: 'uint256'
			},
			{
				internalType: 'uint128',
				name: '_rating',
				type: 'uint128'
			},
			{
				internalType: 'uint256',
				name: '_creatorNFT',
				type: 'uint256'
			}
		],
		name: 'claimPayment',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: '_feeCollector',
				type: 'address'
			}
		],
		name: 'claimSuccessFee',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_feeCollector',
				type: 'address'
			}
		],
		name: 'claimSuccessFeeAll',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_recruiter',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_creator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_paymentToken',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_totalPayment',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_deadline',
				type: 'uint256'
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8'
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32'
			}
		],
		name: 'createDeal',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_recruiter',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_creator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_paymentToken',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_totalPayment',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_downPayment',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_deadline',
				type: 'uint256'
			},
			{
				internalType: 'bytes',
				name: '_signature',
				type: 'bytes'
			}
		],
		name: 'createDealSignature',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'dealIds',
		outputs: [
			{
				internalType: 'uint256',
				name: '_value',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'dealsMapping',
		outputs: [
			{
				internalType: 'address',
				name: 'recruiter',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'creator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'paymentToken',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'totalPayment',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'successFee',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'paidAmount',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'availablePayment',
				type: 'uint256'
			},
			{
				internalType: 'enum HonestPayLock.Status',
				name: 'status',
				type: 'uint8'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'extraPaymentLimit',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getAdditionalPaymentLimit',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getAvailablePayment',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getAvgCreatorRating',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getAvgRecruiterRating',
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
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'getBnbPrice',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getCreator',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getCreatorRating',
		outputs: [
			{
				internalType: 'uint128[]',
				name: '',
				type: 'uint128[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getDeal',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'recruiter',
						type: 'address'
					},
					{
						internalType: 'address',
						name: 'creator',
						type: 'address'
					},
					{
						internalType: 'address',
						name: 'paymentToken',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'totalPayment',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'successFee',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'paidAmount',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'availablePayment',
						type: 'uint256'
					},
					{
						internalType: 'enum HonestPayLock.Status',
						name: 'status',
						type: 'uint8'
					},
					{
						internalType: 'uint128[]',
						name: 'recruiterRating',
						type: 'uint128[]'
					},
					{
						internalType: 'uint128[]',
						name: 'creatorRating',
						type: 'uint128[]'
					}
				],
				internalType: 'struct HonestPayLock.Deal',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getDealStatus',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getDealSuccessFee',
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
				name: '_address',
				type: 'address'
			}
		],
		name: 'getDealsOfAnAddress',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_messageHash',
				type: 'bytes32'
			}
		],
		name: 'getEthSignedMessageHash',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getJobCompletionRate',
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
				name: '_recruiter',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_creator',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_paymentToken',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_totalPayment',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_downPayment',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_deadline',
				type: 'uint256'
			}
		],
		name: 'getMessageHash',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getPaidAmount',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getPaymentToken',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getRecruiter',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getRecruiterRating',
		outputs: [
			{
				internalType: 'uint128[]',
				name: '',
				type: 'uint128[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'getTotalPayment',
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
		name: 'getTotalSuccessFee',
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
		name: 'honestWorkSuccessFee',
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
		name: 'hw721',
		outputs: [
			{
				internalType: 'contract HonestWorkNFT',
				name: '',
				type: 'address'
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
		inputs: [],
		name: 'pool',
		outputs: [
			{
				internalType: 'contract IPool',
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
				internalType: 'bytes32',
				name: '_ethSignedMessageHash',
				type: 'bytes32'
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8'
			},
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32'
			}
		],
		name: 'recoverSigner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'pure',
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
		inputs: [],
		name: 'router',
		outputs: [
			{
				internalType: 'contract IUniswapV2Router01',
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
				internalType: 'bytes',
				name: 'sig',
				type: 'bytes'
			}
		],
		name: 'splitSignature',
		outputs: [
			{
				internalType: 'bytes32',
				name: 'r',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32',
				name: 's',
				type: 'bytes32'
			},
			{
				internalType: 'uint8',
				name: 'v',
				type: 'uint8'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [],
		name: 'totalCollectedSuccessFee',
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
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_paymentAmount',
				type: 'uint256'
			},
			{
				internalType: 'uint128',
				name: '_rating',
				type: 'uint128'
			},
			{
				internalType: 'uint256',
				name: '_recruiterNFT',
				type: 'uint256'
			}
		],
		name: 'unlockPayment',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_dealId',
				type: 'uint256'
			}
		],
		name: 'withdrawPayment',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];

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
