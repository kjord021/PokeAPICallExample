const axios = require('axios');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

var waitForUserInput = function() {
    readline.question("Would you like to search for a pokemon? ", answer => {
      if (answer.toLowerCase() == "no" || answer.toLowerCase() == "n"){
          console.log("Goodbye");
          readline.close();
      } 
      else if (answer.toLowerCase() == "yes" || answer.toLowerCase() == "y") {
            readline.question('Please enter the name of the pokemon you are looking for: ', name => {
                axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                    .then(res => {
                        console.log(`Here is all the information on ${name}:`);   
                        console.log(res.data);
                        waitForUserInput();
                    })
                    .catch(error => {
                        console.log('The pokemon you are looking for does not exist');
                        waitForUserInput();
                    });
            });
      }
      else {
          console.log("Not a valid response. Please Try Again. ('n', 'y', 'no', 'yes')");
          waitForUserInput();
      }
    });
  }

waitForUserInput();


