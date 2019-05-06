exports.run = async (client, message, args, level) => {
  message.delete().catch(O_o=>{});

  const emoji = {
    a: '🇦',
    b: '🇧',
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: '🇮',
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: '🇲',
    n: '🇳',
    o: '🇴',
    p: '🇵',
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: '🇽',
    y: '🇾',
    z: '🇿',
    '0': '0⃣',
    '1': '1⃣',
    '2': '2⃣',
    '3': '3⃣',
    '4': '4⃣',
    '5': '5⃣',
    '6': '6⃣',
    '7': '7⃣',
    '8': '8⃣',
    '9': '9⃣',
    '!':'❗',
    '?':'❓'
  },

  emoji1 = {
    a: '463640708625072128',
    b: '463640750979022858',
    c: '463771160958599168',
    d: '463771188871823361',
    e: '463771189031206922',
    f: '463771299869753345',
    g: '463771300369006592',
    h: '463771300029267978',
    i: '463771300310286362',
    j: '463771300528390163',
    k: '463771300444372994',
    l: '463771300494573568',
    m: '463771300876255262',
    n: '463771300263886868',
    o: '463771301119655967',
    p: '463771300083531776',
    q: '463771300209360896',
    r: '463771300683317249',
    s: '463771300691836979',
    t: '463771300209491968',
    u: '463771300092051476',
    v: '463771300356161536',
    w: '463771300062691330',
    x: '463771300142252033',
    y: '463771300045914113',
    z: '463771300796825610',
  };

  let letter = args.splice(1).join(' ').split(/([a-z0-9])/i),
  msgid = args[0],
  reacted = [];
  
  
  for(var i = 0; i < letter.length; i++){
    if(letter[i] === ' '){
      if(!reacted.includes('463779961065701386')){
        reacted.push('463779961065701386')
      }
      else{
        reacted.push('463779961317228574')
      }
    }

    if(letter[i] in emoji){
      if(!reacted.includes(emoji[letter[i]])){
        reacted.push(emoji[letter[i]])
      }
      else{
        reacted.push(emoji1[letter[i]])
      }
    }
  }

  message.channel.fetchMessage(msgid).then(msg => {
    client.multipleReact(msg, reacted);
  })
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  category: "fun"
};
  
exports.help = {
  name: "react",
  category: "Развлечения",
  description: "Пишет заданный текст реакциями под заданным сообщением",
  usage: "react <id_сообщения> <text>"
};