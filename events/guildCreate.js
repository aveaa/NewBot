module.exports = async (client, guild) => {

  client.servers[guild.id] = {};
  client.servers[guild.id].miscelaneous = 1;
  client.servers[guild.id].autorole = 0;
  client.servers[guild.id].personrole = 0;
  client.servers[guild.id].reactions = 0;
  client.servers[guild.id].fun = 0;
  client.servers[guild.id].economics = 0;
  client.servers[guild.id].systems = 1;
  client.servers[guild.id].settings = 1;
  client.servers[guild.id].moderators = 0;
  client.servers[guild.id].administrators = 0;

  client.con.query(`INSERT INTO servers (id, miscelaneous, autorole, personrole, reactions, fun, economics, systems, settings) VALUES ('${guild.id}', 1, 0, 0, 0, 0, 0, 1, 1)`, function (err, result) {
    if (err) throw err;
    console.log(`Сервер ${guild.name} успешно добавлен в базу.`)
  });
};