const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  let member = message.mentions.members.first();
  if(!member) member = message.member;

  let embed = new Discord.RichEmbed()
  .setDescription(`:frame_photo: Аватар пользователя ${member.user.tag}`)
  .setImage(member.user.displayAvatarURL)
  .setColor(member.displayColor)
  .setFooter('© SevenTrio')
  .setTimestamp();

  message.channel.send(embed);
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["аватар", "ава"],
  permLevel: "User",
  category: "miscelaneous"
};
  
exports.help = {
  name: "avatar",
  category: "Разное",
  description: "Отравляет аватар упомянутого человека",
  usage: "avatar <@user>"
};