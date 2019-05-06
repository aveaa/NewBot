exports.run = async (client, message, args, level) => {
  let categorylist = {
    "автороли" : "autorole",
    "команды для настройки" : "settings",
    "персональные роли" : "personrole",
    "развлечения" : "fun",
    "разное" : "miscelaneous",
    "системные" : "system"
  };

  let category = categorylist[args.join(" ").toLowerCase()];

  if (!category) {
    message.channel.send("Выберите категорию которую хотите включить или отключить на данном сервере.\n`Автороли`, `Команды для настройки` `Персональные роли`, `Развлечения`, `Разное`, `Системные`");
  } else if (category === "settings") {
    return message.channel.send(`Извините, но категорию \`${args.join(" ")}\` нельзя отключить`)
  } else {
    if (client.servers[message.guild.id][category]) {
      client.servers[message.guild.id][category] = 0;
      message.channel.send(`Категория \`${args.join(" ")}\` успешно выключена на данном сервере.`);

      client.con.query(`UPDATE servers SET ${category} = 0 WHERE id = "${message.guild.id}"`, function (err) {
        if (err) throw err;
        client.con.query(`CREATE TABLE IF NOT EXISTS roles_${message.guild.id} (num INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), id CHAR(18), cat TINYINT UNSIGNED)`, function (err, result) {
          if (err) throw err;
        });
      });
      
    } else {
      client.servers[message.guild.id][category] = 1;
      message.channel.send(`Категория \`${args.join(" ")}\` успешно включена на данном сервере.`);

      client.con.query(`UPDATE servers SET ${category} = 1 WHERE id = "${message.guild.id}"`, function (err) {
        if (err) throw err;
      });

    }
  }
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["категория"],
  permLevel: "Administrator",
  category: "settings"
};
  
exports.help = {
  name: "category",
  category: "Команды для настройки",
  description: "Включает или отключает категорию на данном сервере.",
  usage: "category <название категории>"
};