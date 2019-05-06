exports.run = async (client, message, args, level) => {
  if(args[0]){
    let channel = message.mentions.channels.first();

    if(!channel) return message.channel.send("Упомяните канал.");
    if(channel.type !== "text") return message.channel.send("Укажите текстовый канал.");

    client.con.query(`UPDATE servers SET mlogs = "${channel.id}" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      client.mlogsch[message.guild.id] = channel.id;
      message.channel.send(`Канал для логов участников успешно изменен на \`${channel.name}\`.`);
    });
  } else {
    client.con.query(`UPDATE servers SET mlogs = "null" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      delete client.mlogsch[message.guild.id];
      message.channel.send(`Канал для логов участников успешно удален.`);
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
  name: "set_members_logs",
  category: "Команды для настройки",
  description: "Настройка канала для логов прихода и ухода участников",
  usage: "set_members_logs имя_канала",
  note: "Команду можно использовать без аргумента для удаления канала. Бот должен иметь право вставлять ссылки!"
};