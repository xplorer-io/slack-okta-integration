// logic for comparing users lists from both platforms and performing necessary actions
import { fetchActiveSlackUsers } from "./slackService";
import { fetchOktaUsers, onboardToOkta, removeFromOkta } from "./oktaService";
import { OktaUser, Slackuser } from "types";

export const syncUsers = async () => {
  try {
    const activeSlackUsers: Slackuser[] = await fetchActiveSlackUsers();
    const oktaUsers: OktaUser[] = await fetchOktaUsers();

    const slackUserEmails = new Set(
      activeSlackUsers.map((user) => user.profile.email)
    );

    const oktaUserEmails = new Set(oktaUsers.map((user) => user.profile.email));

    //ADD new slack users to Okta
    for (const slackUser of activeSlackUsers) {
      if (!oktaUserEmails.has(slackUser.profile.email)) {
        try {
          console.log(
            `Onboarding new user to Okta: ${slackUser.profile.email}`
          );
          await onboardToOkta(
            slackUser.profile.email,
            slackUser.profile.first_name,
            slackUser.profile.last_name
          );
        } catch (error) {
          console.error(
            `Failed to onboard Slack user ${slackUser.profile.email} :`,
            error
          );
        }
      }
    }

    //DELETE user from Okta (if removed from Slack)
    for (const oktaUser of oktaUsers) {
      if (!slackUserEmails.has(oktaUser.profile.email)) {
        try {
          console.log(`Removing user from Okta: ${oktaUser.profile.email}`);
          await removeFromOkta(oktaUser.id);
        } catch (error) {
          console.error(
            `Failed to remove Okta user ${oktaUser.profile.email}: `,
            error
          );
        }
      }
    }
    console.log("User sync complete!");
  } catch (error) {
    console.log("Error during user sync: ", error);
  }
};
