exports.run = async (client, message, args, level) => {
  let msg = await message.channel.fetchMessage(args[0]).catch(console.error);
  if(!msg) return message.channel.send("Указано неверное id_сообщения.");
  if(msg.author.id !== client.user.id) return message.channel.send("Я не могу редактировать сообщения других пользователей.")
  msg.edit(await client.clean(client, args.splice(1).join(" ")));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["изменить"],
  permLevel: "Moderator",
  category: "miscelaneous"
};

exports.help = {
  name: "edit",
  category: "Разное",
  description: "Изменяет сообщение бота",
  usage: "edit [id_сообщения] <текст>"
};