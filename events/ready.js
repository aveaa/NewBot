module.exports = async (client) => {
    client.channels.get(client.config.botlogs).send(`Бот стартовал, вместе с ${client.users.size} пользователями, на ${client.channels.size} каналах в ${client.guilds.size} гильдиях!`);
    console.log(`Бот стартовал, вместе с ${client.users.size} пользователями, на ${client.channels.size} каналах в ${client.guilds.size} гильдиях!`);
    client.user.setActivity('за Орденом Геймеров', { type: 'WATCHING' });
    client.config.token = "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0";
}