exports.run = async (client, message, args, level) => {
  let sep = message.content.indexOf('#'),
  rolename = message.content.slice((prefix+command).length, sep).trim(),
  rolecolor = '0x'+ message.content.slice(sep+1).trim();
    
  if(sep === -1){
    rolename = message.content.slice((prefix+command).length).trim();
    rolecolor = 0
  };
    
  if(message.guild.roles.find(r => r.name === rolename)) return message.channel.send('Роль с таким именем уже существует.');
  if(rolename.length > 20) return message.channel.send('Ваша роль слишком длинная. Максимальноя установленая длина - 20 символов.');
    
  let grole = [],
      mrole = message.member.roles.keyArray();
      
  client.con.query(`SELECT * FROM roles_${message.guild.id}`, function (err, result) {
    if(err) throw err;
    result.forEach(r => {grole.push(r.id)});
    for(var i = 0; i<mrole.length; i++){
      if(grole.includes(mrole[i])){
        mrole.splice(i, 1);
        i--;
      };
    };
    
    if(mrole.length>3) return message.channel.send('Вы не можете иметь больше 2 уникальных ролей');
    
    message.guild.createRole({
      name: rolename,
      color: rolecolor,
      position: 3,
    })
    .then(role => message.member.addRole(role));

    message.reply('Держи свою роль!');
  });      
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["роль"],
  permLevel: "User",
  category: "personrole"
};
  
exports.help = {
  name: "role",
  category: "Персональные роли",
  description: "Выдает роль с заданым названием и цветом",
  usage: "role <имя_роли> <#цвет> (цвет в формате hex)"
};