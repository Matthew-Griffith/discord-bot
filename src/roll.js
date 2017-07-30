/*
  below this the logic for the roll command for the bot

  TODO: generalize the dice rolls and add the coin
*/

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

function rollDice(numDice, numSides) {
  /*
    numDice (int): the number of dice the user wants to roll
    numSides (int): number of sides of the die
  */
  result = 0; 

  for (i = 0; i < numDice; i++ ) {
    result += getRandomInt(1, numSides);
  }

  return result;
}

function help() {
  return ("this command lets you either roll a user provide number of dice and sides\n"
          + "structure: !roll <number of dice>d<number of sides>");
}

exports.command = function(msg, numDice, numSides) {
  msg = message.content.toLowerCase();
  msg = msg.slice(message.content.indexOf(prefix + "roll"), msg.length);
  msg = msg.split(" ");
  input = msg[1]; 
  if (input)
  switch (subCommand) {
    case "coin" : return coin();
    case "dice" : return rollDice(numDice, numSides); 
    case "help" : return help();
    default : return "Check the spelling of the sub-command";
  }
}