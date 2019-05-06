exports.run = async (client, message, args, level) => {
  try {
    let code = await client.clean(client, args.join(" "));
    const output = eval(code);
    const clean = await client.clean(client, output);
    message.author.send(`${clean}`, {split:"\n", code:"js"});
    message.react("✅")
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    message.react("❎")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
  category: "systems"
};

exports.help = {
  name: "eval",
  category: "Системные",
  description: "Выполняет произвольный javascript код",
  usage: "eval [...code]"
};