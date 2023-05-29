import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { JobInput } from '$lib/stores/Validation';
import { ethers } from 'ethers';
import { parseContent } from '$lib/stores/Parser';
import { calculatePayment, checkPayment } from '$lib/stores/Crypto';
import { Client, EmbedBuilder, GatewayIntentBits, TextChannel } from 'discord.js';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request }) => {
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  let data = await request.json();
  let salt: any;
  if (cached_db == "" as any) {
    const client = new MongoClient(uri!);
    await client.connect();
    cached_db = client.db("honestwork-cluster");
  }
  salt = await cached_db.collection('salts').findOne({ address: data.useraddress });
  let message =
    'HonestWork: New Job Post\n' +
    `${salt.salt}\n` +
    '\n' +
    'For more info: https://docs.honestwork.app';
  const addr = ethers.utils.verifyMessage(message, data.signature);
  if (addr != data.useraddress) {
    throw error(401, "Unauthorized");
  }
  await cached_db.collection('salts').deleteMany({ address: data.useraddress });
  const guild_id = env.PRIVATE_DISCORD_GUILD_JOBS!;
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
  let data_to_validate = JSON.parse(JSON.stringify(data));
  data_to_validate.description = parseContent(data.description);
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      cached_db = client.db("honestwork-cluster");
    }
    const slot = await cached_db.collection('jobs').countDocuments({ useraddress: data.useraddress });
    let cloud_url = "";
    if (data.imageurl != '') {
      cloud_url =
        env.PRIVATE_IMAGEKIT_URL + '/' + data.useraddress + '/job/' + slot + '/' + data.imageurl;
    }
    data_to_validate.imageurl = cloud_url;
    let parsed = JobInput.safeParse(data_to_validate);
    if (!parsed.success) {
      for (const err of parsed.error.errors) {
        console.log(err.message);
      }
      throw error(400, "Bad Request");
    }
    let total = calculatePayment(parseInt(data.stickyduration))
    if (!checkPayment(data.useraddress, data.tokenpaid, total!, data.txhash)) {
      throw error(400, "Bad Request");
    }
    let existing_tx = await cached_db.collection('txs').findOne({ key: data.txhash });
    if (existing_tx != null) {
      throw error(400, "Bad Request");
    }
    await cached_db.collection('jobs').insertOne({
      title: data.title,
      slot: slot,
      description: data.description,
      tags: data.tags,
      links: data.links,
      useraddress: data.useraddress,
      username: data.username,
      email: data.email,
      tokenpaid: data.tokenpaid,
      tokensaccepted: data.tokensaccepted,
      txhash: data.txhash,
      timezone: data.timezone,
      imageurl: cloud_url,
      budget: parseInt(data.budget),
      stickyduration: parseInt(data.stickyduration),
      createdat: new Date().getTime(),
      dealnetworkid: -1,
      dealid: -1,
      applications: [],
    });
    await cached_db.collection('txs').insertOne({
      key: data.txhash,
    });
    const embed = new EmbedBuilder()
      .setTitle(data.title)
      .setURL(`https://honestwork.app/job/${data.useraddress}/${slot}`)
      .setColor(0xffd369)
      .setDescription(`${parsed.data.description.slice(0, 200)}...`)
      .setAuthor({
        name: data.username,
        iconURL: cloud_url,
      }).setTimestamp(new Date())
      .setFooter({
        text: "HonestWork Job Alerts",
        iconURL: "https://honestwork-userfiles.fra1.cdn.digitaloceanspaces.com/hw-icon.png",
      })
      .addFields(
        { name: '🤑 Budget', value: `$${data.budget}`, inline: true },
        { name: '🌍 Timezone', value: `GMT ${data.timezone}`, inline: true }
      );
    let keep_trying = true;
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
    throw error(500, err.message);
  }
  return json("success");
}
