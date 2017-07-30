/*
  below this the logic for the roll command for the bot

  TODO: generalize the dice rolls and add the coin
*/

prefix = "!";

function getRandomInt(min, max) {
  /*
    min (int): smallest number can be    
    max (int): largest the number can be

    this function generates a random int
  */
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function coin() {
  // simple function flips a coin and returns the result

  if (getRandomInt(0, 1) === 1) {
    return "It is... Tails";
  }
  else {return "It is... Heads"}
}

function rollDice(subCommand) {
  /*
    subCommand (str) : the users Subcommand
  */

  // here we will use these variables to keep track while we loop through the 
  // user's command.
  dice = true;
  numDice = 0;
  numSides = 0;

  for (i = 0; i < subCommand.length; i++) {
    if (typeof Number(subCommand[i]) === "number") {
      if (dice === true) {
        numDice += Number(subCommand[i]);
      }
      else {
        numSides += Number(subCommand[i]);
      }
    }      
    else if (subCommand[i] === 'd') {
      dice = false;
    }
    else {return "check your sub-command";}  
  }
  
  // here we take the results of the previous loop and add the result for the number
  // of dice and given the number of sides.
  result = 0;
  for (i = 0; i < numDice; i++) {
    result += getRandomInt(1, numSides);
  }

  return result;
}

function help() {
  // just tells the user the structure of the command
  return ("this command lets you either roll a user provide number of dice and sides\n"
          + "structure: !roll <number of dice>d<number of sides>");
}

exports.command = function(msg) {
  /*
    msg(str) : a str of the user's actually message

    this is the function that will be exported to the main file. 
  */
  // here we just need to get the subCommand that can be in an arbitary point in the
  // msg but must be after !roll
  msg = msg.toLowerCase();
  msg = msg.slice(msg.indexOf(prefix + "roll"), msg.length);
  msg = msg.split(" ");
  subCommand = msg[1]; 
  
  // now we just check which is the correct case, note that rolDice will return a 
  // helpful str if there is a syntax error and that is why it is the default case.
  switch (subCommand) {
    case "coin" : return coin();
    case "help" : return help();
    default : return rollDice(subCommand);
  }
}