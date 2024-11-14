import { WebClient } from "@slack/web-api";
import { Slackuser } from "../types/slack";

// initialize slack client
const slackClient = new WebClient(process.env.SLACK_TOKEN);

export const fetchActiveSlackUsers = async () => {
  const result = await slackClient.users.list({});
  return result.members?.filter(
    (user) => !user.deleted && !user.is_bot && user.id
  );
};
