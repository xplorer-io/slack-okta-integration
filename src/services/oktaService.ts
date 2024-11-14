import fetch from "node-fetch";

const oktaDomain = "demo-crimson-coral-79700-admin.okta.com";
const oktaToken = process.env.OKTA_TOKEN;

// list users from okta
export const fetchOktaUsers = async () => {
  const response = await fetch(`https://${oktaDomain}/api/v1/users`, {
    headers: {
      Authorization: `SSWS ${oktaToken}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// Create user in okta
export const onboardToOkta = async (email: string, name: string) => {
  await fetch(`https://${oktaDomain}/api/v1/users`, {
    method: "POST",
    headers: {
      Authorization: `SSWS ${oktaToken}`,
      "Content-Type": "applcation/json",
    },
    body: JSON.stringify({
      profile: {}, // the logic for this is still on TODO
    }),
  });
  console.log(`Onboard ${name} to Okta`);
};

// Delete user from Okta
export const removeFromOkta = async (userId: string) => {
  await fetch(`https://${oktaDomain}/api/v1/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `SSWS ${oktaToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log(`Remove user ${userId} from OKTA`);
};
