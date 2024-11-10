require("dotenv").config();
const { WebClient } = require("@slack/web-api");

// initialize slack client
const token = process.env.SLACK_TOKEN;
const client = new WebClient(token);

console.log("Slack token : ", process.env.SLACK_TOKEN);
// slack sample code
// You probably want to use a database to store any user information ;)
let usersStore = {};

async function fetchSlackUsers() {
  try {
    // Call the users.list method using the WebClient
    const result = await client.users.list();
    saveUsers(result.members);
    console.log(result);
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
}

// Put users into the JavaScript object
function saveUsers(usersArray) {
  let userId = "";
  usersArray.forEach(function (user) {
    // Key user info on their unique user ID
    userId = user["id"];

    // Store the entire user object (you may not need all of the info)
    usersStore[userId] = user;
  });
}

fetchSlackUsers();
