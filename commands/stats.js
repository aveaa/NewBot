const { version } = require("discord.js");

exports.run = (client, message, args, level) => {
  message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${new Date(client.uptime * 1000).toISOString().substr(11, 8)/*Math.floor(client.uptime/86400000)} дней ${Math.floor(client.uptime/3600000)} часов ${Math.floor(client.uptime/60000)} минут ${Math.floor(client.uptime/1000)*/}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: "asciidoc"});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  category: "systems"
};

exports.help = {
  name: "stats",
  category: "Системные",
  description: "Показывает статистику бота",
  usage: "stats"
};