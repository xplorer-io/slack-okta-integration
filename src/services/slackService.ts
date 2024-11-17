import { WebClient } from "@slack/web-api";

// here only for testing
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

// initialize slack client
const slackClient = new WebClient(process.env.SLACK_TOKEN);

export const fetchActiveSlackUsers = async () => {
  const result = await slackClient.users.list({ limit: 2 }); // limit:2 needs to be removed ,as this is only there for testing
  const activeSlackUsers = result.members?.filter(
    (user) => !user.deleted && !user.is_bot && user.id
  );
  return activeSlackUsers;
};

//only for testing
(async () => {
  const users = await fetchActiveSlackUsers();
  console.log(
    "fetched users fron Slack ⬇️. If you want to fetch all the users, remove {limit : 2} from slackClient"
  );
  console.log(users);
})();
