export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/bg.webp","assets/consensys.png","assets/groovepaper.png","assets/landing/deer.png","assets/landing/employer_1.webp","assets/landing/employer_2.webp","assets/landing/employer_3.webp","assets/landing/freelancer_1.webp","assets/landing/freelancer_2.webp","assets/landing/freelancer_3.webp","assets/landing/hw.webp","assets/laser-grid.png","assets/sample.png","assets/xcopy.gif","favicon.png","fonts/protomono-light-webfont.woff","fonts/protomono-light-webfont.woff2","fonts/protomono-medium-webfont.woff","fonts/protomono-medium-webfont.woff2","fonts/protomono-regular-webfont.woff","fonts/protomono-regular-webfont.woff2","fonts/protomono-semibold-webfont.woff","fonts/protomono-semibold-webfont.woff2","fonts/specimen_files/grid_12-825-55-15.css","fonts/specimen_files/specimen_stylesheet.css","fonts/stylesheet.css","icons/.DS_Store","icons/calendar-check.svg","icons/calendar-remove.svg","icons/check.svg","icons/checked.svg","icons/chevron_active.svg","icons/chevron_left_active.svg","icons/chevron_left_passive.svg","icons/chevron_passive.svg","icons/clipboard.svg","icons/close.svg","icons/close_passive.svg","icons/copy.svg","icons/corner-left-down_active.svg","icons/corner-right-up_active.svg","icons/corner-right-up_passive.svg","icons/discord.svg","icons/external.svg","icons/fullheart.svg","icons/github.svg","icons/halfheart.svg","icons/heart.svg","icons/human-handsup.svg","icons/human-run.svg","icons/landing/airdrop-big.svg","icons/landing/airdrop.svg","icons/landing/avatar.svg","icons/landing/bitcoin.svg","icons/landing/briefcase-check.svg","icons/landing/bullseye-arrow.svg","icons/landing/check.svg","icons/landing/chevron.svg","icons/landing/cv.svg","icons/landing/discord.svg","icons/landing/drop-full.svg","icons/landing/github.svg","icons/landing/linkedin.svg","icons/landing/list-box.svg","icons/landing/lock.svg","icons/landing/logo.svg","icons/landing/mail-multiple.svg","icons/landing/message.svg","icons/landing/sale.svg","icons/landing/script-text.svg","icons/landing/trophy.svg","icons/landing/twitter.svg","icons/landing/wallet.svg","icons/loader.svg","icons/message.svg","icons/message_right.svg","icons/moon-star.svg","icons/notes-plus.svg","icons/post.svg","icons/search_active.svg","icons/search_passive.svg","icons/trending.svg","icons/twitter.svg","icons/unchecked.svg","icons/unchecked_passive.svg","icons/upload.svg","icons/user-x.svg","icons/zap.svg","robots.txt","styles.css"]),
	mimeTypes: {".webp":"image/webp",".png":"image/png",".gif":"image/gif",".woff":"font/woff",".woff2":"font/woff2",".css":"text/css",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		entry: {"file":"_app/immutable/start-79b680ed.js","imports":["_app/immutable/start-79b680ed.js","_app/immutable/chunks/paths-5beb49a4.js","_app/immutable/chunks/singletons-1cd5b978.js","_app/immutable/chunks/shared-52caabc7.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/(deal)/accept_deal/[recruiter]/[creator]",
				pattern: /^\/api\/accept_deal\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"recruiter","optional":false,"rest":false,"chained":false},{"name":"creator","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(deal)/accept_deal/_recruiter_/_creator_/_server.ts.js')
			},
			{
				id: "/api/(deal)/add_deal/[recruiter]/[creator]/[signature]",
				pattern: /^\/api\/add_deal\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"recruiter","optional":false,"rest":false,"chained":false},{"name":"creator","optional":false,"rest":false,"chained":false},{"name":"signature","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(deal)/add_deal/_recruiter_/_creator_/_signature_/_server.ts.js')
			},
			{
				id: "/api/alchemy/[addr]/[id]",
				pattern: /^\/api\/alchemy\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"addr","optional":false,"rest":false,"chained":false},{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/alchemy/_addr_/_id_/_server.ts.js')
			},
			{
				id: "/api/auth/login/[address]",
				pattern: /^\/api\/auth\/login\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/auth/login/_address_/_server.ts.js')
			},
			{
				id: "/api/config",
				pattern: /^\/api\/config\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/config/_server.ts.js')
			},
			{
				id: "/api/(conversation)/conversation_add/[address]",
				pattern: /^\/api\/conversation_add\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(conversation)/conversation_add/_address_/_server.ts.js')
			},
			{
				id: "/api/(conversation)/conversation/[address]",
				pattern: /^\/api\/conversation\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(conversation)/conversation/_address_/_server.ts.js')
			},
			{
				id: "/api/ens/[address]",
				pattern: /^\/api\/ens\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/ens/_address_/_server.ts.js')
			},
			{
				id: "/api/(deal)/execute_deal/[recruiter]/[creator]/[signature]",
				pattern: /^\/api\/execute_deal\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"recruiter","optional":false,"rest":false,"chained":false},{"name":"creator","optional":false,"rest":false,"chained":false},{"name":"signature","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(deal)/execute_deal/_recruiter_/_creator_/_signature_/_server.ts.js')
			},
			{
				id: "/api/favorites/add",
				pattern: /^\/api\/favorites\/add\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/favorites/add/_server.ts.js')
			},
			{
				id: "/api/favorites/get/[address]",
				pattern: /^\/api\/favorites\/get\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/favorites/get/_address_/_server.ts.js')
			},
			{
				id: "/api/favorites/remove",
				pattern: /^\/api\/favorites\/remove\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/favorites/remove/_server.ts.js')
			},
			{
				id: "/api/(deal)/get_deals/[recruiter]/[creator]",
				pattern: /^\/api\/get_deals\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"recruiter","optional":false,"rest":false,"chained":false},{"name":"creator","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(deal)/get_deals/_recruiter_/_creator_/_server.ts.js')
			},
			{
				id: "/api/(job)/get_jobs/[address]",
				pattern: /^\/api\/get_jobs\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/get_jobs/_address_/_server.ts.js')
			},
			{
				id: "/api/(job)/get_job/[address]/[slot]",
				pattern: /^\/api\/get_job\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false},{"name":"slot","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/get_job/_address_/_slot_/_server.ts.js')
			},
			{
				id: "/api/(job)/job_apply/[address]/[slot]",
				pattern: /^\/api\/job_apply\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false},{"name":"slot","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/job_apply/_address_/_slot_/_server.ts.js')
			},
			{
				id: "/api/(job)/job_submit",
				pattern: /^\/api\/job_submit\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/job_submit/_server.ts.js')
			},
			{
				id: "/api/(job)/job_update",
				pattern: /^\/api\/job_update\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/job_update/_server.ts.js')
			},
			{
				id: "/api/(job)/job/[sort]/[order]",
				pattern: /^\/api\/job\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"sort","optional":false,"rest":false,"chained":false},{"name":"order","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/job/_sort_/_order_/_server.ts.js')
			},
			{
				id: "/api/membership/[address]",
				pattern: /^\/api\/membership\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/membership/_address_/_server.ts.js')
			},
			{
				id: "/api/nft/next-token-image",
				pattern: /^\/api\/nft\/next-token-image\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/nft/next-token-image/_server.ts.js')
			},
			{
				id: "/api/nft/user-balance/[address]",
				pattern: /^\/api\/nft\/user-balance\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/nft/user-balance/_address_/_server.ts.js')
			},
			{
				id: "/api/nft/user-token-id/[address]",
				pattern: /^\/api\/nft\/user-token-id\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/nft/user-token-id/_address_/_server.ts.js')
			},
			{
				id: "/api/nft/whitelist",
				pattern: /^\/api\/nft\/whitelist\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/nft/whitelist/_server.ts.js')
			},
			{
				id: "/api/(profile)/profile_update",
				pattern: /^\/api\/profile_update\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(profile)/profile_update/_server.ts.js')
			},
			{
				id: "/api/rating/[address]",
				pattern: /^\/api\/rating\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/rating/_address_/_server.ts.js')
			},
			{
				id: "/api/search",
				pattern: /^\/api\/search\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/search/_server.ts.js')
			},
			{
				id: "/api/(profile)/skill_add",
				pattern: /^\/api\/skill_add\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(profile)/skill_add/_server.ts.js')
			},
			{
				id: "/api/skill/[sort]/[order]",
				pattern: /^\/api\/skill\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"sort","optional":false,"rest":false,"chained":false},{"name":"order","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/skill/_sort_/_order_/_server.ts.js')
			},
			{
				id: "/api/(job)/update-job-url/[filename]/[address]/[slot]",
				pattern: /^\/api\/update-job-url\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"filename","optional":false,"rest":false,"chained":false},{"name":"address","optional":false,"rest":false,"chained":false},{"name":"slot","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/update-job-url/_filename_/_address_/_slot_/_server.ts.js')
			},
			{
				id: "/api/(job)/upload-job-url/[filename]/[address]",
				pattern: /^\/api\/upload-job-url\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"filename","optional":false,"rest":false,"chained":false},{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/(job)/upload-job-url/_filename_/_address_/_server.ts.js')
			},
			{
				id: "/api/upload-skill-url/[skill_slot]/[image_slot]/[filename]",
				pattern: /^\/api\/upload-skill-url\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"skill_slot","optional":false,"rest":false,"chained":false},{"name":"image_slot","optional":false,"rest":false,"chained":false},{"name":"filename","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/upload-skill-url/_skill_slot_/_image_slot_/_filename_/_server.ts.js')
			},
			{
				id: "/api/upload-url/[filename]",
				pattern: /^\/api\/upload-url\/([^/]+?)\/?$/,
				params: [{"name":"filename","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/upload-url/_filename_/_server.ts.js')
			},
			{
				id: "/api/user/[address]",
				pattern: /^\/api\/user\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/user/_address_/_server.ts.js')
			},
			{
				id: "/api/watchlist/add",
				pattern: /^\/api\/watchlist\/add\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/watchlist/add/_server.ts.js')
			},
			{
				id: "/api/watchlist/get",
				pattern: /^\/api\/watchlist\/get\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/watchlist/get/_server.ts.js')
			},
			{
				id: "/api/watchlist/remove",
				pattern: /^\/api\/watchlist\/remove\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/watchlist/remove/_server.ts.js')
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/creator/[address]",
				pattern: /^\/creator\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/jobs",
				pattern: /^\/jobs\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/job/[address]",
				pattern: /^\/job\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/job/[address]/[slot]",
				pattern: /^\/job\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"address","optional":false,"rest":false,"chained":false},{"name":"slot","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/listings",
				pattern: /^\/listings\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/messages",
				pattern: /^\/messages\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/mint",
				pattern: /^\/mint\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/new_job",
				pattern: /^\/new_job\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/skills",
				pattern: /^\/skills\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
