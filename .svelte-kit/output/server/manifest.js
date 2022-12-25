export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/bg.webp","assets/groovepaper.png","assets/sample.png","assets/xcopy.gif","dark.css","favicon.png","fonts/protomono-light-webfont.woff","fonts/protomono-light-webfont.woff2","fonts/protomono-medium-webfont.woff","fonts/protomono-medium-webfont.woff2","fonts/protomono-regular-webfont.woff","fonts/protomono-regular-webfont.woff2","fonts/protomono-semibold-webfont.woff","fonts/protomono-semibold-webfont.woff2","fonts/specimen_files/grid_12-825-55-15.css","fonts/specimen_files/specimen_stylesheet.css","fonts/stylesheet.css","icons/checked.svg","icons/chevron_active.svg","icons/chevron_passive.svg","icons/corner-right-up_active.svg","icons/corner-right-up_passive.svg","icons/discord.svg","icons/external.svg","icons/github.svg","icons/heart.svg","icons/light/checked.svg","icons/light/discord.svg","icons/light/github.svg","icons/light/heart.svg","icons/light/loader.svg","icons/light/twitter.svg","icons/light/unchecked.svg","icons/light/upload.svg","icons/loader.svg","icons/message.svg","icons/search_active.svg","icons/search_passive.svg","icons/twitter.svg","icons/unchecked.svg","icons/upload.svg","light.css","robots.txt","styles.css"]),
	mimeTypes: {".webp":"image/webp",".png":"image/png",".gif":"image/gif",".css":"text/css",".woff":"font/woff",".woff2":"font/woff2",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		entry: {"file":"_app/immutable/start-4bbe0bf2.js","imports":["_app/immutable/start-4bbe0bf2.js","_app/immutable/chunks/index-a0c4f7b2.js","_app/immutable/chunks/singletons-ed825ad7.js","_app/immutable/chunks/index-917600e1.js","_app/immutable/chunks/env-public-f7741390.js"],"stylesheets":[],"fonts":[]},
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
			() => import('./nodes/10.js')
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
				id: "/api/alchemy/[addr]/[id]",
				pattern: /^\/api\/alchemy\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"addr","optional":false,"rest":false,"chained":false},{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/alchemy/_addr_/_id_/_server.ts.js')
			},
			{
				id: "/api/auth",
				pattern: /^\/api\/auth\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/auth/_server.ts.js')
			},
			{
				id: "/api/search",
				pattern: /^\/api\/search\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/search/_server.ts.js')
			},
			{
				id: "/api/skill/[sort]/[order]",
				pattern: /^\/api\/skill\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"sort","optional":false,"rest":false,"chained":false},{"name":"order","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/api/skill/_sort_/_order_/_server.ts.js')
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
				id: "/(subpages)/connect_wallet",
				pattern: /^\/connect_wallet\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(subpages)/create_account",
				pattern: /^\/create_account\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/jobs",
				pattern: /^\/jobs\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/messages",
				pattern: /^\/messages\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(subpages)/mint",
				pattern: /^\/mint\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/skills",
				pattern: /^\/skills\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
