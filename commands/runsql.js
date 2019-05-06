exports.run = async (client, message, args, level) => {
  const sql = args.join(' ');
  client.con.query(sql, function (err, result) {
    if (err) {
      message.channel.send(`\`\`\`${err}\`\`\``);
    } else {
      message.channel.send('Запрос выполнен успешно.')
    }
  });
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["run", "sql"],
  permLevel: "Bot Owner",
  category: "systems"
};
  
exports.help = {
  name: "runsql",
  category: "Системные",
  description: "Выполняет заданный sql запрос к базе данных",
  usage: "runsql <sql>"
};