exports.run = async (client, message, args, level) => {
  if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('У вас недостаточно прав.');

  let cat;

  if(args[0] === 'autorole') cat = 0
    else if (args[0] === 'systemrole') cat = 1
      else return message.channel.send('Данной команды не существует');

  args.splice(0, 1);
  let role = args.join(' ').toLocaleLowerCase();

  client.con.query(`DELETE FROM roles_${message.guild.id} WHERE name = '${role}' AND cat = ${cat}`, function (err, result) {
    if (err) throw err;
    if(result.affectedRows !== 0) message.channel.send('Роль удалена.') 
      else message.channel.send('Данная роль не найдена.');      
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
  name: "remove",
  category: "Автороли",
  description: "Удаляет автоматическую или системную роль из базы",
  usage: "remove <autorole/systemrole> <@role>"
};