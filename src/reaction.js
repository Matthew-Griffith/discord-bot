/* this is the implementation of the react command which will let user quick post
  images or video to the channel, it will let anyone add to the list of available ones
  this list will be saved incase the machine needs to restart.

  TODO: newEntry function, export function, test
*/

// include the node fs to read and write
const fs = require("fs");
const prefix = "!";

function newEntry(name, link, obj, fileName) {
  /* name (str): the name of the reaction
    obj (object): the object data structure that the name is in
    fileName (str): is where the obj gets pulled from when the bot is restarted
    link (str): the url from the reaction video or image

    this function this function just checks to see if name is in obj and if not
    the name is add to the obj and backed up to disk. 
  */
  if (name in obj) {
      return "This name is already being used";
  }

  else {
      obj[name] = link;
      fs.writeFileSync(fileName, JSON.stringify(obj), 'utf-8');          
      return (name + " was created");
  }
}

exports.command = function(msg, obj) {
  msg = msg.slice(msg.indexOf(prefix + "react"), msg.length);
  msg = msg.split(" ");
  fileName = './reaction.json';
  subCommand = msg[1].toLowerCase();
  name = msg[2].toLowerCase();
  link = msg[3];

  if (obj[subCommand]) {
    return obj[subCommand];
  }
  else if (subCommand === "new" && name && link) {
    if (name === "new") {
      return "new can't be used as a name for an entry";
    }
    else {return newEntry(name, link, obj, fileName);}
  }
  else if (subCommand === "help") {
    return ("the react command has two functions, bring up a saved video or image "
            + "or to save a image or video for later.\n"
            + "they have the form:\n"
            + "!react <save name for a link>\n"
            + "!react new <name> <link>");
  }
  else {return "check the spell for your command"; }
}

