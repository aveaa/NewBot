const Discord = require("discord.js"); 

module.exports = async (client, member) => {
  if (!client.mlogsch[member.guild.id]) return;

  let embed = new Discord.RichEmbed()
  .setAuthor(member.user.tag+'  ('+member.user.id+')', member.user.displayAvatarURL)
  .setColor(0x00ff00)
  .setTimestamp()
  .setFooter('User joined');

  client.channels.get(client.mlogsch[member.guild.id]).send(embed);
}