import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { base } from '$app/paths';
import type { User, SkillType } from '$lib/stores/Types';

export const load = (async ({ cookies, fetch, parent }) => {
  const { signed } = await parent();
  let user: User = {} as any;
  let skills: SkillType[];
  const userAddress = cookies.get('honestwork_address')!;
  if (signed) {
    user = await getUser(userAddress, fetch);
    skills = await getSkills(fetch);
    return { user: user, skills: skills };
  } else {
    throw redirect(301, '/auth');
  }
}) satisfies LayoutServerLoad;

const getUser = async (address: string, fetch: any) => {
  const url = `${base}/api/user/${address}`;
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    throw error(500, 'Error getting user')
  }
};

const getSkills = async (fetch: any) => {
  const url = `${base}/api/get_skills`;
  let response = await fetch(url);
  if (response.ok) {
    let skills = await response.json();
    return skills;
  } else {
    throw error(500, 'Error getting jobs')
  }
};
