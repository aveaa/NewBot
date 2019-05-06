const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  for(var i = 0; i<args.length; i++){
    let msg = await message.channel.fetchMessage(args[i]).catch(console.error);
    if(!msg) continue;

    let embed = new Discord.RichEmbed()
    .setAuthor(msg.member.displayName, msg.author.displayAvatarURL)
    .setDescription(msg.content)
    .setColor(msg.member.displayColor)
    .setTimestamp(msg.createdTimestamp)
  
    if(msg.attachments.size !== 0) embed.setImage(msg.attachments.first().url);

    message.channel.send(embed)
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["f"],
  permLevel: "User",
  category: "miscelaneous"
};

exports.help = {
  name: "forward",
  category: "Разное",
  description: "Пересылает сообщения из данного канала",
  usage: "forward <id_сообщения1> <id_сообщения2> ..."
};