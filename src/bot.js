// the libraries the bot uses for is commands and to connect to discord.
const fs = require("fs");
const Discord = require("discord.js");
const YouTube = require('youtube-node');
const ddg = require("ddg");

// here are the files that contain the logic for their respective commands
const groupCommand = require('./group.js');
const roll = require('./roll.js');
const react = require('./reaction.js');
// here we import the json file that the bot need when it restarts
var groups = JSON.parse(fs.readFileSync("groups.json", "utf8"));
var reactionObj = JSON.parse(fs.readFileSync("reaction.json", "utf8"));
// here we load the reaction obj into memory
const config = require("../config/config.json");

const youtube = new YouTube();
youtube.setKey(config.youtubeKey);
// starts a new instance for the discord library
const bot = new Discord.Client();

bot.on("message", (message) => {
    // this is the prefix at the start of all the commands
    let prefix = "!";

    // this stop this bot from responsing to other bots, which could be an issue.
    if(message.author.bot) return;

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

    // this is for the roll commands, see roll.js for the implementation
    if (message.content.indexOf(prefix + "roll") >= 0) {
      message.channel.sendMessage(roll.command(message.content));
    }

    // this is from the react command
    if(message.content.indexOf(prefix + "react") > -1) {
      message.channel.sendMessage(react.command(message.content, reactionObj));
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

    // here will be a simple help statment for the bot
    if (message.content.indexOf(prefix + "help") >= 0) {
      message.channel.sendMessage("list of commands: \n yt \n group \n react \n answers \n roll")
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login(config.testBot);
