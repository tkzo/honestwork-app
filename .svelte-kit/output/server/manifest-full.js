export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/bg.webp","favicon.png","fonts/ProtoMono-Light.otf","fonts/ProtoMono-LightShadow.otf","fonts/ProtoMono-Medium.otf","fonts/ProtoMono-MediumShadow.otf","fonts/ProtoMono-Regular.otf","fonts/ProtoMono-RegularShadow.otf","fonts/ProtoMono-SemiBold.otf","fonts/ProtoMono-SemiBoldShadow.otf","icons/discord.svg","icons/github.svg","icons/heart.svg","icons/twitter.svg","robots.txt","styles.css"]),
	mimeTypes: {".webp":"image/webp",".png":"image/png",".otf":"font/otf",".svg":"image/svg+xml",".txt":"text/plain",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-95a8ff3e.js","imports":["_app/immutable/start-95a8ff3e.js","_app/immutable/chunks/index-59d4b1d2.js","_app/immutable/chunks/singletons-3913c6c2.js","_app/immutable/chunks/index-916b9a46.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js')
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
				id: "/api/auth",
				pattern: /^\/api\/auth\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/auth/_server.ts.js')
			},
			{
				id: "/api/sign",
				pattern: /^\/api\/sign\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/sign/_server.ts.js')
			},
			{
				id: "/connect_wallet",
				pattern: /^\/connect_wallet\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/create_account",
				pattern: /^\/create_account\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/creators",
				pattern: /^\/creators\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
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
				id: "/profile/[slug]",
				pattern: /^\/profile\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
