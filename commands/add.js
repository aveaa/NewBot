exports.run = async (client, message, args, level) => {
  if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('У вас недостаточно прав.');
      
  let cat;

  if(args[0] === 'autorole') cat = 0
    else if (args[0] === 'systemrole') cat = 1
      else return message.channel.send('Данной команды не существует');

  let role = message.mentions.roles.first();
  if(!role) return message.channel.send('Пожалуйста, упомяните роль.');
  if(role.position > message.member.highestRole.position) return message.channel.send('Вы не можете добавить роль, которая стоит выше вашей.');
      
  client.con.query(`INSERT INTO roles_${message.guild.id} (name, id, cat) VALUES ('${role.name.toLocaleLowerCase()}', '${role.id}', ${cat})`, function (err, result) {
    if (err) throw err;
    message.channel.send('Роль добавлена.')
  })
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
  category: "autorole"
};
  
exports.help = {
  name: "add",
  category: "Автороли",
  description: "Добавляет автоматическую или системную роль",
  usage: "add <autorole/systemrole> <@role>",
  note: "Системные роли нужны для избежания их удаления при включеной системе персональных ролей. Автоматические роли пользователи могут получить сами, при помощи команды `autorole`"
};