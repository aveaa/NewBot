exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Задержка - \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API задержка - \`${Math.round(client.ping)}ms\``);
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["пинг"],
  permLevel: "User",
  category: "systems"
};
  
exports.help = {
  name: "ping",
  category: "Системные",
  description: "Показывает пинг бота",
  usage: "ping"
};