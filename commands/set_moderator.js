exports.run = async (client, message, args, level) => { 
  let role = message.mentions.roles.first();

  if(args[0]){
    if(!role) return message.channel.send("Упомяните роль.");

    client.con.query(`UPDATE servers SET moderators = "${role.id}" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      client.servers[message.guild.id].moderators = role.id;
      message.channel.send(`Роль модератора успешно изменена на \`${role.name}\``);
    });
  } else {
    client.con.query(`UPDATE servers SET moderators = "null" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      delete client.servers[message.guild.id].moderator;
      message.channel.send(`Роль модератора успешно удаленa.`);
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
  name: "set_moderator",
  category: "Команды для настройки",
  description: "Установка роли модератора",
  usage: "set_moderator @роль",
  note: "Команду можно использовать без роли для её удаления."
};