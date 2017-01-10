var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("message", (message) => {
    //this is the prefix at the start of all  the commands
    let prefix = "!";
    // this an object that will content the commands and responses
    var responseObject = {
        "!ping": "pong",
        "!pong": "ping",
        "!laughing": "http://i.imgur.com/otiwuFe.gif",
        "!shitposting": "https://media.giphy.com/media/B16hI3gdM9hO8/giphy.gif",
        "!waifu": "http://vignette2.wikia.nocookie.net/konosuba/images/5/56/Ln_Wiz.png/revision/latest?cb=20160331034327",
        "!help": "list of commands:\n!laughing\n!shitposting\n!waifu"
    }

    // checks if the message starts with a prefix, if it doesn't it stop or returns
    if(!message.content.startsWith(prefix)) return;

    // this stop this bot from responsing to other bots, which could be an issue.
    if(message.author.bot) return;

    // this is the logic for the commands
    if(responseObject[message.content]) {
        message.channel.sendMessage(responseObject[message.content]);
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("MjY3NTg1NDgxNzAzODE3MjE5.C1WSWg.ZNM3q3NR8v9jREEHUSeVNmbVYYM");

/* todo:
    timezone queries
    version control setup
    running on raspberry pi
    look into making the bot search old messages
*/