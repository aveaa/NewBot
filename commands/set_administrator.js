exports.run = async (client, message, args, level) => { 
  let role = message.mentions.roles.first();

  if(args[0]){
    if(!role) return message.channel.send("Упомяните роль.");

    client.con.query(`UPDATE servers SET administrators = "${role.id}" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      client.servers[message.guild.id].administrators = role.id;
      message.channel.send(`Роль администратора успешно изменена на \`${role.name}\``);
    });
  } else {
    client.con.query(`UPDATE servers SET administrators = "null" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      delete client.servers[message.guild.id].administrators;
      message.channel.send(`Роль администратора успешно удаленa.`);
    });
  };
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  category: "settings"
};
  
exports.help = {
  name: "set_administrator",
  category: "Команды для настройки",
  description: "Установка роли администратора",
  usage: "set_administrator @роль",
  note: "Команду можно использовать без роли для её удаления."
};