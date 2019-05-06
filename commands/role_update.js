exports.run = async (client, message, args, level) => {
  let sep = message.content.indexOf(';'),
  sep2 = message.content.indexOf('#'),
  rolename = message.content.slice(13,sep).trim(),
  newrolename = message.content.slice(sep+1,sep2).trim(),
  newrolecolor = message.content.slice(sep2+1).trim();

  if(sep === -1 && sep2 === -1) return message.channel.send('Пожалуйста, соблюдайте синтаксис\n```'+prefix+'role_update <имя роли>; <новое имя> <#цвет>```');
  if(sep === -1 && sep2 !== -1) rolename = newrolename = message.content.slice(13,sep2).trim();
  if(sep !== -1 && sep2 === -1) {
    newrolename = message.content.slice(sep+1).trim();
    newrolecolor = message.guild.roles.find(r => r.name === rolename).color;
  };

  let role = message.guild.roles.find(r => r.name === rolename);

  if(newrolename.length > 20 && newrolename !== rolename) return message.channel.send('Новое название роли слишком длинное. Максимальноя установленая длина - 20 символов.');
  if(!role) return message.channel.send('Данная роль не найдена.');
  if(!message.member.roles.has(role.id)) return message.channel.send('Вы не имеете данной роли, или допустили ошибку.');
  if(role.members.size > 1) return message.channel.send('Вы являетесь не единственным обладателем этой роли, поэтому не можете изменить её.');

  client.con.query(`SELECT * FROM roles_${message.guild.id} WHERE id = '${role.id}'`, function (err, result) {
    if(err) throw err;
    if(!result[0]){
      role.edit({
        name: newrolename,
        color: newrolecolor
      })
      .then(message.channel.send('Роль успешно изменена.'))
      .catch(console.error);
    } else {
      message.channel.send('Вы не можете изменить эту роль.')
    };
  });
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["изменить_роль"],
  permLevel: "User",
  category: "personrole"
};
  
exports.help = {
  name: "role_update",
  category: "Персональные роли",
  description: "Изменяет роль с заданым названием",
  usage: "role_update <старое имя роли>; <новое имя роли> <#новый цвет>.",
  note: "Не работает на системные, автоматические, а также те роли, у которых больше одного пользователя. Цвет указывается в виде #hex кода"
};