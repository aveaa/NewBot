const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
client.config = require("./config.js")(client);

require("./modules/functions.js")(client);

client.con.connect(function(err) {
  if (err) throw err;
  console.log("База данных запущена..");
});

client.handleDisconnect(client.con);

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    props.conf.aliases.forEach(alias => {
    client.aliases.set(alias, props.help.name);
    });
  });
});

client.levelCache = {};
for (let i = 0; i < client.config.permLevels.length; i++) {
  const thisLevel = client.config.permLevels[i];
  client.levelCache[thisLevel.name] = thisLevel.level;
}

client.votech = {};
client.logsch = {};
client.mlogsch = {};
client.servers = {};

client.con.query(`SELECT * FROM servers`, function (err, result) {
  if (err) throw err;

  for (let i = 0; i < result.length; i++) {
    client.servers[result[i].id] = {};
    client.servers[result[i].id].miscelaneous = result[i].miscelaneous;
    client.servers[result[i].id].autorole = result[i].autorole;
    client.servers[result[i].id].personrole = result[i].personrole;
    client.servers[result[i].id].reactions = result[i].reactions;
    client.servers[result[i].id].fun = result[i].fun;
    client.servers[result[i].id].economics = result[i].economics;
    client.servers[result[i].id].systems = result[i].systems;
    client.servers[result[i].id].settings = result[i].settings;
    client.servers[result[i].id].moderators = result[i].moderators;
    client.servers[result[i].id].administrators = result[i].administrators;
    
    if (result[i].vote !== 'null' && result[i].vote !== null) client.votech[result[i].vote.split(" ")[0]] = result[i].vote.split(" ").slice(1);
    if (result[i].logs !== 'null' && result[i].logs !== null) client.logsch[result[i].id] = result[i].logs;
    if (result[i].mlogs !== 'null' && result[i].mlogs !== null) client.mlogsch[result[i].id] = result[i].mlogs;
  };
});
client.login(client.config.token);