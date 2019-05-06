const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  let ch = client.channels.get(args[0]);
  for(var i = 1; i<args.length; i++){
    let msg = await ch.fetchMessage(args[i]).catch(console.error);
    if(!msg) continue;

    let embed = new Discord.RichEmbed()
    .setAuthor(msg.member.displayName, msg.author.displayAvatarURL)
    .setDescription(msg.content)
    .setColor(msg.member.displayColor)
    .setTimestamp(msg.createdTimestamp)

    if(msg.attachments.size !== 0) embed.setImage(msg.attachments.first().url);

    message.channel.send(embed);
  };
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fch"],
  permLevel: "User",
  category: "miscelaneous"
};
  
exports.help = {
  name: "forwardchannel",
  category: "Разное",
  description: "Пересылает сообщения из заданного пользователем канала",
  usage: "forwardchannel <id_канала> <id_сообщения1> <id_сообщения2> ..."
};