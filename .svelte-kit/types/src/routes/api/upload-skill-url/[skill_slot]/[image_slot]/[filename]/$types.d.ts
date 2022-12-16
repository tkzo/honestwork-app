import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = { skill_slot: string; image_slot: string; filename: string }
type RouteId = '/api/upload-skill-url/[skill_slot]/[image_slot]/[filename]';

export type RequestHandler = Kit.RequestHandler<RouteParams, RouteId>;
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;