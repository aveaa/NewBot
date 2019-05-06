exports.run = async (client, message, args, level) => {
  let role = message.guild.roles.find(r => r.name === message.content.slice((prefix+command).length).trim());
    
  console.log(role);
  if(!role) return message.channel.send('Данная роль не найдена.');

  if(!message.member.roles.has(role.id)) return message.channel.send('Вы не имеете данной роли, или допустили ошибку.');

  client.con.query(`SELECT * FROM roles_${message.guild.id} WHERE id = '${role.id}'`, function (err, result) {
    if(err) throw err;
    if(!result[0]){
      if(role.members.size > 1){
        message.member.removeRole(role);
        message.channel.send('Роль была снята.')
      } else {
        role.delete();
        message.channel.send('Роль удалена.')
      }
    } else {
      if(result[0].cat === 0) {
        message.member.removeRole(role);
        message.channel.send('Роль снята.');
      } else if (result[0].cat === 1) {
        message.channel.send('Вы не можете снять или удалить эту роль.')
      } else {
        message.channel.send('Неизвестная ошибка. Обратитесь к создателю.')
      }
    }
  })
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["удалить_роль"],
  permLevel: "User",
  category: "personrole"
};
  
exports.help = {
  name: "role_delete",
  category: "Персональные роли",
  description: "Удаляет роль с заданым названием",
  usage: "role_delete <имя_роли>",
  note: "С ролями которые включены в системные (командой `add systemrole`) ничего не произойдет. Если пользователей роли больше одного - снимает её"
};