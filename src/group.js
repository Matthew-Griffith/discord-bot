/* here will be the set of functions that define the obj
    command and sub-commands. 

    todo: test: add, new, remove, help, ping, list
*/
const fs = require("fs");

exports.newEntry = function(entry, obj, fileName) {
    /* entry (str): the name of the group 
       obj (object): the object data structure that the entry is in
       fileName (str): is where the obj gets pulled from when the bot is restarted

       this function this function just checks to see if entry is in obj and if not
       the entry is add to the obj and backed up to disk. 
    */
    if (entry in obj) {
        return "This entry already exists, Baka!!!";
    }

    else {
        obj[entry] = {userIDs : [], usernames : []};
        fs.writeFileSync(fileName, JSON.stringify(obj), 'utf-8');          
        return (entry + " was created");
    }
}

function addMember(entry, userName, userID, obj, fileName) {
    /* entry (str): the name of the group 
       userID (str): a unique string of number from discord need to ping users
       userName (str): the users name which will be used for the list sub-command 
       obj (object): the object data structure that the entry is in
       fileName (str): is where the obj gets pulled from when the bot is restarted

       this function this function just checks to see if a user is in the group and
       if they are not it adds there userID and userName to the correct arrays in
       obj. 
    */
    if (entry in obj) {
          var currentGroup = obj[entry];
          var groupUsernames = currentGroup["usernames"];
          var groupIDs = currentGroup["userIDs"];

          if (groupUsernames.indexOf(userName) > -1) {
            return "you are already in this group";
          }

          else {
            groupUsernames.push(userName);
            groupIDs.push(userID);
            currentGroup["userIDs"] = groupIDs;
            currentGroup["usernames"] = groupUsernames;
            obj[entry] = currentGroup;            
            fs.writeFileSync(fileName, JSON.stringify(obj), 'utf-8');  
            return ("you were added to " + entry);                      
          }
        }
        else {
          return "this group doesn't exist yet, maybe you should start it";
        }
}

function removeMember(entry, userName, userID, obj, fileName) {
    /* entry (str): the name of the group 
       userID (str): a unique string of number from discord need to ping users
       userName (str): the users name which will be used for the list sub-command 
       obj (object): the object data structure that the entry is in
       fileName (str): is where the obj gets pulled from when the bot is restarted

       this function this function just checks to see if a user is in the group and
       if they are not it removes there userID and userName from the correct arrays in
       obj. 
    */

    if (entry in obj) {
        var currentGroup = obj[entry];
        var groupUsernames = currentGroup["usernames"];
        var groupIDs = currentGroup["userIDs"];  

        if (groupUsernames.indexOf(userName) > -1) {
            groupUsernames.splice(groupUsernames.indexOf(userName), 1);
            groupIDs.splice(groupIDs.indexOf(userID), 1);
            currentGroup["userIDs"] = groupIDs;
            currentGroup["usernames"] = groupUsernames;
            obj[entry] = currentGroup;            
            fs.writeFileSync(fileName, JSON.stringify(obj), 'utf-8'); 
            return ("you were removed from " + entry);          
        }

        else {
            return "you are not in this group";
        }
    }

    else {
        return "check the spelling on the group name, because that group doesn't exist.";            
    }
}

function ping(entry, obj) {
    /*
        entry (str): the name of the group 
        obj (object): the object data structure that the entry is in

        sends a mention to everyone in a group.
    */

    if (entry in obj) {
        var currentGroup = obj[entry];          
        var groupIDs = currentGroup["userIDs"];
        var pingMsg = "Yo: ";

        for (i = 0; i < groupIDs.length; i++) {
            pingMsg += "<@" + groupIDs[i] + "> ";
        }

        return pingMsg;
        }
    else {
        return "this group doesn't exist, maybe there was a typo.";
    }
}

function listMembers(entry, obj) {
    /*
        entry (str): the name of the group 
        obj (object): the object data structure that the entry is in

        sends a list of everyone in a group.
    */

    if (entry in obj) {
        var currentGroup = obj[entry];
        var groupUsernames = currentGroup["usernames"];
        var listMsg = entry + ": ";

        for (i = 0; i < groupUsernames.length; i++) {
            listMsg += groupUsernames[i] + " ";
        }

        return listMsg;
    }

    else {
        return "this group doesn't exist, maybe there was a typo.";
    }
}

function groupHelp() {
    // tells user how the group commands is structured and the sub commands.

    return "the group commands are a set of commands to help us easily ping"
                                     + " a subset of people in this discord. "
                                     + "to allows people to opt in/out whenever they like you can only add/remove yourself from groups\n"
                                     + "the format is: !group subcommand groupName.\n"
                                     + "list of subcommands are: new (creates a new group), add, remove,"
                                     + " ping, and list.";
}
