exports.run = async (client, message, args, level) => {
    const sayMessage = await client.clean(client, args.join(" "));
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["скажи"],
    permLevel: "Moderator",
    category: "miscelaneous"
  };
  
  exports.help = {
    name: "say",
    category: "Разное",
    description: "Сообщение от бота",
    usage: "say [сообщение]"
  };