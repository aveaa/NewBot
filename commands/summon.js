const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
    
  message.delete().catch(O_o => {});
    
  let member = message.mentions.members.first(),
  reason = args.slice(1).join(' ');
  
  if(!reason) reason = 'Причина не указана <:Thonkery:471010371587538944>';
  
  if(member){
    let embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setColor(0xf8f000)
    .addField('Призыватель:', `${message.member} (${message.author.tag})`)
    .addField('Причина призыва:', reason)
    .addField('Канал:', `<#${message.channel.id}>`)
    
    member.send('**Вас призвали на сервере:**', embed);
  };
};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["призвать"],
  permLevel: "Administrator",
  category: "miscelaneous"
};
  
exports.help = {
  name: "summon",
  category: "Разное",
  description: "Призывает нужного человека",
  usage: "summon @Someone <причина>"
};