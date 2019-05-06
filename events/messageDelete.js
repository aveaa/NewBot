const Discord = require("discord.js"); 

module.exports = async (client, del_mess) => {
  if (!del_mess.guild) return;
  if (del_mess.author.bot) return;
  if (!client.logsch[del_mess.guild.id]) return;
  
  let embed = new Discord.RichEmbed()
  .setAuthor(`${del_mess.member.nickname}  (${del_mess.author.tag})`, del_mess.author.displayAvatarURL)
  .setColor(0xf8f000)
  .addField(`Сообщение удалено:`, `\`\`\`${del_mess.content} \`\`\``)
  .setFooter(`#${del_mess.channel.name}`)
  .setTimestamp();
  
  if(!del_mess.member.nickname) embed.setAuthor(`${del_mess.author.tag}`, del_mess.author.displayAvatarURL);
  
  if(del_mess.attachments.size !== 0){
    embed.setImage(del_mess.attachments.first().proxyURL);
  };
  
  client.channels.get(client.logsch[del_mess.guild.id]).send(embed).catch(O_o => {});
}