import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { SkillInput } from '$lib/stores/Validation';
import { base } from '$app/paths';
import { getSkillLimit, verifyMember } from '$lib/stores/Crypto';
import { Client, EmbedBuilder, GatewayIntentBits, TextChannel } from 'discord.js';
import { parseContent } from '$lib/stores/Parser';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
  const userAddress = cookies.get("honestwork_address");
  const userSignature = cookies.get("honestwork_signature");
  if (!userAddress || !userSignature) {
    throw error(401, "Unauthorized");
  }
  const guild_id = env.PRIVATE_DISCORD_GUILD_SKILLS!;
  const bot_token = env.PRIVATE_DISCORD_BOT_TOKEN!;
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  let channel: any;
  client.on('ready', () => {
    const has_channel = client.channels.cache.has(guild_id);
    if (!has_channel) {
      throw error(500, "Internal Server Error");
    }
    channel = client.channels.cache.get(guild_id) as TextChannel;
  });
  await client.login(bot_token);
  let skills: any;
  let data = await request.json();
  let data_to_validate = JSON.parse(JSON.stringify(data));
  data_to_validate.description = parseContent(data.description);
  let parsed = SkillInput.safeParse(data_to_validate);
  if (!parsed.success) {
    throw error(400, "Bad Request");
  }
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      cached_db = client.db("honestwork-cluster");
    }
    let user = await cached_db.collection('users').findOne({ address: userAddress });
    if (user == null) {
      throw error(401, "Unauthorized");
    }
    let verified = verifyMember(user.salt, userAddress, userSignature);
    if (!verified) {
      throw error(401, "Unauthorized");
    }
    let allowed = await getSkillLimit(userAddress);
    skills = await cached_db.collection('skills').find({ useraddress: data.useraddress }).toArray();
    if (skills.length >= allowed) {
      throw error(400, "Membership limit reached");
    }
    let query = { useraddress: data.useraddress, slot: skills.length };
    let options = { upsert: true };
    let updt = {
      $set: {
        title: data.title,
        slot: skills.length,
        description: data.description,
        tags: data.tags,
        links: data.links,
        imageurls: data.imageurls,
        minimumprice: data.minimumprice,
        publish: data.publish,
        createdat: new Date().getTime(),
      },
    };
    await cached_db.collection('skills').updateOne(query, updt, options);
    let image_to_use = user.nfturl != "" ? user.nfturl : user.imageurl;
    let title_to_use = user.showens ? user.ensname : user.username;
    const embed = new EmbedBuilder()
      .setTitle(data.title)
      .setURL(`https://honestwork.app/skill/${data.useraddress}/${skills.length}`)
      .setColor(0xffd369)
      .setDescription(`${parsed.data.description.slice(0, 200)}...`)
      .setAuthor({
        name: `${title_to_use}`,
        iconURL: `${image_to_use}`,
      }).setTimestamp(new Date())
      .setFooter({
        text: `HonestWork Skill Alerts`,
        iconURL: `https://honestwork-userfiles.fra1.cdn.digitaloceanspaces.com/hw-icon.png`,
      })
      .addFields(
        { name: '🤑 Hourly rate', value: `$${data.minimumprice}`, inline: true }
      );
    let keep_trying = data.publish;
    for (let i = 0; i < 5; i++) {
      try {
        if (channel && keep_trying) {
          await channel.send({
            embeds: [embed],
          });
          keep_trying = false;
        } else {
          await new Promise(r => setTimeout(r, 100));
        }
      } catch (err: any) {
        await new Promise(r => setTimeout(r, 100));
      }
    }
  } catch (err: any) {
    throw error(500, err.body.message);
  }
  return json("success");
}

