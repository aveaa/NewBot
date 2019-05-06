module.exports = async (client, guild) => {
  client.con.query(`DELETE FROM servers WHERE id = ${guild.id}`, function (err, result) {
    if (err) throw err;
    console.log(`Сервер ${guild.name} успешно удален из базы.`)
  });
}