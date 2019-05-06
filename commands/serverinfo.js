const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  let vl = ['Нету', 'Низкий', 'Средний', 'Высокий', 'Очень высокий'];
  
  let text = message.guild.channels.filter(guildchannel => {if(guildchannel.type == "text") return guildchannel}).size,
      voice = message.guild.channels.filter(guildchannel => {if(guildchannel.type == "voice") return guildchannel}).size;
  
  let embed = new Discord.RichEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription("ID:"+message.guild.id)
  .setColor(client.config.color)
  .setThumbnail(message.guild.iconURL)
  .addField("Уровень проверки", vl[message.guild.verificationLevel], true)
  .addField("Регион", message.guild.region, true)
  .addField(`Участники [${message.guild.members.size}]`,`<:online:549912743776616458> ${message.guild.members.filter(m => m.presence.status === 'online').size}\n<:away:549912743759577109> ${message.guild.members.filter(m => m.presence.status === 'idle').size}\n<:dnd:549912743667433479> ${message.guild.members.filter(m => m.presence.status === 'dnd').size}`, true)
  //.addField("Участники []",'Всего:      `'+message.guild.memberCount+'`\nОнлайн:  `'+message.guild.members.filter(m => m.presence.status !== 'offline').size+'`', true)
  .addField(`Каналы [${text+voice}]`,`Категории: \`${message.guild.channels.size - text - voice}\`\nТекстовых: \`${text}\`\nГолосовых: \`${voice}\``, true )
  //.addBlankField(true)
  .addField("Создатель:", `${message.guild.owner} (${message.guild.owner.id})`)
  .addField("Дата создания:", `${message.guild.createdAt.getDate()}/${message.guild.createdAt.getMonth()+1}/${message.guild.createdAt.getFullYear()}  ${message.guild.createdAt.getHours()}:${message.guild.createdAt.getMinutes()}:${message.guild.createdAt.getSeconds()}`)
  .addField("Роли:", `\`${message.guild.roles.size}\` шт.`)

  message.channel.send(embed);
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["server", "серверинфо", "сервер"],
  permLevel: "User",
  category: "systems"
};
  
exports.help = {
  name: "serverinfo",
  category: "Системные",
  description: "Вся информация о данном сервере",
  usage: "serverinfo"
};