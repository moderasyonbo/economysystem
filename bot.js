const Discord = require("discord.js")
const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: ["GUILD_MEMBERS", "GUILD_WEBHOOKS", "GUILD_VOICE_STATES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILDS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING"] } });
const db = require("quick.db")
const fs = require("fs")
const moment = require("moment");
require("moment-duration-format");
const parse = require("parse-ms")
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0', client, { webhookPort: 5000, webhookAuth: 'alicanensar1' });
const express = require('express')
const app = express() // Your express app
 
client.ayarlar = {
  "token": "",
  "sahip": ["759095243080597565"],
  "prefix": "",
  "renk": "RANDOM",
  "botİsim": "",
  "embedRenk": "RANDOM",
  "embedFooter": "",
  "version": "",
  "destek": "",
  "website": ""
}

dbl.on('posted', () => {
  console.log('Sunucu sayısı postlandı!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
}) 
 

client.on("warn", warn => {
  console.log(`Bir Uyarı Belirdi: ${warn}`)
})

client.on("error", error => {
  console.log(`Bir Hata Çıktı: ${error}`)
})

/* komut yükleme başlangıç */
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./komutlar').forEach(dir => {
  fs.readdir(`./komutlar/${dir}/`, (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let props = require(`./komutlar/${dir}/${f}`);
      console.log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
})


client.login(client.ayarlar.token)