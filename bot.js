// the libraries the bot uses for is commands and to connect to discord.
var Discord = require("discord.js");
var moment = require("moment-timezone");
var ddg = require("ddg");

var bot = new Discord.Client();

bot.on("message", (message) => {
    //this is the prefix at the start of all  the commands
    let prefix = "!";
    // this an object that will content the commands and responses
    var responseObject = {
        "!calm": "http://i.imgur.com/GwVuz57.gif",
        "!anime": "http://i.imgur.com/JZKo0sf.gifv",
        "!laughing": "http://i.imgur.com/q2SwDMJ.gif",
        "!shitposting": "http://i.imgur.com/y0pc24c.png",
        "!itsokay": "http://i.imgur.com/558JUew.jpg",
        "!what": "http://i.imgur.com/2VJLpxj.jpg",
        "!embarrassed": "http://i.imgur.com/JeLyivH.gif",
        "!love": "http://i.imgur.com/8ZsL61S.gif",
        "!fire": "http://i.imgur.com/6XcSabd.png",
        "!mmm": "http://i.imgur.com/Ubjkvpd.gif",
        "!help": "list of commands:\n!laughing\n!shitposting\n!calm\n!anime\n!itsokay\n!what\n!embarrassed\n!love\n!fire\n!mmm\n!time: this command will give the time and data of a list of cities see !cities\n!geneticfreak\n!answer takes a user input and tries to tell you about it, for all the time you have thought what the fuck is he talking about.",
        "!cities": "List of cities:\nnew york\nchicago\ndenver\nlos angeles\nlondon\nparis\nbucharest\nmoscow\ndubai\nbeijing\nseoul\ntokyo",
        "!geneticfreak": "https://www.youtube.com/watch?v=WFoC3TR5rzI"
    }

    var timezone_data = {
      "!time new york": "America/New_York",
      "!time chicago": "America/Chicago",
      "!time denver": "America/Denver",
      "!time los angeles": "America/Los_Angeles",
      "!time london": "Europe/London",
      "!time paris": "Europe/Paris",
      "!time bucharest": "Europe/Buccharest",
      "!time moscow": "Europe/Moscow",
      "!time dubai": "Asia/Dubai",
      "!time beijing": "Asia/Beijing",
      "!time seoul": "Asia/Seoul",
      "!time tokyo": "Asia/Tokyo"
    }

    // checks if the message starts with a prefix, if it doesn't it stop or returns
    if(!message.content.startsWith(prefix)) return;

    // this stop this bot from responsing to other bots, which could be an issue.
    if(message.author.bot) return;

    /*
      below is the implementation for the time zone command.

      TODO: try to generize this so that the users can just in most major cities without
      have to actually write all of them in the object above.
    */
    if(message.content.startsWith(prefix + "time")) {
      if(timezone_data[message.content.toLowerCase()]) {
        message.channel.sendMessage(moment.tz(timezone_data[message.content.toLowerCase()]).format('MM-DD HH:mm'));
      }
    }

    /*
      below is the answer command implementation it searchs duck duck go and try to
      given a small useful Abstract for the user.

      TODO: remove safe search.
    */
    if (message.content.startsWith(prefix + "answer")) {
      var user_search = message.content.slice(8, message.content.length);
      ddg.query(user_search, function(err, data){
        if (data.Abstract === '') {
          message.channel.sendMessage("I don't know... #blameMatt");
        }
        else {message.channel.sendMessage(data.Abstract);}
      });
    }

    // this is the logic for the simple commands.
    if(responseObject[message.content]) {
        message.channel.sendMessage(responseObject[message.content]);
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("bot_token_goes_here");
