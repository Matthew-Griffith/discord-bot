/* this command returns the search result of a duck go answers api

    todo: write the function and test
*/

// duck duck go library to fetch the results from the answers from 
// the search engine
const ddg = require("ddg");


exports.command = function(msg) {
  // msg (str): msg from the user
  // first we remove the !answer from the front of the msg and input it in the api and
  // return the result
  var user_search = msg.slice(8, msg.length);
      ddg.query(user_search, function(err, data){
        if (data.Abstract === '') {
          return "I don't know... #blameMatt";
        }
        else if (err) {
          return "oh god, there was an error.";
        }
        else {return data.Abstract;}
      });
}