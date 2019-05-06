exports.run = async (client, message, args, level) => {
  if(!args[0]) return message.channel.send("Упомяните канал.");
  
  let channel = message.mentions.channels.first();
  if(!channel) return message.channel.send("Упомяните канал.");
  if(channel.type !== "text") return message.channel.send("Укажите текстовый канал.");
  
  if(args[1]){
    let emojis = [];
    for (let i = 1; i<args.length; i++){
      let emoji = message.guild.emojis.get(args[i].slice(args[i].length-19, args[i].length-1));
      if(!emoji) continue;
      emojis.push(emoji.id);
    }
  
    if (emojis.length === 0) return message.channel.send("Произошла ошибка, проверите, записаны ли все эмодзи через пробел и есть ли они на данном сервере.");
    if (emojis.length  > 10) return message.channel.send("Бот не поддерживает выставление больше 10 реакций.");

    client.con.query(`UPDATE servers SET vote = "${channel.id} ${emojis.join(" ")}" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      client.votech[channel.id] = emojis;
      console.log(client.votech);
      message.channel.send(`Канал для автовыставления рекций успешно изменен на \`${channel.name}\`. В нем будут выставляться реакции, которые стоят под этим сообщением. Если выставлены не все реакции, то проверите, записаны ли все эмодзи через пробел и есть ли они на данном сервере. А также, имеет ли бот право добавлять реакции и читать историю сообщений.`).then(msg => {
        client.multipleReact(msg, emojis);
      })
    });
  } else {
    client.con.query(`UPDATE servers SET vote = "null" WHERE id = "${message.guild.id}"`, function (err) {
      if (err) throw err;
      delete client.votech[channel.id];
      message.channel.send(`Канал для автовыставления рекций успешно удален.`);
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
  name: "set_vote",
  category: "Команды для настройки",
  description: "Настройка автовыставления рекций в определенном канале",
  usage: "set_vote #канал [эмодзи1] [эмодзи2] ...",
  note: "Команду можно использовать без эмодзи для удаления канала. Эмодзи должны быть записаны через пробел и быть на данном сервере."
};