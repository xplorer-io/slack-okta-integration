// logic for comparing users lists from both platforms and performing necessary actions
import { fetchActiveSlackUsers } from "./slackService";
import { fetchOktaUsers, onboardToOkta, removeFromOkta } from "./oktaService";
import { OktaUser, Slackuser } from "types";

export const syncUsers = async () => {
  try {
    const activeSlackUsers: Slackuser[] = await fetchActiveSlackUsers();
    const oktaUsers: OktaUser[] = await fetchOktaUsers();

    const slackUserEmails = new Set(
      activeSlackUsers.map((user: any) => user.profile.email)
    );

    const oktaUserEmails = new Set(
      oktaUsers.map((user: any) => user.profile.email)
    );

    //ADD new slack users to Okta
    for (const slackUser of activeSlackUsers) {
      if (!oktaUserEmails.has(slackUser.profile.email)) {
        //logic still need to worked on
        await onboardToOkta(
          slackUser.profile.email,
          slackUser.profile.first_name,
          slackUser.profile.last_name
        );
      }
    }

    //DELETE user from Okta (if removed from Slack)
    for (const oktaUser of oktaUsers) {
      if (!slackUserEmails.has(oktaUser.profile.email)) {
        //logic still need to worked on
        await removeFromOkta(oktaUser.id);
      }
    }

    console.log("User sync complete!");
  } catch (error) {
    console.log("Error during user sync: ", error);
  }
};
