const Discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === 'dm'){
    if(message.author.id === client.user.id) return;
      let embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag+'  ('+message.author.id+')', message.author.displayAvatarURL)
      .setColor(0xf88000)
      .setDescription(`\`\`\`${message.content}\`\`\``)
      .setTimestamp();
      client.channels.get(client.config.dmlogs).send(embed);
  }

  if (client.votech[message.channel.id]) client.multipleReact(message, JSON.parse(JSON.stringify(client.votech[message.channel.id])));

  if (message.author.bot) return;

  let prefix = false;
  for(const thisPrefix of client.config.prefixes) {
    if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  
  if(!prefix) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (message.guild && !message.member) await message.guild.fetchMember(message.author);
  
  const level = client.permlevel(message);

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;
  
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("Эта команда не работает в приватных сообщениях. Пожалуйста, попробуйте использовать её на сервере.");
  if (!cmd.conf.enabled)
    return message.channel.send("Эта команда временно отключена.")

  if (level < client.levelCache[cmd.conf.permLevel])
    return message.channel.send(`Вы не имеете прав для использования данной команды.\n\`\`\`Ваш правой уровень ${level} (${client.config.permLevels.find(l => l.level === level).name})\nЭта команда требует уровень ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})\`\`\``);

  if (message.guild) {
    if (client.servers[message.guild.id][cmd.conf.category]) {
      cmd.run(client, message, args, level) 
    } else {
      message.channel.send(`Извините, но категория \`${cmd.help.category}\` отключена на данном сервере.`)
    }
  } else {
    cmd.run(client, message, args, level);
  };   
};