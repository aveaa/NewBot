module.exports = (client) => config = {
  "ownerID" : "218656629720219658",
 
  "botlogs" : "452557658759757828",
  "dmlogs"  : "457240171478515732",

  "special" : ["328516825685950465"/*Mixei#2020*/],
  "support" : [],
  "admins"  : [],

  "token"   : process.env.BOT_TOKEN,
  "prefix"  : "v!",
  "prefixes": ['v!', 'V!', 'v1', 'V1', '--', '??', '!!', '..', '//'],
  "color"   : "0x36393e",

  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },

    { level: 1,
      name: "Special",
      check: (message) => config.special.includes(message.author.id)
    },

    { level: 2,
      name: "Moderator",
      check: (message) => message.member.roles.has(client.servers[message.guild.id].moderators)
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => message.member.hasPermission('ADMINISTRATOR') || message.member.roles.has(client.servers[message.guild.id].administrators)
    },
    
    { level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};
