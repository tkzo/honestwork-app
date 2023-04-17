import { assets } from '$app/paths';
import type { FAQCard } from '$lib/stores/Types';
import type { FeatureCard, APIConfig } from '$lib/stores/Types';
import { writable } from 'svelte/store';
import { env } from '$env/dynamic/public';

export let api_config = writable();

export let featureCards: FeatureCard[] = [
  {
    type: 'employers',
    title: 'Post a job without a hassle',
    icon1: 'icons/landing/cv.svg',
    icon1alt: 'Job listing',
    feature1: 'Create a job listing for an unlimited duration',
    icon2: 'icons/landing/message.svg',
    icon2alt: 'Message icon',
    feature2: 'Start conversations with the best applicants through embedded messaging',
    buttontext: 'Post a Job',
    imgsrc: 'assets/landing/employer_1.webp',
    imgalt: 'Profile'
  },
  {
    type: 'employers',
    title: 'Find the best talents',
    icon1: 'icons/landing/bullseye-arrow.svg',
    icon1alt: 'Bullseye arrow icon',
    feature1: 'Browse an extensive library of skills to find exactly what you need',
    icon2: 'icons/landing/check.svg',
    icon2alt: 'Check icon',
    feature2: 'Easily view previous work history and ratings on freelancers’ profile',
    buttontext: 'Post a Job',
    imgsrc: 'assets/landing/employer_2.webp',
    imgalt: 'Profile'
  },
  {
    type: 'employers',
    title: 'Safe on-chain payments',
    icon1: 'icons/landing/bitcoin.svg',
    icon1alt: 'Bitcoin icon',
    feature1: 'Pay with any stable coin',
    icon2: 'icons/landing/script-text.svg',
    icon2alt: 'Script text icon',
    feature2: 'Safe payments through a customized Escrow Contract',
    buttontext: 'Post a Job',
    imgsrc: 'assets/landing/employer_3.webp',
    imgalt: 'Profile'
  },
  {
    type: 'freelancers',
    title: 'On-chain perks',
    icon1: 'icons/landing/avatar.svg',
    icon1alt: 'Avatar icon',
    feature1: 'Create unique profiles with ENS names and NFTs',
    icon2: 'icons/landing/drop-full.svg',
    icon2alt: 'Airdrop icon',
    feature2: 'Receive airdrops based on your activity points',
    buttontext: 'Explore Jobs',
    imgsrc: 'assets/landing/freelancer_1.webp',
    imgalt: 'Profile'
  },
  {
    type: 'freelancers',
    title: 'Get paid in crypto',
    icon1: 'icons/landing/briefcase-check.svg',
    icon1alt: 'Briefcase icon',
    feature1: 'Job payment is safely kept in an Escrow Contract while you are working on the task',
    icon2: 'icons/landing/wallet.svg',
    icon2alt: 'Wallet icon',
    feature2: 'Receive 100% of your earnings with no fees  ',
    buttontext: 'Explore Jobs',
    imgsrc: 'assets/landing/freelancer_2.webp',
    imgalt: 'Profile'
  },
  {
    type: 'freelancers',
    title: 'Find premium web3 freelance jobs',
    icon1: 'icons/landing/list-box.svg',
    icon1alt: 'List box icon',
    feature1: 'Choose from the wide library of jobs listings',
    icon2: 'icons/landing/trophy.svg',
    icon2alt: 'Trophy icon',
    feature2: 'List your skills and get noticed for what you do best',
    buttontext: 'Explore Jobs',
    imgsrc: 'assets/landing/freelancer_3.webp',
    imgalt: 'Profile'
  }
];

export let placeholder_image = `${assets}/assets/xcopy.gif`;

// todo: fetch dynamically on network store
export const chains = [
  {
    name: 'arbitrum',
    id: 42161,
    tokens: [
      {
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        address: env.PUBLIC_ARBITRUM_USDC_ADDRESS!,
        max_allowed: '100000000000000000000000'
      }
    ],
    explorer: 'https://arbiscan.com/address'
  }
];

// todo: find home to this
export const findTokenAddress = (chain_name: string, symbol: string) => {
  const chain = chains.find((chain) => chain.name === chain_name);
  if (chain) {
    const token = chain.tokens.find((token) => token.symbol === symbol);
    if (token) {
      return token.address;
    }
  }
  return '';
};

export const findTokenName = (chain_name: string, address: string) => {
  const chain = chains.find((chain) => chain.name === chain_name);
  if (chain) {
    const token = chain.tokens.find((token) => token.address === address);
    if (token) {
      return token.name;
    }
  }
  return '';
};

export const findChainName = (chain_id: number) => {
  const chain = chains.find((chain) => chain.id === chain_id);
  if (chain) {
    return chain.name;
  }
  return '';
};

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
    bodytext: 'HonestWork is launching soon!',
    cta: 'follow our twitter for the updates',
    icon: '/icons/twitter.svg'
  },
  relief: {
    bodytext: 'Turkey needs your help!',
    cta: 'donate with crypto',
    icon: '/icons/moon-star.svg'
  },
  invitation: {
    bodytext: 'if you have a unique skill that’s not listed already',
    cta: 'apply for invitation',
    icon: '/icons/message_right.svg'
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
      max: 50
    },
    title: {
      min: 5,
      max: 50
    },
    description: {
      rows: 20,
      min: 200,
      max: 2000
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
      min: 200,
      max: 100000
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
