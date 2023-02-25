import type { ethers } from 'ethers';

export type FAQCard = {
	id: number;
	question: string;
	answer: string;
};

export type FeatureCard = {
	title: string;
	icon1: string;
	icon1alt: string;
	feature1: string;
	icon2: string;
	icon2alt: string;
	feature2: string;
	buttontext: string;
	imgsrc: string;
	imgalt: string;
};

export type SkillType = {
	slot: number;
	user_address: string;
	created_at: number;
	title: string;
	description: string;
	image_urls: Array<string>;
	minimum_price: number;
	links: Array<string>;
	publish: boolean;
	tags: Array<string>;
};

export type UserType = {
	username: string;
	show_ens: boolean;
	ens_name: string;
	title: string;
	image_url: string;
	show_nft: boolean;
	nft_address: string;
	nft_id: number;
	email: string;
	timezone: string;
	bio: string;
	links: Array<string>;
	dms_open: boolean;
	application: Array<ApplicationType>;
};

export type ApplicationType = {
	user_address: string;
	job_id: string;
	cover_letter: string;
	date: number;
};

export type JobType = {
	slot: number;
	user_address: string;
	email: string;
	username: string;
	created_at: number;
	title: string;
	description: string;
	image_url: string;
	budget: number;
	links: Array<string>;
	tags: Array<string>;
	installments: number;
	tokens_accepted: Array<Network>;
	sticky_duration: string;
	timezone: string;
	application: Array<ApplicantType>;
};

export type ApplicantType = {
	user_address: string;
	job_id: string;
	cover_letter: string;
	date: number;
};
export type Network = {
	id: number;
	tokens: Array<Token>;
};
export type Token = {
	address: string;
};

export type Watchlist = {
	input: {
		address: string;
		slot: number;
	};
	username: string;
	title: string;
	image_url: string;
};

export type Favorite = {
	input: {
		address: string;
		slot: number;
	};
	username: string;
	title: string;
	image_url: string;
};

export type DealDB = {
	status: string;
	network: string;
	token_address: string;
	total_amount: string;
	downpayment: string;
	signature: string;
};

export type Deal = {
	recruiter: string;
	creator: string;
	paymentToken: string;
	totalPayment: ethers.BigNumberish;
	successFee: ethers.BigNumberish;
	claimedAmount: ethers.BigNumberish;
	claimableAmount: ethers.BigNumberish;
	status: number;
	recruiterRating: Array<number>;
	creatorRating: Array<number>;
};

export type APIConfig = {
	API: {
		Port: string;
	};
	DB: {
		Port: string;
		ID: number;
	};
	Settings: {
		Skills: {
			Tier_1: number;
			Tier_2: number;
			Tier_3: number;
		};
		Jobs: {
			ServiceFee: string;
			SuccessFeeBrackets: {
				Bracked_0: number;
				Bracked_1: number;
				Bracked_2: number;
				Bracked_3: number;
				Bracked_4: number;
			};
			SuccessFeePercentages: {
				Percentage_0: number;
				Percentage_1: number;
				Percentage_2: number;
				Percentage_3: number;
				Percentage_4: number;
			};
			HighlightPrices: {
				StickyPrices: {
					Week: string;
					Biweek: string;
					Month: string;
				};
				HighlightFrame: {
					Default: string;
				};
			};
		};
		Charlimits: {
			Profile: {
				Username: number;
				Title: number;
				Bio: number;
			};
		};
	};
	ContractAddresses: {
		MembershipNFT: string;
		JobPayments: string;
		Registry: string;
	};
	Network: {
		Eth: {
			ID: number;
			RPCURL: string;
		};
		Polygon: {
			ID: number;
			RPCURL: string;
		};
		Binance: {
			ID: number;
			RPCURL: string;
		};
	};
};
