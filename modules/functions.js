const mysql = require('mysql');

module.exports = (client) => {
  client.con = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
  });

  client.handleDisconnect = (con) => {
    con.on('error', function(err) {
      if (!err.fatal) {
        return;
      };
  
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      };
      console.log('Переподключение потеряного соединения: ' + err.stack);
      client.handleDisconnect(con);
      client.con.connect(function(err) {
        if (err) throw err;
        console.log("База данных перезапущена..");
      });
    });
  };

  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0")
      .replace("client.token", "\"mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0\"")
      .replace("process.env.BOT_TOKEN", "\"mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0\"")
      
    return text;
  };

  client.multipleReact = async (message, arr) => {
    if (arr !== []) {
        await message.react(message.guild.emojis.get(arr.shift())).catch(O_o => {}).then(function () {client.multipleReact(message, arr).catch(O_o => {})});
    }
  };
}
