"use strict";

const prompt = require("prompt");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = new XMLHttpRequest();

// Prompt user to provide username
// Start the prompt
prompt.start();
// Get a property from the user: username
prompt.get('username', function(error, result){
	let url = "https://api.github.com/users/" + result.username;

	const sendRequest = (request) => {
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
        	console.log('\n', request.status, '\n');
          console.log(JSON.parse(request.responseText));
          console.log("\n \n");
        }

        else {
          console.log(`${request.statusText} \n`);
          console.log("Please verify the username and/or url.");
        }
      }
    };
  request.open("GET", url, true);
  request.setRequestHeader("Content-Type", "text/plain");
  request.send();
  }


sendRequest(request);
});


  