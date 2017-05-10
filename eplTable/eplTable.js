const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = new XMLHttpRequest();
let url = "https://api.crowdscores.com/v1/league-tables?competition_id=2&api_key=09f3d10ab68d4554b572e54180b19bce";

const sendRequest = (request) =>{
  request.onreadystatechange = function () {
    requestHandler(request);
  };

  request.open("GET", url, true);
  request.setRequestHeader("Content-Type", "text/plain");
  request.send();
}

const requestHandler = (request) =>{
  if (request.readyState === 4) {
    if (request.status === 200) {
      let result = JSON.parse(request.responseText);
      let league = result[0].leagueTable;

      console.log("\n");
      console.log("\t\t" + "ENGLISH PREMIER LEAGUE TABLE 2016/2017" + "\t\t");
      console.log("\n");
      for (let i of league) {
        // To avoid displaying impertinent data, only target objects with 'position' as property. These are the teams.
        if ('position' in i) {

          // Justifying to display in a neat format
          let justifyName = 25 - i.name.length;

          // To get the number of spaces it takes to justify i.position to the left with length 8:
          let justifyPosition = 8 - String(i.position).length;

          console.log("   " + i.position + " ".repeat(justifyPosition)  + i.name + " ".repeat(justifyName)
                      + "Games Played:      " + i.gamesPlayed + "      Points:      " + i.points);
          console.log('\n');

        }
      }

      console.log("\n\n");
    }

    else {
      console.log("\n\n");
      console.log(`${request.statusText} \n`);
      console.log("Try check your internet connectivity and/or the url.");
      console.log("\n\n");
    }

  }
}

sendRequest(request);