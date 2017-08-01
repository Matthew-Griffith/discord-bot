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
  msg = msg.toLowerCase();
  msg = msg.slice(msg.indexOf(prefix + "react"), msg.length);
  msg = msg.split(" ");
  fileName = './reaction.json';
  subCommand = msg[1];
  name = msg[2];
  link = msg[3];

  if (obj[subCommand]) {
    return obj[subCommand];
  }
  else if (subCommand === "new") {
    return newEntry(name, link, obj, fileName)
  }
  else {return "check the spell for your command"; }
}

