import type { ethers } from 'ethers';

export type Conversation = {
  matcheduser: string;
  createdat: number;
  lastmessageat: number;
  muted: boolean;
}
export type FAQCard = {
  id: number;
  question: string;
  answer: string;
};

export type FeatureCard = {
  type: string;
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
  useraddress: string;
  createdat: number;
  title: string;
  description: string;
  imageurls: Array<string>;
  minimumprice: number;
  links: Array<string>;
  publish: boolean;
  tags: Array<string>;
};

export type User = {
  conversations: Conversation[],
  address: string;
  salt: string;
  username: string;
  showens: boolean;
  ensname: string;
  title: string;
  imageurl: string;
  fileurl: string;
  shownft: boolean;
  nftaddress: string;
  nftid: number;
  email: string;
  timezone: string;
  bio: string;
  links: Array<string>;
  dmsopen: boolean;
  application: Array<ApplicationType>;
  favorites: Array<FavoriteType>;
  watchlist: Array<WatchlistType>;
};

export type ApplicationType = {
  useraddress: string;
  jobid: string;
  coverletter: string;
  date: number;
};

export type JobType = {
  slot: number;
  useraddress: string;
  email: string;
  username: string;
  createdat: number;
  title: string;
  description: string;
  imageurl: string;
  budget: number;
  links: Array<string>;
  tags: Array<string>;
  tokensaccepted: Array<Network>;
  stickyduration: number;
  timezone: number;
  applications: Array<ApplicantType>;
  dealnetworkid: number;
  dealid: number;
};

export type ApplicantType = {
  useraddress: string;
  jobid: string;
  coverletter: string;
  date: number;
};
export type Network = {
  id: number;
  tokens: Array<Token>;
};
export type Token = {
  address: string;
};

export type WatchlistType = {
  input: {
    address: string;
    slot: number;
  };
  username: string;
  title: string;
  imageurl: string;
};

export type FavoriteType = {
  input: {
    address: string;
    slot: number;
  };
  username: string;
  title: string;
  imageurl: string;
};

export type DealDB = {
  status: string;
  network: string;
  tokenaddress: string;
  totalamount: string;
  downpayment: string;
  signature: string;
  jobid: number;
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
  jobId: number;
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
    Arbitrum: {
      ID: number;
      RPCURL: string;
    };
  };
};
