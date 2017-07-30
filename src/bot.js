// the libraries the bot uses for is commands and to connect to discord.
const fs = require("fs");
const Discord = require("discord.js");
const moment = require("moment-timezone");
const ddg = require("ddg");
const YouTube = require('youtube-node');

const groupCommand = require('./group.js');
const roll = require('./roll.js');

const groups = JSON.parse(fs.readFileSync("groups.json", "utf8"));
const config = require("../config/config.json");

const youtube = new YouTube();
youtube.setKey(config.youtubeKey);
const bot = new Discord.Client();

// function for a random int made for the !roll command
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

bot.on("message", (message) => {
    // this is the prefix at the start of all the commands
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
        "!help": "list of commands:\n!laughing\n!shitposting\n!calm\n!anime\n!itsokay\n!what\n!embarrassed\n!love\n!fire\n!mmm\n!time: this command will give the time and data of a list of cities see !cities\n!geneticfreak\n!answer takes a user input and tries to tell you about it, for all the time you have thought what the fuck is he talking about.\n!yt: input a search and returns the top youtube result.\n!roll: I can flip coins, roll: d4, d6, d8, d10, d12 and d20",
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
    // if(!message.content.startsWith(prefix)) return;

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
      else {
        message.channel.sendMessage('Please check for typos in your query, and make sure the city is in the !cities list.')
      }
    }

    /*
      below is the answer command implementation it searchs duck duck go and try to
      given a small useful Abstract for the user.

      TODO: look into bug with duckduckgo instant answers working on the website but not for the bot.
            overwatch as a query is an example of this.
    */
    if (message.content.startsWith(prefix + "answer")) {
      var user_search = message.content.slice(8, message.content.length);
      ddg.query(user_search, function(err, data){
        if (data.Abstract === '') {
          message.channel.sendMessage("I don't know... #blameMatt");
        }
        else if (err) {
          message.channel.sendMessage("oh god, there was an error.");
        }
        else {message.channel.sendMessage(data.Abstract);}
      });
    }

    /*
      this command will search youtube and return the top results and post for people in the
      chat.

      TODO: try to get a few search results and display the 2nd or 3rd result when the first result
            is a playlist or channnel.
    */
    if (message.content.startsWith(prefix + "yt")) {
      var user_search = message.content.slice(4, message.content.length);
      youtube.search(user_search, 1, function(error, result){
        if (error) {
          message.channel.sendMessage("oh god there was an error");
          //console.log(error);
        }
        else if (result.items[0].id.videoId === undefined){
          message.channel.sendMessage("sorry I can't display the results of your search.")
        }

        else {
          message.channel.sendMessage("http://www.youtube.com/watch?v=" + result.items[0].id.videoId);
        }
      });
    }

    /*
      this is a command to "roll" dice. it pretty straigth forward will use getRandomInt
      function the created in the begin of this file.

      TODO:
    */
    if (message.content.indexOf(prefix + "roll") >= 0) {
      
      subCommand = msg[1]; 

      if (subCommand === "coin") {

      }
    }

    // this is the logic for the commands
    msgArray = message.content.split(' ');
    if(responseObject[msgArray[0]]) {
        message.channel.sendMessage(responseObject[msgArray[0]]);
    }

    // below is the logic the groups feature.
    if (message.content.indexOf(prefix + "group") >= 0) {
      msg = message.content.toLowerCase();
      msg = msg.slice(message.content.indexOf(prefix + "group"), message.content.length);
      msg = msg.split(" ");
      filename = './groups.json' ;
      command = msg[1];
      groupName = msg[2];
      authorID = message.author.id.toString();
      username = message.author.username;

      message.channel.sendMessage(groupCommand.command(groupName, groups, filename, username, authorID, command));
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login(config.testBot);
