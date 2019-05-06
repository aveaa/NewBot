exports.run = async (client, message, args, level) => {
  let rname = args.join(' ').toLocaleLowerCase();
  client.con.query(`SELECT * FROM roles_${message.guild.id} WHERE name = '${rname}' AND cat = 0`, function (err, result) {
    if(err) throw err;
    if(!result[0]) return message.channel.send('Автороль с таким именем не найдена, пожалуйста, проверьте правильность написания.');
    if(!message.member.roles.has(result[0].id)){
      message.member.addRole(result[0].id)
      message.channel.send('Роль добавлена.')
    } else {
      message.member.removeRole(result[0].id)
      message.channel.send('Роль снята.')
    };
  });
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
  category: "autorole"
};
  
exports.help = {
  name: "autorole",
  category: "Автороли",
  description: "Выдает роль автору сообщения",
  usage: "autorole <имя_роли>"
};