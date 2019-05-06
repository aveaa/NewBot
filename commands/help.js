const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
  if (!args[0]) {
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let embed = new Discord.RichEmbed()
    .setColor(client.config.color)
    .setFooter("© SevenTrio, 2019")
    .addField(`Список команд`, `\`\`\`asciidoc\n[Используй ${client.config.prefix}help <имя_команды> для деталей]\`\`\``);

    let output = "```asciidoc\n";
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    let currentCategory = sorted[0].help.category;
    
    sorted.forEach( c => {
      const cat = c.help.category;
      if (currentCategory !== cat) {
        output += "```"
        embed.addField(currentCategory, output);
        currentCategory = cat;
        output = "```asciidoc\n";
      }
      if (c.conf.enabled) output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });

    embed.addField(currentCategory, output+"```");
    embed.addField("Полезные ссылки", `[Пригласить бота на свой сервер](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=268790982&scope=bot)\n[Сервер для связи с автором бота](https://discord.gg/N4mN2u4)\n\n__Для связи с автором можно так же писать в лс боту__`);

    message.channel.send(embed);
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return message.channel.send("У вас недостаточно прав для просмотра этой команды");
      let embed = new Discord.RichEmbed()
      .setColor(client.config.color)
      .setFooter(`Модуль: ${command.help.category}`)
      .addField(`\`${client.config.prefix}${command.help.name}\``, `${command.help.description}`)
      .addField("Использование", `\`${client.config.prefix}${command.help.usage}\``);
      
      if(command.help.note) {
        embed.addField("Примечание", command.help.note);
      };

      if(command.conf.aliases.length !== 0){
        embed.addField("Другие варианты использования", `\`${client.config.prefix}${command.conf.aliases.join(`\`, \`${client.config.prefix}`)}\``)
      };

      message.channel.send(embed);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp", "помощь"],
  permLevel: "User",
  category: "systems",
};

exports.help = {
  name: "help",
  category: "Системные",
  description: "Отображает все доступные команды для вашего уровня доступа",
  usage: "help [команда]"
};