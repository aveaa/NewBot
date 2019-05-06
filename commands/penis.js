exports.run = async (client, message, args, level) => {
  let user = message.mentions.users.first();
  
  if(!user) user = message.author;
  
  let idarr = user.id.split('');

  let sum = 0;
  for (var i = 0; i < idarr.length; i++){
     sum += Number(idarr[i])
  };

  let x = 0;
  x = sum % 69;

  if(x > 30){
    x = x % 33
    if(x > 30){
      x = 30
    };
  };

  message.channel.send('8'+'='.repeat(x)+'D');
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["пенис"],
  permLevel: "User",
  category: "fun"
};
  
exports.help = {
  name: "penis",
  category: "Развлечения",
  description: "Измеряет пениc упомянутого прльзователя",
  usage: "penis @Someone"
};