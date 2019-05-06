const Discord = require("discord.js"); 

module.exports = async (client, old_mess, new_mess) => {
  if (!new_mess.guild) return;
  if (new_mess.author.bot) return;
  if (old_mess.content === new_mess.content) return;
  if (!client.logsch[new_mess.guild.id]) return;

  let embed = new Discord.RichEmbed()
  .setAuthor(`${new_mess.member.nickname}  (${new_mess.author.tag})`, new_mess.author.displayAvatarURL)
  .setColor(0xf8f000)
  .addField(`До изменения:`, `\`\`\`${old_mess.content}\`\`\``)
  .addField(`После изменения:`, `\`\`\`${new_mess.content}\`\`\``)
  .setFooter(`#${new_mess.channel.name}`)
  .setTimestamp();
  
  if(!new_mess.member.nickname) embed.setAuthor(`${new_mess.author.tag}`, new_mess.author.displayAvatarURL);
  
  if(new_mess.attachments.size !== 0){
    embed.setImage(new_mess.attachments.first().proxyURL);
  };
   
  client.channels.get(client.logsch[new_mess.guild.id]).send(embed).catch(O_o => {});
}